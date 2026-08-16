import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Repeat1 } from 'lucide-react';

export function Controls({ isPlaying, isShuffle, isRepeat, togglePlay, nextSong, previousSong, toggleShuffle, toggleRepeat }) {
  return (
    <div className="controls">
      {/* Shuffle */}
      <button
        className={`ctrl-btn ctrl-btn--secondary ${isShuffle ? 'ctrl-btn--active' : ''}`}
        onClick={toggleShuffle}
        aria-label={isShuffle ? 'Shuffle on' : 'Shuffle off'}
        aria-pressed={isShuffle}
        title="Shuffle (S)"
      >
        <Shuffle size={18} strokeWidth={1.8} />
        {isShuffle && <span className="ctrl-active-dot" aria-hidden="true" />}
      </button>

      {/* Previous */}
      <button
        className="ctrl-btn ctrl-btn--secondary"
        onClick={previousSong}
        aria-label="Previous song"
        title="Previous (P)"
      >
        <SkipBack size={22} strokeWidth={1.8} />
      </button>

      {/* Play / Pause — main CTA */}
      <button
        className={`play-btn ${isPlaying ? 'play-btn--playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        title="Play / Pause (Space)"
      >
        <span className="play-btn-ring" aria-hidden="true" />
        {isPlaying
          ? <Pause size={28} strokeWidth={2} fill="currentColor" />
          : <Play  size={28} strokeWidth={2} fill="currentColor" style={{ marginLeft: 3 }} />
        }
      </button>

      {/* Next */}
      <button
        className="ctrl-btn ctrl-btn--secondary"
        onClick={nextSong}
        aria-label="Next song"
        title="Next (N)"
      >
        <SkipForward size={22} strokeWidth={1.8} />
      </button>

      {/* Repeat */}
      <button
        className={`ctrl-btn ctrl-btn--secondary ${isRepeat ? 'ctrl-btn--active' : ''}`}
        onClick={toggleRepeat}
        aria-label={isRepeat ? 'Repeat on' : 'Repeat off'}
        aria-pressed={isRepeat}
        title="Repeat (R)"
      >
        {isRepeat ? <Repeat1 size={18} strokeWidth={1.8} /> : <Repeat size={18} strokeWidth={1.8} />}
        {isRepeat && <span className="ctrl-active-dot" aria-hidden="true" />}
      </button>
    </div>
  );
}
