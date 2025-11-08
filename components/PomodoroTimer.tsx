import React from 'react';
import { usePomodoro } from '../hooks/usePomodoro';
import { PlayIcon, PauseIcon, ResetIcon, SkipIcon } from './icons';
import { POMODORO_DURATIONS } from '../constants';

interface PomodoroTimerProps {
    onSessionComplete: (durationMinutes: number) => void;
    onCycleComplete: () => void;
}

const PomodoroTimer = ({ onSessionComplete, onCycleComplete }: PomodoroTimerProps) => {
  const { 
    mode, 
    isActive, 
    timeRemaining, 
    startTimer, 
    pauseTimer, 
    resetTimer, 
    skipToNextMode 
  } = usePomodoro(onSessionComplete, onCycleComplete);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const modeText: Record<typeof mode, string> = {
    work: 'Sessão de Foco',
    shortBreak: 'Pausa Curta',
    longBreak: 'Pausa Longa'
  };
  
  const modeColors: Record<typeof mode, string> = {
    work: 'text-primary',
    shortBreak: 'text-green-500',
    longBreak: 'text-sky-500'
  }
  
  const progress = (timeRemaining / POMODORO_DURATIONS[mode]) * 100;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-surface rounded-xl shadow-md p-6 sm:p-8 flex flex-col items-center">
        <h2 className={`text-xl font-bold ${modeColors[mode]}`}>{modeText[mode]}</h2>

        <div className="relative my-8">
            <svg width="200" height="200" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r={radius} stroke="var(--color-border)" strokeWidth="12" fill="transparent" />
                <circle
                    className="pomodoro-progress-ring__circle"
                    cx="100"
                    cy="100"
                    r={radius}
                    stroke="var(--color-primary)"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-5xl font-bold text-text-primary">{formatTime(timeRemaining)}</p>
            </div>
        </div>
      
      <div className="flex items-center justify-center gap-4">
        <button onClick={resetTimer} className="text-text-secondary hover:text-primary transition-colors p-3" aria-label="Reset Timer">
            <ResetIcon className="w-6 h-6" />
        </button>
        {isActive ? (
          <button onClick={pauseTimer} className="w-20 h-20 flex items-center justify-center bg-primary text-white rounded-full shadow-lg hover:bg-primary-hover transition-colors" aria-label="Pause Timer">
            <PauseIcon className="w-8 h-8"/>
          </button>
        ) : (
          <button onClick={startTimer} className="w-20 h-20 flex items-center justify-center bg-primary text-white rounded-full shadow-lg hover:bg-primary-hover transition-colors" aria-label="Start Timer">
            <PlayIcon className="w-8 h-8"/>
          </button>
        )}
        <button onClick={skipToNextMode} className="text-text-secondary hover:text-primary transition-colors p-3" aria-label="Skip Session">
            <SkipIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;