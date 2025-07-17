import React, { useState } from "react";
import "./App.css";
import json from "./data.json";

// Render list of objects with recursion if it has a children
const List = ({ list, addNodeToList, deleteNodeFromList }) => {
  const [isExpanded, setIsExpanded] = useState({});

  return (
    <div className="container">
      {list.map((node) => (
        <div key={node.id}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {node.isFolder && (
              <span
                onClick={() =>
                  setIsExpanded((prev) => ({
                    ...prev,
                    [node.name]: !prev[node.name],
                  }))
                }
              >
                {isExpanded?.[node.name] ? "- " : "+ "}
              </span>
            )}

            <span style={{ marginLeft: "4px" }}>{node.name}</span>

            {node.isFolder && (
              <span onClick={() => addNodeToList(node.id)}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfMt43f5llkF5OgPwtIozkZk38jQu2r-3XCg&s"
                  alt="add icon"
                  className="icon"
                />
              </span>
            )}

            <span onClick={() => deleteNodeFromList(node.id)}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png"
                alt="delete icon"
                className="icon"
              />
            </span>
          </div>

          {isExpanded?.[node.name] && node?.children && (
            <List
              list={node.children}
              addNodeToList={addNodeToList}
              deleteNodeFromList={deleteNodeFromList}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [data, setData] = useState(json);

  const addNodeToList = (parentId) => {
    const name = prompt("Enter Name");

    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Date.now().toString(),
                name: name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }

        // Recursively calling over its children
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }

        return node;
      });
    };

    setData((prev) => updateTree(prev));
  };

  const deleteNodeFromList = (itemId) => {
    const updateTree = (list) => {
      return list
        .filter((node) => node.id !== itemId)
        .map((node) => {
          if (node.children) {
            return { ...node, children: updateTree(node.children) };
          }

          return node;
        });
    };

    setData((prev) => updateTree(prev));
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <List
        list={data}
        addNodeToList={addNodeToList}
        deleteNodeFromList={deleteNodeFromList}
      />
    </div>
  );
}
