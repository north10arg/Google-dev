import React from 'react';
import { useAppContext } from './context/AppContext';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';

const App = () => {
  const { user } = useAppContext();

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        {user ? <Dashboard /> : <LoginScreen />}
      </div>
    </div>
  );
};

export default App;