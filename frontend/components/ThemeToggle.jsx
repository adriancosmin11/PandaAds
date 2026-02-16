'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-colors duration-200 
                 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800
                 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </button>
  );
}
