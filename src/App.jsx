import { useState, useCallback } from 'react';
import { usePlayer } from './hooks/usePlayer';
import { useKeyboard } from './hooks/useKeyboard';
import { Particles } from './components/Particles';
import { Header } from './components/Header';
import { HeroTitle } from './components/HeroTitle';
import { PlayerCard } from './components/PlayerCard';
import { KeyboardHints } from './components/KeyboardHints';
import { PlaylistDrawer } from './components/PlaylistDrawer';

export default function App() {
  const player = usePlayer();
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  const togglePlaylist = useCallback(() => {
    setIsPlaylistOpen((prev) => !prev);
  }, []);

  useKeyboard({
    togglePlay:     player.togglePlay,
    nextSong:       player.nextSong,
    previousSong:   player.previousSong,
    toggleRepeat:   player.toggleRepeat,
    toggleShuffle:  player.toggleShuffle,
    seekDelta:      player.seekDelta,
    togglePlaylist: togglePlaylist,
  });

  return (
    <div className="app">
      {/* ── Full-screen background ── */}
      <div className="bg-hero" aria-hidden="true" />
      <div className="bg-overlay" aria-hidden="true" />
      <div className="bg-sunrise" aria-hidden="true" />
      <div className="bg-vignette" aria-hidden="true" />

      {/* ── Floating diya particles ── */}
      <Particles />

      {/* ── Persistent single HTML5 Audio element ── */}
      <audio ref={player.audioRef} preload="metadata" id="audioPlayer" />

      {/* ── Header ── */}
      <Header totalSongs={player.totalSongs} />

      {/* ── Main stage ── */}
      <main className="player-stage">
        {/* Hero title + ghat atmosphere */}
        <HeroTitle />

        {/* Music player card */}
        <PlayerCard
          currentSong={player.currentSong}
          currentIndex={player.currentIndex}
          totalSongs={player.totalSongs}
          isPlaying={player.isPlaying}
          isShuffle={player.isShuffle}
          isRepeat={player.isRepeat}
          isTransitioning={player.isTransitioning}
          currentTime={player.currentTime}
          duration={player.duration}
          progressPct={player.progressPct}
          showNote={player.showNote}
          formatTime={player.formatTime}
          togglePlay={player.togglePlay}
          nextSong={player.nextSong}
          previousSong={player.previousSong}
          toggleShuffle={player.toggleShuffle}
          toggleRepeat={player.toggleRepeat}
          seekTo={player.seekTo}
          setIsSeeking={player.setIsSeeking}
          onOpenPlaylist={() => setIsPlaylistOpen(true)}
        />

        {/* Keyboard shortcuts strip */}
        <KeyboardHints onOpenPlaylist={() => setIsPlaylistOpen(true)} />
      </main>

      {/* ── Playlist & Search Drawer ── */}
      <PlaylistDrawer
        isOpen={isPlaylistOpen}
        onClose={() => setIsPlaylistOpen(false)}
        currentIndex={player.currentIndex}
        isPlaying={player.isPlaying}
        onSelectSong={(index) => player.loadSong(index, { autoplay: true })}
      />

      {/* ── Footer ── */}
      <footer className="site-footer">
        <p className="footer-hi" lang="hi">जय छठी मईया 🙏</p>
        <p className="footer-sub">आस्था • श्रद्धा • सूर्य उपासना</p>
        <p className="footer-rights">© 2026 Aryan Shaw · All Rights Reserved</p>
      </footer>
    </div>
  );
}
