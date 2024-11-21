import { useState } from "react";
  

const ListTodo = ({ todos, onEditTodo, onDeleteTodo }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [crossItems, setCrossItems] = useState([]);

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingValue(todos[index].text); 
  };

  const saveEdit = () => {
    if (editingValue.trim()) {
      const updatedTodo = { ...todos[editingIndex], text: editingValue };
      onEditTodo(editingIndex, updatedTodo); 
      setEditingIndex(null);
      setEditingValue("");
    }
  };

  const toggleCross = (index) => {
    setCrossItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <ul className="space-y-2">
      {todos.map((todo, index) => (
        <li
          key={todo.id}
          className="flex items-center justify-between bg-gray-300 p-3 rounded-lg shadow-sm"
        >
          {editingIndex === index ? (
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={(e) => e.key === "Enter" && saveEdit()}
              autoFocus
            />
          ) : (
            <span
              className={crossItems.includes(index) ? "text-gray-900 line-through" : "text-gray-900"}
              onClick={() => toggleCross(index)}
            >
              {todo.text}
            </span>
          )}
          <div className="flex space-x-2">
            <button className="text-yellow-700 hover:text-yellow-700" onClick={() => startEditing(index)}>
              Edit
            </button>
            <button className="text-red-700 hover:text-red-700" onClick={() => onDeleteTodo(index)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListTodo;

