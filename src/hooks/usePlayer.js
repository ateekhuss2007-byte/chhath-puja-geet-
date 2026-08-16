import { useRef, useState, useCallback, useEffect } from 'react';
import { songs } from '../data/songs';
import { devotionalSynth } from '../utils/audioSynth';
import { audioMastering } from '../utils/audioMastering';

export function formatTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) seconds = 0;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function usePlayer() {
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(songs[0]?.duration || 300);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Keep a ref of latest values to avoid stale closures
  const stateRef = useRef({
    currentIndex: 0,
    isPlaying: false,
    isShuffle: false,
    isRepeat: false,
    currentTime: 0,
    duration: songs[0]?.duration || 300,
    isDemoMode: false,
  });

  useEffect(() => {
    stateRef.current = {
      currentIndex,
      isPlaying,
      isShuffle,
      isRepeat,
      currentTime,
      duration,
      isDemoMode,
    };
  }, [currentIndex, isPlaying, isShuffle, isRepeat, currentTime, duration, isDemoMode]);

  // ---- Clear Demo Simulation Timer & Audio Synth ----
  const stopDemoTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    devotionalSynth.stop();
  }, []);

  // ---- Start Demo Simulation Timer & Synthesizer ----
  const startDemoTimer = useCallback(() => {
    stopDemoTimer();
    devotionalSynth.start();

    timerRef.current = setInterval(() => {
      const current = stateRef.current.currentTime;
      const total = stateRef.current.duration;
      const nextTime = current + 0.25;

      if (nextTime >= total) {
        if (stateRef.current.isRepeat) {
          setCurrentTime(0);
        } else {
          nextSong(true);
        }
      } else {
        setCurrentTime(nextTime);
      }
    }, 250);
  }, [stopDemoTimer]);

  // ---- Load Song ----
  const loadSong = useCallback((index, { autoplay = false } = {}) => {
    const nextIdx = ((index % songs.length) + songs.length) % songs.length;
    const song = songs[nextIdx];

    stopDemoTimer();

    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = song.src;
      audio.load();
    }

    setIsTransitioning(true);
    setCurrentIndex(nextIdx);
    setCurrentTime(0);
    setDuration(song.duration || 300);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 180);

    if (autoplay) {
      setTimeout(() => {
        playSong(nextIdx);
      }, 50);
    } else {
      setIsPlaying(false);
      setIsDemoMode(false);
    }
  }, [stopDemoTimer]);

  // ---- Play Song with Studio Audio Enhancer ----
  const playSong = useCallback((overrideIndex) => {
    const activeIndex = overrideIndex !== undefined ? overrideIndex : stateRef.current.currentIndex;
    const song = songs[activeIndex];
    const audio = audioRef.current;

    stopDemoTimer();

    if (audio) {
      // Attach Web Audio Studio Enhancer to eliminate distortion and speaker crackle
      audioMastering.attach(audio);
      audioMastering.resume();

      if (!audio.src || !audio.src.includes(song.src)) {
        audio.src = song.src;
        audio.load();
      }

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            devotionalSynth.stop();
            setIsPlaying(true);
            setIsDemoMode(false);
            setShowNote(false);
          })
          .catch(() => {
            // Fallback to pure synthesizer
            setIsPlaying(true);
            setIsDemoMode(true);
            setShowNote(true);
            startDemoTimer();
          });
      } else {
        setIsPlaying(true);
        setIsDemoMode(false);
      }
    } else {
      setIsPlaying(true);
      setIsDemoMode(true);
      setShowNote(true);
      startDemoTimer();
    }
  }, [stopDemoTimer, startDemoTimer]);

  // ---- Pause Song ----
  const pauseSong = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    stopDemoTimer();
    setIsPlaying(false);
  }, [stopDemoTimer]);

  // ---- Toggle Play / Pause ----
  const togglePlay = useCallback(() => {
    if (stateRef.current.isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  }, [pauseSong, playSong]);

  // ---- Next Song ----
  const nextSong = useCallback((autoplay) => {
    const shouldAutoplay = autoplay !== undefined ? autoplay : stateRef.current.isPlaying;
    const currIdx = stateRef.current.currentIndex;
    let nextIdx;

    if (stateRef.current.isShuffle && songs.length > 1) {
      do {
        nextIdx = Math.floor(Math.random() * songs.length);
      } while (nextIdx === currIdx);
    } else {
      nextIdx = (currIdx + 1) % songs.length;
    }

    loadSong(nextIdx, { autoplay: shouldAutoplay });
  }, [loadSong]);

  // ---- Previous Song ----
  const previousSong = useCallback((autoplay) => {
    const shouldAutoplay = autoplay !== undefined ? autoplay : stateRef.current.isPlaying;
    const currTime = stateRef.current.currentTime;
    const currIdx = stateRef.current.currentIndex;

    if (currTime > 3) {
      const audio = audioRef.current;
      if (audio && !stateRef.current.isDemoMode) {
        audio.currentTime = 0;
      }
      setCurrentTime(0);
      if (shouldAutoplay && !stateRef.current.isPlaying) {
        playSong(currIdx);
      }
    } else {
      const prevIdx = (currIdx - 1 + songs.length) % songs.length;
      loadSong(prevIdx, { autoplay: shouldAutoplay });
    }
  }, [loadSong, playSong]);

  // ---- Toggle Shuffle / Repeat ----
  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setIsRepeat((prev) => !prev);
  }, []);

  // ---- Seek by ratio (0 to 1) ----
  const seekTo = useCallback((ratio) => {
    const clampedRatio = Math.max(0, Math.min(1, ratio));
    const total = stateRef.current.duration;
    const target = clampedRatio * total;

    setCurrentTime(target);

    const audio = audioRef.current;
    if (audio && !stateRef.current.isDemoMode && isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = target;
    }
  }, []);

  // ---- Seek by delta (seconds) ----
  const seekDelta = useCallback((deltaSeconds) => {
    const current = stateRef.current.currentTime;
    const total = stateRef.current.duration;
    const target = Math.max(0, Math.min(total, current + deltaSeconds));

    setCurrentTime(target);

    const audio = audioRef.current;
    if (audio && !stateRef.current.isDemoMode && isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = target;
    }
  }, []);

  // ---- Set up Audio Element and Events on Mount ----
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (songs.length > 0 && (!audio.src || audio.src === '')) {
      audio.src = songs[0].src;
      audio.load();
    }

    const onTimeUpdate = () => {
      if (!stateRef.current.isDemoMode) {
        setCurrentTime(audio.currentTime);
      }
    };

    const onLoadedMetadata = () => {
      if (isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    const onEnded = () => {
      if (stateRef.current.isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        nextSong(true);
      }
    };

    const onError = () => {
      if (stateRef.current.isPlaying && !stateRef.current.isDemoMode) {
        setIsDemoMode(true);
        setShowNote(true);
        startDemoTimer();
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      stopDemoTimer();
    };
  }, [nextSong, startDemoTimer, stopDemoTimer]);

  const currentSong = songs[currentIndex] || songs[0];
  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return {
    audioRef,
    currentSong,
    currentIndex,
    totalSongs: songs.length,
    isPlaying,
    isShuffle,
    isRepeat,
    currentTime,
    duration,
    progressPct,
    isSeeking,
    setIsSeeking,
    isDemoMode,
    showNote,
    formatTime,
    isTransitioning,
    togglePlay,
    playSong,
    pauseSong,
    nextSong,
    previousSong,
    toggleShuffle,
    toggleRepeat,
    seekTo,
    seekDelta,
    loadSong,
  };
}
