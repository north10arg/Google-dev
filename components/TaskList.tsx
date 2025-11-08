import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { TrashIcon } from './icons';

const TaskList = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useAppContext();
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      addTask(newTaskText.trim());
      setNewTaskText('');
    }
  };

  return (
    <div className="bg-surface rounded-xl shadow-md p-6 sm:p-8">
      <h3 className="text-xl font-bold text-text-primary mb-4">Minhas Tarefas de Foco</h3>
      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Qual a sua próxima missão?"
          className="flex-grow block w-full px-4 py-3 bg-slate-100 border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button 
          type="submit"
          className="flex-shrink-0 px-5 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-slate-300 transition-colors"
          disabled={!newTaskText.trim()}
        >
          Adicionar
        </button>
      </form>
      <ul className="space-y-3">
        {tasks.map(task => (
          <li 
            key={task.id} 
            className="flex items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
          >
            <input 
              id={`task-${task.id}`}
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
              checked={task.completed} 
              onChange={() => toggleTask(task.id)} 
            />
            <label 
              htmlFor={`task-${task.id}`}
              className={`ml-3 block text-sm font-medium text-text-primary flex-grow cursor-pointer ${task.completed ? 'line-through text-text-secondary' : ''}`}
            >
                {task.text}
            </label>
            <button 
              onClick={() => deleteTask(task.id)} 
              className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`Delete task ${task.text}`}
            >
              <TrashIcon />
            </button>
          </li>
        ))}
         {tasks.length === 0 && (
            <p className="text-center text-text-secondary py-4">Tudo limpo! Adicione uma tarefa para começar.</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;