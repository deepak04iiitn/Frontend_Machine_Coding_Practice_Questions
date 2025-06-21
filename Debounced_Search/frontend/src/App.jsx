import React, { useState, useEffect } from 'react';

export default function App() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 2000);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      setResults([]);
      return;
    }

    setLoading(true);
    fetch(`https://dummyjson.com/products/search?q=${debouncedQuery}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.products || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [debouncedQuery]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">🔍 Debounced Product Search</h2>
        <input
          type="text"
          value={query}
          placeholder="Search products..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-6"
        />

        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {results.length > 0 && (
          <ul className="space-y-4 max-h-[400px] overflow-y-auto">
            {results.map((item) => (
              <li key={item.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition">
                <p className="font-semibold text-lg text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </li>
            ))}
          </ul>
        )}

        {!loading && debouncedQuery && results.length === 0 && (
          <p className="text-center text-red-500 mt-4">No results found.</p>
        )}
      </div>
    </div>
  );
}
