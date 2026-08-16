import { ListMusic } from 'lucide-react';
import { Waveform } from './Waveform';
import { ProgressBar } from './ProgressBar';
import { Controls } from './Controls';

export function PlayerCard({
  currentSong,
  currentIndex,
  totalSongs,
  isPlaying,
  isShuffle,
  isRepeat,
  isTransitioning,
  currentTime,
  duration,
  progressPct,
  showNote,
  formatTime,
  togglePlay,
  nextSong,
  previousSong,
  toggleShuffle,
  toggleRepeat,
  seekTo,
  setIsSeeking,
  onOpenPlaylist,
}) {
  return (
    <section
      className={`player-card ${isPlaying ? 'player-card--playing' : ''}`}
      id="playerCard"
      aria-label="Chhath Puja music player"
    >
      {/* ---- Left: Album art ---- */}
      <div className="player-art-col">
        <div className={`art-wrap ${isPlaying ? 'art-wrap--playing' : ''}`}>
          <div className="art-halo" aria-hidden="true" />
          <img
            className={`artwork ${isTransitioning ? 'artwork--fade' : ''}`}
            src="/album-art.jpg"
            alt={`Album art — ${currentSong?.title || 'Chhath Puja Geet'}`}
          />
        </div>
      </div>

      {/* ---- Center: Info + progress + controls ---- */}
      <div className="player-center-col">
        {/* Track info */}
        <div className={`track-info ${isTransitioning ? 'track-info--fading' : ''}`}>
          <span className="track-category">{currentSong?.category || 'Traditional Chhath Geet'}</span>
          <h2 className="track-title">{currentSong?.title || 'Pahile Pahil Chhathi Maiya'}</h2>
          <p className="track-artist">{currentSong?.artist || 'Sharda Sinha'}</p>
        </div>

        {/* Progress */}
        <ProgressBar
          progressPct={progressPct}
          currentTime={currentTime}
          duration={duration}
          formatTime={formatTime}
          seekTo={seekTo}
          setIsSeeking={setIsSeeking}
        />

        {/* Controls */}
        <Controls
          isPlaying={isPlaying}
          isShuffle={isShuffle}
          isRepeat={isRepeat}
          togglePlay={togglePlay}
          nextSong={() => nextSong()}
          previousSong={() => previousSong()}
          toggleShuffle={toggleShuffle}
          toggleRepeat={toggleRepeat}
        />

        {/* Playlist index & Search trigger */}
        <div className="playlist-bar">
          <p className="playlist-index">
            {currentIndex + 1} / {totalSongs}
            &nbsp;·&nbsp;
            <span lang="hi">अगला गीत सुनने के लिए आगे दबाएँ</span>
          </p>

          <button
            className="browse-playlist-btn"
            onClick={onOpenPlaylist}
            title="Browse all 57 verified Chhath songs (Press Q)"
            aria-label="Browse all 57 verified Chhath songs"
          >
            <ListMusic size={14} />
            <span>Search & All 57 Songs</span>
          </button>
        </div>

        {/* Demo fallback note */}
        {showNote && (
          <p className="audio-note" role="status">
            Demo mode • Add MP3 files to /public/audio for real playback
          </p>
        )}
      </div>

      {/* ---- Right: Waveform ---- */}
      <div className="player-right-col">
        <Waveform isPlaying={isPlaying} />
      </div>
    </section>
  );
}
