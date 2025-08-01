import React, { useEffect, useState } from 'react';

export default function App() {

  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [filter, setFilter] = useState('All'); // All, Completed, Pending
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, hasLoaded]);

  const addTodo = () => {
    if (task.trim()) {
      if (editingId !== null) {
        const updatedTodos = todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: task } : todo
        );
        setTodos(updatedTodos);
        setEditingId(null);
      } else {
        const newTodo = {
          id: Date.now().toString(), // Unique ID
          text: task,
          isCompleted: false
        };
        setTodos([...todos, newTodo]);
      }
    }
    setTask('');
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  const editTask = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setTask(todoToEdit.text);
      setEditingId(id);
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  
  const filteredTodos = todos
    .filter((todo) => {
      if (filter === 'All') return true;
      if (filter === 'Completed') return todo.isCompleted;
      if (filter === 'Pending') return !todo.isCompleted;
      return true;
    })
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="p-6">
      <div>
        <span className="text-2xl">Enter the task : </span>
        <input
          type="text"
          className="border-2 px-2 py-1"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="ml-4 border-2 px-4 py-1 bg-blue-500 text-white cursor-pointer"
          onClick={addTodo}
        >
          {editingId !== null ? 'Update' : 'Add'}
        </button>
      </div>

      {/* 🔍 Search Bar */}
      <div className="mt-4">
        <span className="text-lg">Search: </span>
        <input
          type="text"
          className="border px-2 py-1"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mt-6 space-x-4">
        <button
          className={`border cursor-pointer px-3 py-1 ${
            filter === 'All' ? 'bg-gray-300' : ''
          }`}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        <button
          className={`border cursor-pointer px-3 py-1 ${
            filter === 'Completed' ? 'bg-gray-300' : ''
          }`}
          onClick={() => setFilter('Completed')}
        >
          Completed
        </button>
        <button
          className={`border cursor-pointer px-3 py-1 ${
            filter === 'Pending' ? 'bg-gray-300' : ''
          }`}
          onClick={() => setFilter('Pending')}
        >
          Pending
        </button>
      </div>

      <div className="mt-8">
        {filteredTodos.length > 0 ? (
          <ul className="list-disc ml-5">
            {filteredTodos.map((todo) => (
              <li key={todo.id} className="mb-4">
                <span className={todo.isCompleted ? 'line-through' : ''}>
                  {todo.text}
                </span>

                <button
                  className="ml-6 border px-3 py-1 cursor-pointer"
                  onClick={() => toggleComplete(todo.id)}
                >
                  Done
                </button>

                <button
                  className="ml-4 border px-3 py-1 cursor-pointer"
                  onClick={() => editTask(todo.id)}
                >
                  Edit
                </button>

                <button
                  className="ml-4 border px-3 py-1 cursor-pointer"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ml-5 text-gray-500">No tasks found for selected filter or search term.</p>
        )}
      </div>
    </div>
  );
}
