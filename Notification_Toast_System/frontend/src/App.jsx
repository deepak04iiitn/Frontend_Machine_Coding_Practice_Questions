import React from 'react';
import { ToastProvider, useToast } from './context/ToastContext';


function Home() {
  const { addToast } = useToast();

  return (
    <div className="p-6 space-x-4 min-h-screen flex justify-center items-center">
      <button
        onClick={() => addToast('Success! Operation completed.', 'success')}
        className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
      >
        Show Success Toast
      </button>

      <button
        onClick={() => addToast('Oops! Something went wrong.', 'error')}
        className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
      >
        Show Error Toast
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Home />
    </ToastProvider>
  );
}
