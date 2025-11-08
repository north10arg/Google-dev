export type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface ShopItem {
  id: string;
  name: string;
  cost: number;
  type: 'background' | 'sound';
  value: string; // URL for background or sound
}
