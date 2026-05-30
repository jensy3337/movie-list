import React, { useState, useEffect } from 'react';
import { WatchlistDatabase, ItemSection, ItemStatus, WatchlistItem } from './types';
import { initialSeed, categoriesBySection } from './data';
import { HeaderDividerRow, FloatingStickerLayer } from './components/StickerDecor';
import { CardGrid } from './components/CardGrid';
import { WatchlistFormModal } from './components/WatchlistFormModal';
import { DetailModal } from './components/DetailModal';

// Seed list of 26 BL series to guarantee they exist inside stored series database
const requestedBLs = [
  "Anti Reset", "Bad Buddy", "Bed Friends", "Blue Boys", "City of Stars",
  "Dark Blue Kiss", "I Feel You Linger in the Air", "Jack and Joker",
  "Kiseki 1", "Last Twilight", "Middleman's Love", "Only Friends",
  "Pitbabe 1", "Playboyy", "The Eclipse", "The Guy Next World",
  "The Heart Killers", "My Sweetheart Jom", "The On1y One", "Me and Thee",
  "Love in the Air", "Love Sea", "My Golden Blood", "Wandee Good Day",
  "Don't Say No", "Reset"
];

function initializeDatabase(): WatchlistDatabase {
  try {
    const data = localStorage.getItem('softgirl_watchlist');
    let db: WatchlistDatabase;
    if (!data) {
      db = JSON.parse(JSON.stringify(initialSeed));
    } else {
      db = JSON.parse(data);
    }

    // Safeguard missing sections
    if (!db.movies) db.movies = [];
    if (!db.series) db.series = [];
    if (!db.anime) db.anime = [];

    // Ensure all 26 BL series exist in series array
    let migrated = false;
    requestedBLs.forEach((title, idx) => {
      const exists = db.series.some(
        (item) => item.title.toLowerCase() === title.toLowerCase() && item.category === 'BL'
      );
      if (!exists) {
        db.series.push({
          id: `migrated-bl-${idx + 1}`,
          title: title,
          category: 'BL',
          status: 'Watched',
          rating: null,
          notes: '',
          coverImage: null,
          dateAdded: '2026-05-30',
          totalEpisodes: 12,
          checkedEpisodes: []
        });
        migrated = true;
      }
    });

    if (migrated || !data) {
      localStorage.setItem('softgirl_watchlist', JSON.stringify(db));
    }
    return db;
  } catch (e) {
    console.warn("localStorage initialize failed; returning initial seed:", e);
    return JSON.parse(JSON.stringify(initialSeed));
  }
}

