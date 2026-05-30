import React from 'react';
import { WatchlistItem, ItemSection } from '../types';
import { getCategoryGradient, formatDisplayDate } from './CardGrid';

interface DetailModalProps {
  isOpen: boolean;
  item: WatchlistItem | null;
  activeSection: ItemSection;
  onClose: () => void;
  onTriggerEdit: (id: string) => void;
  onToggleEpisode: (epNum: number) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  item,
  activeSection,
  onClose,
  onTriggerEdit,
  onToggleEpisode
}) => {
  if (!isOpen || !item) return null;

  const showEpisodes = activeSection === 'series' || activeSection === 'anime';

  const total = item.totalEpisodes || 12;
  const checked = item.checkedEpisodes || [];
  const checkedCount = checked.length;
  const progressPercent = Math.min(100, Math.round((checkedCount / total) * 100));

  const gradValue = getCategoryGradient(item.category, activeSection);
  const letter = item.title ? item.title.charAt(0).toUpperCase() : '✦';

  const ratingStars = item.rating
    ? Array.from({ length: 5 }, (_, idx) => (idx + 1 <= (item.rating || 0) ? '★' : '☆')).join('')
    : '';

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      id="detail-modal-container"
      className="modal-overlay"
      style={{ display: 'flex' }}
      onClick={handleOverlayClick}
    >
      <div className="modal-container-border">
        <div className="modal-box">
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>

          <div className="detail-cover-container" id="detail-cover-box">
            {item.coverImage ? (
              <img src={item.coverImage} referrerPolicy="no-referrer" alt={item.title} loading="lazy" />
            ) : (
              <div className="detail-placeholder" style={{ background: gradValue }}>
                <span
                  className="card-placeholder-letter"
                  style={{
                    color: 'white',
                    fontFamily: '"Pacifico", cursive',
                    fontSize: '5rem',
                    textShadow: '0 4px 10px rgba(0,0,0,0.15)'
                  }}
                >
                  {letter}
                </span>
              </div>
            )}
          </div>

          <h2 id="detail-title-label" className="detail-title">
            {item.title}
          </h2>

          <div className="detail-badges-row">
            <span className={`detail-badge status ${item.status.toLowerCase().replace(/\s+/g, '')}`}>
              {item.status.toLowerCase()}
            </span>
            <span className="detail-badge category" id="detail-category-badge">
              {item.category}
            </span>
          </div>

          {item.status === 'Watched' && ratingStars && (
            <div className="detail-stars" id="detail-stars-box" style={{ display: 'flex' }}>
              {ratingStars}
            </div>
          )}

          {/* Episode Tracker Container */}
          {showEpisodes && (
            <div className="detail-episodes-box" id="detail-episodes-container">
              <div className="detail-thoughts-label">episodes tracker 📺</div>
              <div className="detail-episodes-grid" id="detail-episodes-grid">
                {Array.from({ length: total }, (_, idx) => {
                  const epNum = idx + 1;
                  const isChecked = checked.includes(epNum);
                  return (
                    <button
                      key={epNum}
                      type="button"
                      className={`ep-bubble-btn ${isChecked ? 'checked' : ''}`}
                      onClick={() => onToggleEpisode(epNum)}
                    >
                      <span className="ep-num">{epNum}</span>
                      <span className="ep-check-icon">{isChecked ? '🎀' : ''}</span>
                    </button>
                  );
                })}
              </div>
              <div className="ep-progress-bar-container">
                <div
                  className="ep-progress-bar"
                  id="detail-episodes-progress"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#a78ee8',
                  marginTop: '6px',
                  textAlign: 'right'
                }}
                id="detail-episodes-fraction"
              >
                {checkedCount}/{total} episodes watched ({progressPercent}%)
              </div>
            </div>
          )}

          <div className="detail-thoughts-box" id="detail-thoughts-container">
            <div className="detail-thoughts-label">notes & reviews</div>
            <p className="detail-thoughts-text" id="detail-thoughts-label">
              {item.notes && item.notes.trim() !== '' ? (
                item.notes
              ) : (
                <span id="label-no-notes-span" style={{ fontStyle: 'italic', color: '#b59cb7' }}>no notes written down yet~</span>
              )}
            </p>
          </div>

          <div className="detail-date-label" id="detail-dateadded-lbl">
            date added: {item.dateAdded ? formatDisplayDate(item.dateAdded) : 'NaN'}
          </div>

          <div className="detail-actions">
            <button
              className="detail-btn edit"
              onClick={() => {
                onTriggerEdit(item.id);
              }}
            >
              edit details ✏️
            </button>
            <button className="detail-btn close" onClick={onClose}>
              go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
