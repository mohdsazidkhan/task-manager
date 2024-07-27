import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      addTask({ title, description, status });
      setTitle('');
      setDescription('');
      setStatus('To Do');
    }
  };

  return (
    <form className="p-4 bg-white shadow-md rounded" onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Description</label>
        <textarea
          className="mt-1 block w-full border border-gray-300 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Status</label>
        <select
          className="mt-1 block w-full border border-gray-300 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>
      <div className='flex justify-center'>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
      </div>
    </form>
  );
};

export default TaskForm;
