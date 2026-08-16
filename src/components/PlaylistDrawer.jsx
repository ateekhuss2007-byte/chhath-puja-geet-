import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, Music, Volume2 } from 'lucide-react';
import { songs } from '../data/songs';

export function PlaylistDrawer({ isOpen, onClose, currentIndex, isPlaying, onSelectSong }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filterOptions = [
    { label: 'सभी गीत (All)', value: 'All' },
    { label: 'शारदा सिन्हा (Sharda Sinha)', value: 'Sharda Sinha' },
    { label: 'पवन सिंह (Pawan Singh)', value: 'Pawan Singh' },
    { label: 'खेसारी लाल यादव (Khesari Lal)', value: 'Khesari Lal' },
    { label: 'अनुराधा पौडवाल (Anuradha Paudwal)', value: 'Anuradha Paudwal' },
    { label: 'सूर्य वंदना (Surya Vandana)', value: 'Surya Vandana' },
    { label: 'आरती (Aarti)', value: 'Aarti' },
  ];

  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      const matchesSearch =
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        selectedFilter === 'All' ||
        song.artist.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        song.category.toLowerCase().includes(selectedFilter.toLowerCase());

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilter]);

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Chhath Songs Playlist">
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <div className="drawer-icon-wrap">
              <Music size={18} className="drawer-music-icon" />
            </div>
            <div>
              <h2 className="drawer-heading">छठ पूजा गीत संग्रह</h2>
              <p className="drawer-subheading">{songs.length} Tracks • Sharda Sinha, Pawan Singh, Khesari Lal & All Legends</p>
            </div>
          </div>

          <button className="drawer-close-btn" onClick={onClose} aria-label="Close Playlist">
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="drawer-search-wrap">
          <Search size={16} className="search-icon" aria-hidden="true" />
          <input
            ref={searchInputRef}
            type="text"
            className="drawer-search-input"
            placeholder="Search by song or singer (e.g. Pawan, Khesari, Kelwa, Sharda)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="search-clear-btn" onClick={() => setSearchTerm('')} aria-label="Clear Search">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="drawer-filter-pills">
          {filterOptions.map((f) => (
            <button
              key={f.value}
              className={`filter-pill ${selectedFilter === f.value ? 'filter-pill--active' : ''}`}
              onClick={() => setSelectedFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Song Count Label */}
        <div className="drawer-count-bar">
          <span>Showing {filteredSongs.length} of {songs.length} Songs</span>
          <span className="drawer-hint">Click any song to play instantly</span>
        </div>

        {/* Songs List */}
        <div className="drawer-song-list">
          {filteredSongs.length === 0 ? (
            <div className="drawer-empty-state">
              <p>Koi geet nahi mila "{searchTerm}" ke liye</p>
              <span>Dusra naam search karke dekhein</span>
            </div>
          ) : (
            filteredSongs.map((song, idx) => {
              const originalIndex = songs.findIndex((s) => s.id === song.id);
              const isCurrent = originalIndex === currentIndex;

              return (
                <div
                  key={song.id || idx}
                  className={`drawer-song-item ${isCurrent ? 'drawer-song-item--active' : ''}`}
                  onClick={() => {
                    onSelectSong(originalIndex);
                    onClose();
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onSelectSong(originalIndex);
                      onClose();
                    }
                  }}
                >
                  <div className="song-num-col">
                    {isCurrent && isPlaying ? (
                      <span className="mini-equalizer" aria-label="Playing">
                        <span className="eq-bar" />
                        <span className="eq-bar" />
                        <span className="eq-bar" />
                      </span>
                    ) : (
                      <span className="song-num">#{String(originalIndex + 1).padStart(2, '0')}</span>
                    )}
                  </div>

                  <div className="song-info-col">
                    <h3 className="song-item-title">{song.title}</h3>
                    <p className="song-item-artist">{song.artist}</p>
                  </div>

                  <div className="song-tag-col">
                    <span className="song-item-category">{song.category}</span>
                    {isCurrent && (
                      <span className="now-playing-badge">
                        <Volume2 size={12} />
                        <span>Now Playing</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
