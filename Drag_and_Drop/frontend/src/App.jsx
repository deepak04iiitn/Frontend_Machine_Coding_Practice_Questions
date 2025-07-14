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

  return (
    <div>
      <div>

        <h1>Kanban Board</h1>

        <div>

          <input type='text' value={newTask} 
            onChange={(e) => setNewTask(e.target.value)} 
            placeholder='Add a new task'
            onKeyDown={(e) => e.key === "Enter" && addNewTask()}
          />

          <select value={activeColumn}
            onChange={(e) => setActiveColumn(e.target.value)}
          >

            {Object.keys(columns).map((columnId) => (
              <option value={columnId} key={columnId}>
                {columns[columnId].name}
              </option>
            ))}

          </select>

          <button onClick={addNewTask}>Add</button>

        </div>

        <div>
          {Object.keys(columns).map((columnId) => (
            <div key={columnId}
              onDragOver={(e) => handleDragOver(e , columnId)}
              onDrop={(e) => handleDrop(e , columnId)}
            >
              <div>
                {columns[columnId].name}
                <span>{columns[columnId].items.length}</span>
              </div>

              <div>
                {columns[columnId].items.length === 0 ? (
                  <div>Drop taks here</div>
                ) : (
                  columns[columnId].items.map((item) => (
                    <div key={item.id} className='draggable' onDragStart={() => handleDragStart(columnId , item)}>
                      <span>{item.content}</span>
                      <button onClick={() => removeTask(columnId , item.id)}>
                        <span>x</span>
                      </button>
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
