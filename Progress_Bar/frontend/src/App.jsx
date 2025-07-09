import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(intervalRef.current);
            setIsRunning(false); // Stop when complete
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startProgress = () => {
    if (progress >= 100) return;
    setIsRunning(true);
  };

  const pauseOrResumeProgress = () => {
    setIsRunning((prev) => !prev);
  };

  const restartProgress = () => {
    setProgress(0);
    setIsRunning(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xl">
        <div className="w-full bg-gray-300 rounded-full h-6 mb-4 overflow-hidden relative">
          <div
            className="bg-blue-500 h-6 transition-all duration-100 flex items-center justify-center text-white text-sm font-semibold"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
          {/* Optional: percentage outside bar if you want */}
          {/* <div className="absolute right-2 top-0 h-6 flex items-center text-gray-700 font-medium">{progress}%</div> */}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={startProgress}
            disabled={isRunning || progress >= 100}
            className={`px-4 py-2 rounded text-white ${
              isRunning || progress >= 100
                ? 'bg-green-300 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            Start
          </button>

          <button
            onClick={pauseOrResumeProgress}
            disabled={progress >= 100}
            className={`px-4 py-2 rounded text-white ${
              !isRunning && progress < 100
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
          >
            {isRunning ? 'Pause' : 'Resume'}
          </button>

          <button
            onClick={restartProgress}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
