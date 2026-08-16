import { useEffect, useRef } from 'react';

export function useKeyboard({
  togglePlay,
  nextSong,
  previousSong,
  toggleRepeat,
  toggleShuffle,
  seekDelta,
  togglePlaylist,
}) {
  const handlersRef = useRef({
    togglePlay,
    nextSong,
    previousSong,
    toggleRepeat,
    toggleShuffle,
    seekDelta,
    togglePlaylist,
  });

  useEffect(() => {
    handlersRef.current = {
      togglePlay,
      nextSong,
      previousSong,
      toggleRepeat,
      toggleShuffle,
      seekDelta,
      togglePlaylist,
    };
  }, [togglePlay, nextSong, previousSong, toggleRepeat, toggleShuffle, seekDelta, togglePlaylist]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts if user is typing in form inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target?.tagName)) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          handlersRef.current.togglePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handlersRef.current.seekDelta(5); // Seek forward 5 seconds
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlersRef.current.seekDelta(-5); // Seek backward 5 seconds
          break;
        case 'KeyN':
          e.preventDefault();
          handlersRef.current.nextSong();
          break;
        case 'KeyP':
          e.preventDefault();
          handlersRef.current.previousSong();
          break;
        case 'KeyR':
          e.preventDefault();
          handlersRef.current.toggleRepeat();
          break;
        case 'KeyS':
          e.preventDefault();
          handlersRef.current.toggleShuffle();
          break;
        case 'KeyQ':
          e.preventDefault();
          handlersRef.current.togglePlaylist?.();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
