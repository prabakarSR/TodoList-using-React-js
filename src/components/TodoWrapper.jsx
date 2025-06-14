import TodoList from "./TodoList";
import { useState, useEffect } from "react";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TodoWrapper.css"

export default function TodoWrapper() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }
        return res.json();
      })
      .then((data) => {
        setTodos(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const addTodo = (taskName, description) => {
    fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: taskName, description }),
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTodos([...todos, newTask]);
        toast.success("Task added successfully", {
          position: "top-right",
          autoClose: 2500,
          theme: "colored",
          transition: Bounce,
        });
      })
      .catch(() =>
        toast.error("Failed to add task", {
          theme: "colored",
          transition: Bounce,
        })
      );
  };

  const toggleComplete = (id) => {
    const todo = todos.find((t) => t.id === id);
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTodos(todos.map((todo) => (todo.id === id ? updatedTask : todo)));
      });
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
        toast.error("Task deleted successfully", {
          position: "top-right",
          autoClose: 2500,
          theme: "colored",
          transition: Bounce,
        });
      });
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (taskName, description, id) => {
    const todo = todos.find((t) => t.id === id);
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...todo,
        task: taskName,
        description,
      }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...updatedTask, isEditing: false } : todo
          )
        );
        toast.success("Task updated successfully", {
          position: "top-right",
          autoClose: 2500,
          theme: "colored",
          transition: Bounce,
        });
      });
  };

  return (
    <div className="TodoWrapper">
      <TodoList addTodo={addTodo} />
      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="loader"></div>
        </div>
      )}
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>
      )}
      {todos.length === 0 ? (
        <div className="font" style={{display:"flex", justifyContent:"center", marginTop:"50px", fontSize:"30px"}}>
          <div>Empty</div>
        </div>
      ) : (
        todos.map((todo) =>
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
          ) : (
            <Todo
              task={todo}
              key={todo.id}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          )
        )
      )}
      <ToastContainer />
    </div>
  );
}
