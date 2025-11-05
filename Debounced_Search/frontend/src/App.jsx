import React, { useState, useEffect } from 'react';

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If input is empty, clear results
    if (searchText.trim() === '') {
      setProducts([]);
      return;
    }

    // Set a timer to delay API call
    const timer = setTimeout(() => {
      setIsLoading(true);
      fetch(`https://dummyjson.com/products/search?q=${searchText}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products || []);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }, 2000); // wait 2 seconds after typing stops

    // Cleanup previous timer if user types again
    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold text-center text-indigo-600 mb-4">
          🔍 Debounced Product Search
        </h2>

        {/* Input box */}
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Type to search..."
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-indigo-400"
        />

        {/* Loading message */}
        {isLoading && <p className="text-center text-gray-500">Searching...</p>}

        {/* Results */}
        {products.length > 0 && (
          <ul className="space-y-3 max-h-96 overflow-y-auto">
            {products.map((p) => (
              <li key={p.id} className="p-3 bg-gray-50 border rounded-lg">
                <p className="font-semibold text-gray-800">{p.title}</p>
                <p className="text-sm text-gray-600">{p.description}</p>
              </li>
            ))}
          </ul>
        )}

        {/* No results found */}
        {!isLoading && searchText && products.length === 0 && (
          <p className="text-center text-red-500 mt-3">No products found.</p>
        )}
      </div>
    </div>
  );
}




// Cleanup: return () => clearTimeout(timer)

// This is the heart of debouncing.

// Whenever searchTerm changes again (i.e., user types another character before 2s):

// The cleanup function runs

// It cancels the previous timer

// This prevents the API call from happening

// So the API only triggers for the latest change, not for each keystroke.