import React, { useState } from 'react';
import Header from './Header';
import PomodoroTimer from './PomodoroTimer';
import TaskList from './TaskList';
import QuickSummary from './QuickSummary';
import ShopModal from './ShopModal';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const { addCoins } = useAppContext();

  // Called when a Pomodoro 'work' session finishes
  const handleSessionComplete = (durationMinutes: number) => {
    // Give 1 coin per 5 minutes of work
    const coinsEarned = Math.floor(durationMinutes / 5);
    if (coinsEarned > 0) {
        addCoins(coinsEarned);
        console.log(`Session complete! Earned ${coinsEarned} coins.`);
    }
  };

  // Called when a full Pomodoro cycle (work, break) completes
  const handleCycleComplete = () => {
    console.log("Pomodoro cycle complete!");
  };
  
  return (
    <div className="w-full">
      <Header onShopClick={() => setIsShopOpen(true)} />
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <PomodoroTimer 
            onSessionComplete={handleSessionComplete}
            onCycleComplete={handleCycleComplete}
          />
          <TaskList />
        </div>
        <aside className="lg:col-span-1">
          <QuickSummary />
        </aside>
      </main>
      {isShopOpen && <ShopModal onClose={() => setIsShopOpen(false)} />}
    </div>
  );
};

export default Dashboard;