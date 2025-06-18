import React, { useState, useEffect } from 'react';

export default function App() {

  const tabs = ['tab1', 'tab2', 'tab3'];
  const [active, setActive] = useState('tab1');

  const tabContent = {
    tab1:
      "The morning air was crisp, filled with the scent of dew-soaked grass and distant blooming flowers. Birds chirped rhythmically, creating a gentle melody that seemed to echo nature’s quiet optimism. Everything felt calm, as if the world had paused for a brief moment of peace.",
    tab2:
      "Technology evolves at an astonishing pace, reshaping the way we work, communicate, and live. From artificial intelligence to quantum computing, innovations once thought impossible are now becoming reality. The challenge is not just to keep up, but to use these tools responsibly and creatively.",
    tab3:
      "In a small coastal town, life moved at its own leisurely pace. The waves kissed the shore with predictable regularity, and locals gathered each evening to share stories under starlit skies. It was a place where time wasn’t measured in hours, but in moments well lived.",
  };

  // Keyboard navigation effect
  useEffect(() => {

    const handleKeyDown = (e) => 
    {
      const currentIndex = tabs.indexOf(active);

      if(e.key === 'ArrowRight') 
      {
        const nextIndex = (currentIndex + 1) % tabs.length;
        setActive(tabs[nextIndex]);
      } 
      else if(e.key === 'ArrowLeft') 
      {
        const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        setActive(tabs[prevIndex]);
      }

    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    
  }, [active]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4'>
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">Press ⬅️ or ➡️ to navigate</h1>

      <div className='space-x-4'>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`border-2 px-4 py-2 rounded ${
              active === tab ? 'bg-blue-200' : 'hover:bg-gray-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className='mt-10 max-w-2xl text-center bg-white p-6 rounded shadow'>
        <p className='text-gray-700'>{tabContent[active]}</p>
      </div>
    </div>
  );
}
