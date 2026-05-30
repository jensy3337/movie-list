import React, { useState, useEffect, useRef } from 'react';
import { WatchlistItem, ItemSection, ItemStatus } from '../types';
import { categoriesBySection } from '../data';

interface WatchlistFormModalProps {
  isOpen: boolean;
  itemToEdit: WatchlistItem | null;
  activeSection: ItemSection;
  onClose: () => void;
  onSave: (entry: Partial<WatchlistItem>) => void;
}

export const WatchlistFormModal: React.FC<WatchlistFormModalProps> = ({
  isOpen,
  itemToEdit,
  activeSection,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [totalEpisodes, setTotalEpisodes] = useState(12);
  const [status, setStatus] = useState<ItemStatus>('Watching');
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const [urlInputVisible, setUrlInputVisible] = useState(false);
  const [urlInputVal, setUrlInputVal] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form fields when opening or changing target edit item
  useEffect(() => {
    if (isOpen) {
      if (itemToEdit) {
        setTitle(itemToEdit.title || '');
        setCategory(itemToEdit.category || categoriesBySection[activeSection][0]);
        setTotalEpisodes(itemToEdit.totalEpisodes || 12);
        setStatus(itemToEdit.status || 'Watching');
        setRating(itemToEdit.rating || null);
        setNotes(itemToEdit.notes || '');
        setDateAdded(itemToEdit.dateAdded || new Date().toISOString().split('T')[0]);
        setCoverImage(itemToEdit.coverImage || null);
        setUrlInputVisible(false);
        setUrlInputVal('');
      } else {
        // Reset to Defaults for NEW item
        setTitle('');
        setCategory(categoriesBySection[activeSection][0]);
        setTotalEpisodes(12);
        setStatus('Watching');
        setRating(null);
        setNotes('');
        setDateAdded(new Date().toISOString().split('T')[0]);
        setCoverImage(null);
        setUrlInputVisible(false);
        setUrlInputVal('');
      }
    }
  }, [isOpen, itemToEdit, activeSection]);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCoverImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setUrlInputVal(val);
    if (val) {
      setCoverImage(val);
    } else {
      setCoverImage(null);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const entryToSave: Partial<WatchlistItem> = {
      title: title.trim(),
      category: category,
      status: status,
      rating: status === 'Watched' ? rating : null,
      notes: notes.trim(),
      dateAdded: dateAdded || new Date().toISOString().split('T')[0],
      coverImage: coverImage
    };

    if (activeSection === 'series' || activeSection === 'anime') {
      entryToSave.totalEpisodes = totalEpisodes || 12;
    }

    onSave(entryToSave);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const showEpisodesField = activeSection === 'series' || activeSection === 'anime';

  return (
    <div
      id="modal-container"
      className="modal-overlay"
      style={{ display: 'flex' }}
      onClick={handleOverlayClick}
    >
      <div className="modal-container-border">
        <div className="modal-box">
          <img
            src="https://www.pngplay.com/wp-content/uploads/6/Pink-Star-PNG-Clipart-Background.png"
            onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
            loading="lazy"
            draggable="false"
            className="modal-stickers-decor left"
            alt="pink star"
          />
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>

          <h2 id="modal-title" className="modal-title-custom">
            {itemToEdit ? 'edit this beauty ✦' : 'add something cute~'}
          </h2>

          <form id="watchlist-form" onSubmit={handleFormSubmit}>
            {/* Cover Picker Section */}
            <div className="form-group" style={{ alignItems: 'center' }}>
              <label className="form-label">cover visual</label>
              <div className="cover-picker-area" id="cover-picker" onClick={triggerFileInput}>
                {coverImage ? (
                  <>
                    <img id="picker-img-preview" src={coverImage} style={{ display: 'block' }} referrerPolicy="no-referrer" alt="cover preview" />
                    <div className="cover-picker-overlay" id="picker-overlay" style={{ display: 'flex' }}>
                      change ✦
                    </div>
                  </>
                ) : (
                  <div id="picker-default" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <span className="picker-icon-default">📷</span>
                    <span className="picker-text-default">tap to add cover</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                id="form-file-input"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="url-toggle-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setUrlInputVisible(!urlInputVisible);
                }}
              >
                {urlInputVisible ? 'hide url field ↑' : 'or paste a url ↓'}
              </button>

              {urlInputVisible && (
                <div id="url-input-container" className="form-group" style={{ display: 'flex', width: '100%' }}>
                  <input
                    type="url"
                    id="form-url-input"
                    className="form-text-input"
                    placeholder="paste image url here..."
                    value={urlInputVal}
                    onChange={handleUrlInputChange}
                  />
                </div>
              )}
            </div>

            {/* Title Input */}
            <div className="form-group">
              <label htmlFor="form-title" className="form-label">Title</label>
              <input
                type="text"
                id="form-title"
                className="form-text-input"
                placeholder="what are you watching?"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Category Select */}
            <div className="form-group">
              <label htmlFor="form-category" className="form-label">Category</label>
              <select
                id="form-category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoriesBySection[activeSection].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Total Episodes (for Series/Anime only) */}
            {showEpisodesField && (
              <div className="form-group" id="episodes-form-group" style={{ display: 'flex' }}>
                <label htmlFor="form-total-episodes" className="form-label">total episodes</label>
                <input
                  type="number"
                  id="form-total-episodes"
                  className="form-text-input"
                  min="1"
                  max="1000"
                  placeholder="e.g. 12"
                  value={totalEpisodes}
                  onChange={(e) => setTotalEpisodes(Math.max(1, parseInt(e.target.value, 10) || 0))}
                />
              </div>
            )}

            {/* Current Status selectors */}
            <div className="form-group">
              <label className="form-label">current status</label>
              <div className="form-status-selector">
                {(['Watching', 'Watched', 'To Watch'] as ItemStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={`status-toggle-btn ${status === st ? 'selected' : ''}`}
                    onClick={() => {
                      setStatus(st);
                      if (st !== 'Watched') {
                        setRating(null);
                      }
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Stars - Visible only when Watched status selected */}
            {status === 'Watched' && (
              <div className="form-group" id="rating-group" style={{ display: 'flex' }}>
                <label className="form-label">rating</label>
                <div className="rating-container" id="rating-stars-row">
                  {Array.from({ length: 5 }, (_, idx) => {
                    const idxRating = idx + 1;
                    const isFilled = hoveredRating !== null ? idxRating <= hoveredRating : (rating !== null ? idxRating <= rating : false);
                    return (
                      <span
                        key={idx}
                        className={`star-elem ${isFilled ? 'filled' : 'empty'}`}
                        style={{ cursor: 'pointer', fontSize: '24px' }}
                        onMouseEnter={() => setHoveredRating(idxRating)}
                        onMouseLeave={() => setHoveredRating(null)}
                        onClick={() => setRating(idxRating)}
                      >
                        {isFilled ? '★' : '☆'}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Thoughts notes */}
            <div className="form-group">
              <label htmlFor="form-notes" className="form-label">My Thoughts</label>
              <textarea
                id="form-notes"
                className="form-text-input textarea"
                rows={3}
                placeholder="how did it make you feel?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            {/* Date added */}
            <div className="form-group">
              <label htmlFor="form-date" className="form-label">Date Added</label>
              <input
                type="date"
                id="form-date"
                className="form-text-input"
                value={dateAdded}
                onChange={(e) => setDateAdded(e.target.value)}
              />
            </div>

            <button type="submit" className="form-submit-btn">
              save to list 🌸
            </button>
            <button type="button" className="form-cancel-btn" onClick={onClose}>
              cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
