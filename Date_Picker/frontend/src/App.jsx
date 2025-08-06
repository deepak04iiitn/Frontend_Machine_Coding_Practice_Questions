import React, { useState } from 'react';

const getDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

export default function App() {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [rangeMode, setRangeMode] = useState(false);
  const [range, setRange] = useState({ start: null, end: null });

  const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    if (rangeMode) {
      if (!range.start || (range.start && range.end)) {
        setRange({ start: date, end: null });
      } else {
        if (date < range.start) {
          setRange({ start: date, end: range.start });
        } else {
          setRange({ ...range, end: date });
        }
      }
    } else {
      setSelectedDate(date);
    }
  };

  const isInRange = (date) => {
    if (range.start && range.end) {
      return date >= range.start && date <= range.end;
    }
    return false;
  };

  const getRangeCount = () => {
    if (range.start && range.end) {
      const diff = Math.ceil(
        (range.end - range.start) / (1000 * 60 * 60 * 24)  // milliseconds to days
      ) + 1;
      return diff;
    }
    return 0;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-6 bg-white rounded shadow font-sans">
        <h2 className="text-2xl font-bold mb-4 text-center">Custom Calendar</h2>
        <button
          onClick={() => setRangeMode(!rangeMode)}
          className="mb-6 w-full px-4 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {rangeMode ? 'Switch to Single Date' : 'Switch to Date Range'}
        </button>

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevMonth}
            className="px-3 py-1 bg-gray-200 cursor-pointer rounded hover:bg-gray-300"
          >
            &lt;
          </button>
          <h3 className="font-semibold text-lg">
            {currentDate.toLocaleString('default', { month: 'long' })}{' '}
            {currentDate.getFullYear()}
          </h3>
          <button
            onClick={handleNextMonth}
            className="px-3 py-1 bg-gray-200 cursor-pointer rounded hover:bg-gray-300"
          >
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="font-medium text-gray-700 text-base">
              {day}
            </div>
          ))}

          {Array(days[0].getDay())
            .fill(null)
            .map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

          {days.map((day) => {
            const isSelected =
              !rangeMode && selectedDate && day.toDateString() === selectedDate.toDateString();
            const isStart =
              range.start && day.toDateString() === range.start.toDateString();
            const isEnd = range.end && day.toDateString() === range.end.toDateString();
            const inRange = isInRange(day);

            const baseClasses =
              'w-12 h-12 flex items-center justify-center rounded cursor-pointer transition text-lg';

            const bgColor = isSelected || isStart || isEnd
              ? 'bg-blue-600 text-white'
              : inRange
                ? 'bg-blue-100 text-blue-800'
                : 'hover:bg-gray-200';

            return (
              <div
                key={day.toDateString()}
                onClick={() => handleDateClick(day)}
                className={`${baseClasses} ${bgColor}`}
              >
                {day.getDate()}
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-base text-center">
          {rangeMode ? (
            <>
              <p>Start: {range.start?.toDateString() || 'None'}</p>
              <p>End: {range.end?.toDateString() || 'None'}</p>
              <p className="font-semibold">
                {range.start && range.end
                  ? `Total Days Selected: ${getRangeCount()}`
                  : ''}
              </p>
            </>
          ) : (
            <p>Selected Date: {selectedDate?.toDateString() || 'None'}</p>
          )}
        </div>
      </div>
    </div>
  );
}
