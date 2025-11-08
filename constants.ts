import { PomodoroMode } from './types';

export const POMODORO_DURATIONS: Record<PomodoroMode, number> = {
  work: 25 * 60,       // 25 minutes
  shortBreak: 5 * 60,  // 5 minutes
  longBreak: 15 * 60,  // 15 minutes
};
