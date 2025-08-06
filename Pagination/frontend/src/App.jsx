import React, { useEffect, useState } from 'react';

export default function LocalTable() {

  const [rawData, setRawData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none'); // 'asc', 'desc', 'none'
  const [sortField, setSortField] = useState('price'); // always price here
  const [sortScope, setSortScope] = useState('current'); // 'current' or 'entire'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Load all data once
    const fetchAllData = async () => {
      const res = await fetch('https://dummyjson.com/products?limit=100');
      const data = await res.json();
      setRawData(data.products);
    };
    fetchAllData();
  }, []);

  // 1️⃣ FILTER/SEARCH
  const filtered = rawData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2️⃣ SORT
  let sortedData = [...filtered];
  if (sortScope === 'entire' && sortOrder !== 'none') {
    sortedData.sort((a, b) => {
      if (sortOrder === 'asc') return a[sortField] - b[sortField];
      if (sortOrder === 'desc') return b[sortField] - a[sortField];
      return 0;
    });
  }

  // 3️⃣ PAGINATION
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pagedItems = sortedData.slice(start, start + itemsPerPage);

  // 4️⃣ SORT CURRENT PAGE if scope is 'current'
  const finalItems =
    sortScope === 'current' && sortOrder !== 'none'
      ? [...pagedItems].sort((a, b) => {
          if (sortOrder === 'asc') return a[sortField] - b[sortField];
          if (sortOrder === 'desc') return b[sortField] - a[sortField];
          return 0;
        })
      : pagedItems;

  
  const clearFilters = () => {
    setSearchTerm('');
    setSortOrder('none');
    setSortScope('current');
    setCurrentPage(1);
  };


  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Fully Client-Side Table</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search title..."
        value={searchTerm}
        onChange={(e) => { setCurrentPage(1); setSearchTerm(e.target.value); }}
        className="border px-2 py-1 mr-4"
      />

      {/* Sort order */}
      <select
        value={sortOrder}
        onChange={(e) => { setCurrentPage(1); setSortOrder(e.target.value); }}
        className="border px-2 py-1 mr-4"
      >
        <option value="none">No Sort</option>
        <option value="asc">Price Ascending</option>
        <option value="desc">Price Descending</option>
      </select>

      {/* Sort scope */}
      <select
        value={sortScope}
        onChange={(e) => { setCurrentPage(1); setSortScope(e.target.value); }}
        className="border px-2 py-1"
      >
        <option value="current">Sort Current Page</option>
        <option value="entire">Sort Entire Table</option>
      </select>

      {/* Clear filters button */}
      <button
        onClick={clearFilters}
        className="border px-3 py-1 bg-gray-100 hover:bg-gray-200 ml-4"
      >
        Clear Filters
      </button>

      {/* Table */}
      <table className="w-full border mt-4">
        <thead>
          <tr>
            <th className="border px-2 py-1">Title</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Description</th>
          </tr>
        </thead>
        <tbody>
          {finalItems.map(item => (
            <tr key={item.id}>
              <td className="border px-2 py-1">{item.title}</td>
              <td className="border px-2 py-1">${item.price}</td>
              <td className="border px-2 py-1">{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="border px-2 py-1"
        >
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="border px-2 py-1"
        >
          Next
        </button>
      </div>
    </div>
  );
}
