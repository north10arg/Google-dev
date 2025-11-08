import { useState, useEffect, useCallback, useRef } from 'react';
import { PomodoroMode } from '../types';
import { POMODORO_DURATIONS } from '../constants';

export const usePomodoro = (onSessionComplete: (durationMinutes: number) => void, onCycleComplete: () => void) => {
  const [mode, setMode] = useState<PomodoroMode>('work');
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(POMODORO_DURATIONS.work);
  const [cycles, setCycles] = useState(0);
  
  const intervalRef = useRef<number | null>(null);
  const initialTimeRef = useRef(POMODORO_DURATIONS.work);

  const startTimer = useCallback(() => {
    if (!isActive && timeRemaining > 0) {
        initialTimeRef.current = timeRemaining;
    } else {
        initialTimeRef.current = POMODORO_DURATIONS[mode];
    }
    setIsActive(true);
  }, [isActive, timeRemaining, mode]);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeRemaining(POMODORO_DURATIONS[mode]);
  }, [mode]);

  const skipToNextMode = useCallback(() => {
    setIsActive(false);
    if (mode === 'work') {
      const newCycles = cycles + 1;
      setCycles(newCycles);
      const nextMode = newCycles % 4 === 0 ? 'longBreak' : 'shortBreak';
      setMode(nextMode);
      setTimeRemaining(POMODORO_DURATIONS[nextMode]);
    } else {
      setMode('work');
      setTimeRemaining(POMODORO_DURATIONS.work);
    }
  }, [mode, cycles]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  useEffect(() => {
    if (timeRemaining < 0) {
      if (mode === 'work') {
        const durationMinutes = Math.round(initialTimeRef.current / 60);
        onSessionComplete(durationMinutes);
        onCycleComplete();
      }
      skipToNextMode();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining, mode, onSessionComplete, onCycleComplete]);

  return {
    mode,
    isActive,
    timeRemaining,
    startTimer,
    pauseTimer,
    resetTimer,
    skipToNextMode
  };
};
