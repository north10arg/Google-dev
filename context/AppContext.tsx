import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Task } from '../types';

interface AppContextType {
  user: { name: string } | null;
  login: (name: string) => void;
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  coins: number;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// FIX: Extracted props to a type alias for clarity and to prevent potential type inference issues.
type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [coins, setCoins] = useState(0);

  const login = (name: string) => setUser({ name });

  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now().toString(), text, completed: false };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };
  
  const addCoins = (amount: number) => {
    setCoins(prev => prev + amount);
  };
  
  const spendCoins = (amount: number) => {
    setCoins(prev => Math.max(0, prev - amount));
  };

  const value = {
    user,
    login,
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    coins,
    addCoins,
    spendCoins,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
