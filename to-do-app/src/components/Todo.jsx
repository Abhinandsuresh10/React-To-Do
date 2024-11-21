import { useEffect, useState } from "react"
import ListTodo from "./ListTodo"
import { ToastContainer, toast } from 'react-toastify';

const Todo = () => {
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [])

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
       },[todos]);

    const handleInputChange =  (event) => {
        setTodo(event.target.value)
    }

    const handleAddTodo = () => {
      if (todo.trim()) {
        const newTodo = { id: Date.now(), text: todo, isComplete: false, Time: new Date().toLocaleString() };
        setTodos([...todos, newTodo]);
        setTodo("");
    
        toast.success("Todo added!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
    
   
    const handleEditTodo = (index, updatedTodo) => {
      const updatedTodos = [...todos];
      updatedTodos[index] = updatedTodo; 
      setTodos(updatedTodos);
    };
    
    const handleDeleteTodo = (index) => {
      const confirmDelete = () => {
        const updateTodos = todos.filter((_, i) => i !== index);
        setTodos(updateTodos);
        toast.error("Todo deleted!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
      };

      const confirmToast = toast(
        <div className="flex flex-col items-center justify-center bg-gray-800 text-white p-4 rounded-lg">
          <span>Are you sure you want to delete this todo?</span>
          <div className="flex space-x-4 mt-2 ">
            <button
              onClick={() => {
                confirmDelete(); 
                toast.dismiss(confirmToast); 
              }}
              className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-700"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(confirmToast)} 
              className="bg-gray-600 px-4 py-2 rounded text-white hover:bg-gray-800"
            >
              No
            </button>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          hideProgressBar: true,
        }
      );

    }
    

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center">
    <div className="w-full max-w-md  p-6 rounded-lg shadow-lg bg-gray-900">
      <h2 className="text-2xl font-bold text-center text-gray-100 mb-4">Todo App</h2>

      <div className="flex mb-4 ">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a new todo" value={todo} onChange={handleInputChange}
        />
        <button onClick={handleAddTodo} className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
          Add
        </button>
      </div>

      <ListTodo todos={todos} onEditTodo={handleEditTodo} onDeleteTodo={handleDeleteTodo}/>
      <ToastContainer />

    </div>
  </div>
  )
}

export default Todo