export default function App() {
  const [database, setDatabase] = useState<WatchlistDatabase>(() => initializeDatabase());
  const [activeSection, setActiveSection] = useState<ItemSection>('movies');
  const [activeStatus, setActiveStatus] = useState<ItemStatus>('Watching');

  // Filter and Sorting search state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortFilter, setSortFilter] = useState('date-desc');

  // Modals controller state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<WatchlistItem | null>(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentlyViewingId, setCurrentlyViewingId] = useState<string | null>(null);

  // Sync to database
  useEffect(() => {
    localStorage.setItem('softgirl_watchlist', JSON.stringify(database));
  }, [database]);

  // Handle category option reset on active section switch
  useEffect(() => {
    setCategoryFilter('All');
  }, [activeSection]);

  const currentlyViewingItem = currentlyViewingId
    ? (database[activeSection] || []).find((item) => item.id === currentlyViewingId) || null
    : null;

  // Toggle checkout status of an episode inside series/anime
  const handleToggleEpisode = (epNum: number) => {
    if (!currentlyViewingId) return;

    setDatabase((prevDb) => {
      const currentList = prevDb[activeSection] || [];
      const updatedList = currentList.map((item) => {
        if (item.id === currentlyViewingId) {
          const checked = item.checkedEpisodes || [];
          const updatedChecked = checked.includes(epNum)
            ? checked.filter((n) => n !== epNum)
            : [...checked, epNum].sort((a, b) => a - b);
          return { ...item, checkedEpisodes: updatedChecked };
        }
        return item;
      });

      return {
        ...prevDb,
        [activeSection]: updatedList
      };
    });
  };

  // Add/Edit Save callback
  const handleSaveEntry = (entryPartial: Partial<WatchlistItem>) => {
    setDatabase((prevDb) => {
      const currentSectionList = prevDb[activeSection] || [];
      const isEdit = !!itemToEdit;
      let newList: WatchlistItem[];

      if (isEdit && itemToEdit) {
        newList = currentSectionList.map((oldItem) => {
          if (oldItem.id === itemToEdit.id) {
            return {
              ...oldItem,
              ...entryPartial,
              checkedEpisodes: oldItem.checkedEpisodes || [] // preserve episodic progress
            } as WatchlistItem;
          }
          return oldItem;
        });
      } else {
        const newEntry: WatchlistItem = {
          id: `entry-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          title: entryPartial.title || 'Untitled',
          category: entryPartial.category || categoriesBySection[activeSection][0],
          status: entryPartial.status || 'Watching',
          rating: entryPartial.rating || null,
          notes: entryPartial.notes || '',
          dateAdded: entryPartial.dateAdded || new Date().toISOString().split('T')[0],
          coverImage: entryPartial.coverImage || null,
          totalEpisodes: entryPartial.totalEpisodes || 12,
          checkedEpisodes: []
        };
        newList = [...currentSectionList, newEntry];
      }

      return {
        ...prevDb,
        [activeSection]: newList
      };
    });

    setIsFormOpen(false);
    setItemToEdit(null);
  };

  // Trigger Delete flow
  const handleDeleteEntry = (itemId: string) => {
    setDatabase((prevDb) => {
      const currentSectionList = prevDb[activeSection] || [];
      const updatedList = currentSectionList.filter((item) => item.id !== itemId);
      return {
        ...prevDb,
        [activeSection]: updatedList
      };
    });

    if (currentlyViewingId === itemId) {
      setIsDetailOpen(false);
      setCurrentlyViewingId(null);
    }
  };

  // Trigger entry edit from edit icon
  const handleTriggerEdit = (itemId: string) => {
    const list = database[activeSection] || [];
    const item = list.find((it) => it.id === itemId);
    if (item) {
      setItemToEdit(item);
      setIsDetailOpen(false); // Close viewer if opened
      setIsFormOpen(true);
    }
  };

  // Render list of filtered elements
  const activeList = database[activeSection] || [];

  // Filtered by active tab status
  let filteredItems = activeList.filter((item) => item.status === activeStatus);

  // Filtered by category option
  if (categoryFilter !== 'All') {
    filteredItems = filteredItems.filter((item) => item.category === categoryFilter);
  }

  // Filtered by search queries
  if (searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase();
    filteredItems = filteredItems.filter((item) => item.title.toLowerCase().includes(query));
  }

  // Sort entries list
  filteredItems = [...filteredItems].sort((a, b) => {
    if (sortFilter === 'date-desc') {
      return b.dateAdded.localeCompare(a.dateAdded);
    } else if (sortFilter === 'date-asc') {
      return a.dateAdded.localeCompare(b.dateAdded);
    } else if (sortFilter === 'alpha-asc') {
      return a.title.localeCompare(b.title);
    } else if (sortFilter === 'alpha-desc') {
      return b.title.localeCompare(a.title);
    } else if (sortFilter === 'rating-desc') {
      const ratingA = a.rating || 0;
      const ratingB = b.rating || 0;
      return ratingB - ratingA;
    }
    return 0;
  });

  // Calculate badges counts
  const badgeWatching = activeList.filter((it) => it.status === 'Watching').length;
  const badgeWatched = activeList.filter((it) => it.status === 'Watched').length;
  const badgeToWatch = activeList.filter((it) => it.status === 'To Watch').length;

  return (
    <>
      <FloatingStickerLayer />

      <header style={{ position: 'relative', zIndex: 5 }}>
        <h1 className="main-logo font-pacific text-center pt-8">
          my watchlist
        </h1>
        <p className="logo-sub font-quicksand font-bold text-center mb-4">
          a cozy little space for all my faves 🌸
        </p>
        <HeaderDividerRow />
      </header>

      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Navigation Section Pills */}
        <nav className="main-nav">
          <button
            className={`main-tab ${activeSection === 'movies' ? 'active' : ''}`}
            onClick={() => setActiveSection('movies')}
          >
            🎬 Movies
          </button>
          <button
            className={`main-tab ${activeSection === 'series' ? 'active' : ''}`}
            onClick={() => setActiveSection('series')}
          >
            📺 Series
          </button>
          <button
            className={`main-tab ${activeSection === 'anime' ? 'active' : ''}`}
            onClick={() => setActiveSection('anime')}
          >
            🌸 Anime
          </button>
        </nav>

        {/* Watchlist dashboard */}
        <div id="watchlist-interface">
          {/* Status navigation */}
          <div className="status-nav">
            <button
              className={`status-chip ${activeStatus === 'Watching' ? 'active' : ''}`}
              onClick={() => setActiveStatus('Watching')}
            >
              Watching
              <span className="badge-count" id="count-watching">
                {badgeWatching}
              </span>
            </button>
            <button
              className={`status-chip ${activeStatus === 'Watched' ? 'active' : ''}`}
              onClick={() => setActiveStatus('Watched')}
            >
              Watched
              <span className="badge-count" id="count-watched">
                {badgeWatched}
              </span>
            </button>
            <button
              className={`status-chip ${activeStatus === 'To Watch' ? 'active' : ''}`}
              onClick={() => setActiveStatus('To Watch')}
            >
              To Watch
              <span className="badge-count" id="count-towatch">
                {badgeToWatch}
              </span>
            </button>
          </div>

          {/* Search, Categorizing, Filter combo controls */}
          <div className="filter-bar">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                id="search-input"
                className="search-input text-gray-700"
                placeholder="search my watch list..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              id="category-filter"
              className="select-dropdown text-gray-700 font-bold"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categoriesBySection[activeSection].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              id="sort-filter"
              className="select-dropdown text-gray-700 font-bold"
              value={sortFilter}
              onChange={(e) => setSortFilter(e.target.value)}
            >
              <option value="date-desc">Newest Added</option>
              <option value="date-asc">Oldest Added</option>
              <option value="alpha-asc">Title: A-Z</option>
              <option value="alpha-desc">Title: Z-A</option>
              <option value="rating-desc">Rating: High to Low</option>
            </select>
          </div>

          {/* Grid watch gallery cards */}
          <CardGrid
            items={filteredItems}
            activeSection={activeSection}
            onViewDetails={(id) => {
              setCurrentlyViewingId(id);
              setIsDetailOpen(true);
            }}
            onTriggerEdit={handleTriggerEdit}
            onDelete={handleDeleteEntry}
          />
        </div>
      </main>

      {/* Floating interactive pink Add Button lower right corner */}
      <button
        className="floating-add-btn"
        onClick={() => {
          setItemToEdit(null);
          setIsFormOpen(true);
        }}
      >
        <img
          src="https://www.freepngimg.com/thumb/bow/6-bow-png-image-download.png"
          onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
          loading="lazy"
          draggable="false"
          className="floating-add-sticker"
          alt="gorgeous pink ribbon"
        />
        + add new
      </button>

      {/* Manage Dialogs and Forms modals */}
      <WatchlistFormModal
        isOpen={isFormOpen}
        itemToEdit={itemToEdit}
        activeSection={activeSection}
        onClose={() => {
          setIsFormOpen(false);
          setItemToEdit(null);
        }}
        onSave={handleSaveEntry}
      />

      <DetailModal
        isOpen={isDetailOpen}
        item={currentlyViewingItem}
        activeSection={activeSection}
        onClose={() => {
          setIsDetailOpen(false);
          setCurrentlyViewingId(null);
        }}
        onTriggerEdit={handleTriggerEdit}
        onToggleEpisode={handleToggleEpisode}
      />
    </>
  );
}
