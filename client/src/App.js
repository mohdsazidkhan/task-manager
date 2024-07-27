import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Filter from './components/Filter';

const App = () => {

  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/tasks`)
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = (task) => {
    axios.post(`${process.env.REACT_APP_API_URL}/tasks`, task)
      .then(response => {
        const newTask = response.data;
        const updatedTasks = [...tasks, newTask];
        const sortedTasks = updatedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTasks(sortedTasks);
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const updateTask = (id, status) => {
    axios.put(`${process.env.REACT_APP_API_URL}/tasks/${id}`, { status })
      .then(response => setTasks(tasks.map(task => task._id === id ? response.data : task)))
      .catch(error => console.error('Error updating task:', error));
  };

  const deleteTask = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };

  const filteredTasks = filterStatus === 'All'
    ? tasks
    : tasks.filter(task => task.status === filterStatus);

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-3xl font-bold text-center mb-2">Task Manager</h1>
      <TaskForm addTask={addTask} />
      <Filter status={filterStatus} setStatus={setFilterStatus} />
      <TaskList tasks={filteredTasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
