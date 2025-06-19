import React, { useState, useEffect } from 'react';

export default function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('timers')) || []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime(prev => prev + 10), 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(history));
  }, [history]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ((ms % 1000) / 10).toFixed(0);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => setIsRunning(!isRunning);

  const handleReset = () => {
    if (time > 0) {
      setHistory([...history, { time, laps }]);
    }
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) setLaps([...laps, time]);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <h1 className='text-4xl font-bold mb-4'>⏱️ Stopwatch</h1>
      <div className='text-5xl font-mono mb-4'>{formatTime(time)}</div>
      <div className='space-x-2 mb-4'>
        <button
          onClick={handleStartPause}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer'
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer'
        >
          Reset
        </button>
        <button
          onClick={handleLap}
          className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer'
        >
          Lap
        </button>
      </div>

      {laps.length > 0 && (
        <div className='mb-4'>
          <h2 className='text-xl font-semibold'>Laps</h2>
          <ul className='list-disc list-inside'>
            {laps.map((lap, index) => (
              <li key={index}>{`Lap ${index + 1}: ${formatTime(lap)}`}</li>
            ))}
          </ul>
        </div>
      )}

      {history.length > 0 && (
        <div className='mt-6 w-full max-w-md'>
          <h2 className='text-xl font-semibold'>Past Timers</h2>
          <ul className='mt-2 space-y-2'>
            {history.map((entry, index) => (
              <li key={index} className='p-2 bg-white shadow rounded'>
                <strong>Time:</strong> {formatTime(entry.time)}
                {entry.laps.length > 0 && (
                  <ul className='list-disc list-inside text-sm ml-4'>
                    {entry.laps.map((lap, i) => (
                      <li key={i}>{`Lap ${i + 1}: ${formatTime(lap)}`}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
