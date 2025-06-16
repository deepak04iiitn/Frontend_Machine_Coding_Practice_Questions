// src/components/ThemeToggle.jsx
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeToggle() {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
        <button
            onClick={toggleTheme}
            className="p-3 text-lg rounded-lg transition-all duration-300 font-semibold
                     bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                     text-black dark:text-white border-2 border-gray-300 dark:border-gray-600"
        >
            {theme === 'light' ? '🌞 Switch to Dark' : '🌙 Switch to Light'}
        </button>
    );
    
}
