import React, { useState } from 'react';
import { WatchlistItem, ItemSection } from '../types';
import { stickerUrls } from '../data';

interface CardGridProps {
  items: WatchlistItem[];
  activeSection: ItemSection;
  onViewDetails: (id: string) => void;
  onTriggerEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function getCategoryGradient(category: string, section: string) {
  if (section === 'anime') {
    if (category === 'Movies') {
      return 'linear-gradient(135deg, #48cae4, #0096c7)';
    } else {
      return 'linear-gradient(135deg, #f4b8c8, #e991aa)';
    }
  }
  switch (category) {
    case 'Hindi': return 'linear-gradient(135deg, #f4a261, #e76f51)';
    case 'English': return 'linear-gradient(135deg, #457b9d, #1d3557)';
    case 'Gujarati': return 'linear-gradient(135deg, #52b788, #2d6a4f)';
    case 'BL': return 'linear-gradient(135deg, #c9b8f4, #a78ee8)';
    default: return 'linear-gradient(135deg, #adb5bd, #6c757d)';
  }
}

export function formatDisplayDate(dateStr: string) {
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${monthsName[monthIdx]} ${parts[2]}, ${year}`;
    }
  } catch (e) {
    // ignores parsing failures
  }
  return dateStr;
}

const WatchlistCard: React.FC<{
  item: WatchlistItem;
  activeSection: ItemSection;
  onViewDetails: (id: string) => void;
  onTriggerEdit: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ item, activeSection, onViewDetails, onTriggerEdit, onDelete }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  // Floating hover sticker calculation based on ID digits
  const digits = item.id.replace(/\D/g, '');
  const idNum = digits ? parseInt(digits, 10) : 0;
  const floatSticker = (idNum % 2 === 0) ? stickerUrls.bow : stickerUrls.star;

  const gradValue = getCategoryGradient(item.category, activeSection);
  const showEpisodesProgress = activeSection === 'series' || activeSection === 'anime';

  const totalEpisodes = item.totalEpisodes || 12;
  const checkedEpisodes = item.checkedEpisodes || [];
  const checkedCount = checkedEpisodes.length;
  const progressPercent = Math.min(100, Math.round((checkedCount / totalEpisodes) * 100));

  const starsHTML = Array.from({ length: 5 }, (_, idx) => {
    const starVal = idx + 1;
    const isFilled = item.rating ? starVal <= item.rating : false;
    return (
      <span key={idx} className={`star-elem ${isFilled ? 'filled' : 'empty'}`}>
        {isFilled ? '★' : '☆'}
      </span>
    );
  });

  const handleDeleteTrigger = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmingDelete(true);
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmingDelete(false);
  };

  const handleConfirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(item.id);
    setIsConfirmingDelete(false);
  };

  return (
    <div
      id={`entry-${item.id}`}
      className={`watchlist-card ${isConfirmingDelete ? 'shake' : ''}`}
      onClick={() => onViewDetails(item.id)}
      style={{ position: 'relative' }}
    >
      <div className="card-cover">
        {item.coverImage ? (
          <img src={item.coverImage} alt={item.title} loading="lazy" referrerPolicy="no-referrer" />
        ) : (
          <div className="empty-cover-gradient" style={{ background: gradValue }}>
            <span className="empty-icon">
              {activeSection === 'anime' ? '🌸' : activeSection === 'series' ? '📺' : '🎬'}
            </span>
            <span className="empty-text-category">{item.category}</span>
          </div>
        )}
        <button
          className="card-edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            onTriggerEdit(item.id);
          }}
        >
          ✏️
        </button>
        <button className="card-delete-btn" onClick={handleDeleteTrigger}>
          🗑️
        </button>
      </div>

      <img
        src={floatSticker}
        onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
        loading="lazy"
        className="card-hover-sticker"
        draggable="false"
        style={{ pointerEvents: 'none' }}
        alt="sticker decor"
      />

      <div className="card-info">
        <div className="card-title" title={item.title}>
          {item.title}
        </div>

        {showEpisodesProgress && (
          <div className="card-progress-summary">
            <span className="progress-lbl">
              episodes: {checkedCount}/{totalEpisodes}
            </span>
            <div className="progress-track-mini">
              <div className="progress-bar-mini" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        )}

        <div className="card-footer-info">
          <div className="card-stars">{starsHTML}</div>
          <div className="card-date">
            {item.dateAdded ? formatDisplayDate(item.dateAdded) : ''}
          </div>
        </div>
      </div>

      {isConfirmingDelete && (
        <div className="delete-tooltip">
          <div className="tooltip-title">delete this sweet thing?</div>
          <div className="tooltip-btns">
            <button className="tooltip-btn yes" onClick={handleConfirmDelete}>
              yes
            </button>
            <button className="tooltip-btn no" onClick={handleCancelDelete}>
              no
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const CardGrid: React.FC<CardGridProps> = ({
  items,
  activeSection,
  onViewDetails,
  onTriggerEdit,
  onDelete
}) => {
  if (items.length === 0) {
    const chosenStickers = ['cherry', 'rose', 'star', 'butterfly', 'strawberry'];
    const chosenSticker = chosenStickers[Math.floor(Math.random() * chosenStickers.length)];
    return (
      <div className="empty-state-card">
        <img
          src={stickerUrls[chosenSticker as keyof typeof stickerUrls]}
          onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
          className="empty-sticker"
          draggable="false"
          alt="cute empty sticker"
        />
        <div className="empty-title">empty watchlist space ~</div>
        <p className="empty-desc">add some sweet shows or movies and color this grid cute!</p>
      </div>
    );
  }

  return (
    <div className="cards-grid" id="cards-grid">
      {items.map((item) => (
        <WatchlistCard
          key={item.id}
          item={item}
          activeSection={activeSection}
          onViewDetails={onViewDetails}
          onTriggerEdit={onTriggerEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
