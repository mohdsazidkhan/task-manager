import React from 'react';

const Filter = ({ status, setStatus }) => {
  return (
    <div className="mb-2 mt-2 flex justify-end items-center gap-4">
      <label className="block text-gray-700">Filter by Status</label>
      <select
        className="mt-1 block border border-gray-300 rounded w-28"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>All</option>
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
    </div>
  );
};

export default Filter;
