import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="mt-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by task name..."
          className="p-2 px-4 border border-gray-300 rounded-md w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredTasks?.length === 0?
      <div>No Record Found!</div>
      :
      <>
      {filteredTasks.map((task) => (
        <div key={task._id} className="p-4 bg-white shadow-md rounded mb-2">
          <h3 className="text-xl font-bold">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>
          <div className="flex justify-between items-center gap-4">
            <div className='flex justify-start items-center gap-4'>
            <label className="block text-gray-700">Status</label>
            <select
              className="block w-32 border border-gray-300 rounded"
              value={task.status}
              onChange={(e) => updateTask(task._id, e.target.value)}
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
            </div>
            
            <button
            onClick={() => deleteTask(task._id)}
            className=" text-red-600 p-2"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          </div>
          <div className='mt-2 text-gray-500 text-sm'>Created At: {format(new Date(task.createdAt), 'dd MMMM yyyy \'at\' hh:mm aa')}</div>
        </div>
      ))}
      </>
      }
    </div>
  );
};

export default TaskList;
