import React, { useEffect, useState } from 'react'

export default function App() {

  const [task , setTask] = useState('');
  const [todos , setTodos] = useState([]);
  const [editingIndex , setEditingIndex] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [filter, setFilter] = useState('All'); // All, Completed, Pending


  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if(storedTodos)
    {
      setTodos(JSON.parse(storedTodos));
    }

    setHasLoaded(true);
  } , [])

  useEffect(() => {
    if(hasLoaded) 
    {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, hasLoaded]);

  const addTodo = () => {
    if(task.trim())
    {
      if(editingIndex !== null) 
      {
        const updatedTodos = [...todos];
        updatedTodos[editingIndex].text = task;
        setTodos(updatedTodos);
        setEditingIndex(null); 
      } 
      else 
      {
        setTodos([...todos, { text: task, isCompleted: false }]);
      }
    }

    setTask('');

  }

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }

  const editTask = (index , todo) => {
    setEditingIndex(index);
    setTask(todo.text);
  }

  const deleteTodo = (index) => {
    const newTodos = todos.filter((item , i) => i !== index);
    setTodos(newTodos);
  }

  const filteredTodos = todos.filter((todo) => {
    if(filter === 'All') return true;
    if(filter === 'Completed') return todo.isCompleted;
    if(filter === 'Pending') return !todo.isCompleted;
    return true;
  });

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
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <div className="mt-6 space-x-4">
        <button
          className={`border cursor-pointer px-3 py-1 ${filter === 'All' ? 'bg-gray-300' : ''}`}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        <button
          className={`border cursor-pointer px-3 py-1 ${filter === 'Completed' ? 'bg-gray-300' : ''}`}
          onClick={() => setFilter('Completed')}
        >
          Completed
        </button>
        <button
          className={`border cursor-pointer px-3 py-1 ${filter === 'Pending' ? 'bg-gray-300' : ''}`}
          onClick={() => setFilter('Pending')}
        >
          Pending
        </button>
      </div>

      <div className="mt-8">
        {filteredTodos.length > 0 ? (
          <ul className="list-disc ml-5">
            {filteredTodos.map((todo, index) => (
              <li key={index} className="mb-4">
                <span className={todo.isCompleted ? 'line-through' : ''}>
                  {todo.text}
                </span>

                <button
                  className="ml-6 border px-3 py-1 cursor-pointer"
                  onClick={() => toggleComplete(index)}
                >
                  Done
                </button>

                <button
                  className="ml-4 border px-3 py-1 cursor-pointer"
                  onClick={() => editTask(index, todo)}
                >
                  Edit
                </button>

                <button
                  className="ml-4 border px-3 py-1 cursor-pointer"
                  onClick={() => deleteTodo(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ml-5 text-gray-500">No tasks found for selected filter.</p>
        )}
      </div>
    </div>
  );
}