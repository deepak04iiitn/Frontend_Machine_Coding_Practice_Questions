import React, { useState } from 'react'

export default function App() {

  const [columns , setColumns] = useState({
    todo: {
      name : "To do",
      items : [
        {id: "1" , content: "Market research"},
        {id: "2" , content: "Write Projects"}
      ]
    },
    inProgress: {
      name : "In Progress",
      items : [
        {id: "3" , content: "Design UI mockups"},
      ]
    },
    done: {
      name : "Done",
      items : [
        {id: "4" , content: "Set up repository"},
      ]
    }
  });

  const [newTask , setNewTask] = useState("");
  const [activeColumn , setActiveColumn] = useState("todo");
  const [draggedItem , setDraggedItem] = useState(null);

  const addNewTask = () => {
    if(newTask.trim() === "") return;

    const updatedColumns = {...columns};

    updatedColumns[activeColumn].items.push({
      id: Date.now().toString(),
      content: newTask,
    });

    setColumns(updatedColumns);
    setNewTask("");
  };


  const removeTask = (columnId , taskId) => {

    const updatedColumns = {...columns};

    updatedColumns[columnId].items = updatedColumns[columnId].items.filter((item) => item.id !== taskId);

    setColumns(updatedColumns);
  };


  const handleDragStart = (columnId , item) => {
    setDraggedItem({columnId , item});
  };


  const handleDragOver = (e) => {
    e.preventDefault();
  };


  const handleDrop = (e , columnId) =>{
    e.preventDefault();

    if(!draggedItem) return;

    const {columnId : sourceColumnId , item} = draggedItem;

    if(sourceColumnId === columnId) return;    // dragging and then dropping it in the same box

    const updatedColumns = {...columns};

    updatedColumns[sourceColumnId].items = updatedColumns[sourceColumnId].items.filter((i) => i.id !== item.id);

    updatedColumns[columnId].items.push(item);

    setColumns(updatedColumns);
    setDraggedItem(null);
  };

  const getColumnColor = (columnId) => {
    const colors = {
      todo: 'bg-blue-100 border-blue-300',
      inProgress: 'bg-yellow-100 border-yellow-300', 
      done: 'bg-green-100 border-green-300'
    };
    return colors[columnId] || 'bg-gray-100 border-gray-300';
  };

  const getTaskColor = (columnId) => {
    const colors = {
      todo: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      inProgress: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200',
      done: 'bg-green-50 hover:bg-green-100 border-green-200'
    };
    return colors[columnId] || 'bg-gray-50 hover:bg-gray-100 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Kanban Board
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <input 
              type='text' 
              value={newTask} 
              onChange={(e) => setNewTask(e.target.value)} 
              placeholder='Add a new task...'
              onKeyDown={(e) => e.key === "Enter" && addNewTask()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />

            <select 
              value={activeColumn}
              onChange={(e) => setActiveColumn(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {Object.keys(columns).map((columnId) => (
                <option value={columnId} key={columnId}>
                  {columns[columnId].name}
                </option>
              ))}
            </select>

            <button 
              onClick={addNewTask}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium"
            >
              Add Task
            </button>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(columns).map((columnId) => (
            <div 
              key={columnId}
              onDragOver={(e) => handleDragOver(e , columnId)}
              onDrop={(e) => handleDrop(e , columnId)}
              className={`${getColumnColor(columnId)} rounded-xl border-2 border-dashed p-4 min-h-96 transition-all duration-300 hover:shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  {columns[columnId].name}
                </h2>
                <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-600 shadow-sm">
                  {columns[columnId].items.length}
                </span>
              </div>

              <div className="space-y-3">
                {columns[columnId].items.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 italic">
                    Drop tasks here
                  </div>
                ) : (
                  columns[columnId].items.map((item) => (
                    <div 
                      key={item.id} 
                      draggable
                      onDragStart={() => handleDragStart(columnId , item)}
                      className={`${getTaskColor(columnId)} p-3 rounded-lg border cursor-move transition-all duration-200 shadow-sm hover:shadow-md group`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium flex-1">
                          {item.content}
                        </span>
                        <button 
                          onClick={() => removeTask(columnId , item.id)}
                          className="ml-3 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}