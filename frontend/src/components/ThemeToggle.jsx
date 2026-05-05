import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useResume();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle dark mode"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
