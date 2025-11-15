import React, { useState, useEffect } from "react";

export default function SimpleProgressBar() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setRunning(false);
            return 100;
          }
          return p + 1;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [running]);

  const start = () => {
    if (progress < 100) setRunning(true);
  };

  const togglePauseResume = () => {
    if (progress < 100) setRunning((prev) => !prev);
  };

  const restart = () => {
    setProgress(0);
    setRunning(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Progress Bar */}
      <div className="w-full max-w-lg bg-gray-300 rounded-full h-6 overflow-hidden mb-6">
        <div
          className="bg-blue-500 h-6 text-white text-sm font-semibold flex items-center justify-center transition-all duration-150"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={start}
          disabled={running || progress >= 100}
          className={`px-4 py-2 rounded text-white 
            ${running || progress >= 100 ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}
          `}
        >
          Start
        </button>

        <button
          onClick={togglePauseResume}
          disabled={progress >= 100}
          className="px-4 py-2 rounded text-white bg-yellow-500 hover:bg-yellow-600"
        >
          {running ? "Pause" : "Resume"}
        </button>

        <button
          onClick={restart}
          className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600"
        >
          Restart
        </button>
      </div>
    </div>
  );
}
