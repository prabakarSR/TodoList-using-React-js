import "../components/TodoList.css";
import { useState } from "react";

export default function TodoList({ addTodo }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(taskName, description); 
    setTaskName(""); 
    setDescription("");
  };

  return (
    <div className="todoList">
      <form onSubmit={handleSubmit}>
        <div className="box">
          <div className="title">Add New Task</div>
          <br />
          <input
            onChange={(e) => setTaskName(e.target.value)}
            value={taskName}
            className="taskName-input"
            type="text"
            placeholder="Task Name"
            required
          />
          &nbsp;&nbsp;
          <span>
            <button
              type="submit"
              style={{
                width: "140px",
                height: "48px",
                backgroundColor: "#0d6efd",
                color: "white",
                border: "1px solid #0d6efd",
                borderRadius: "5px",
                fontSize: "19px",
              }}
            >
              Add Task
            </button>
          </span>
          <div>
            <input
              className="desc-input"
              placeholder="Description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>
          <br />
          <br />
          <br />
          <div className="taskList">Task List</div>
        </div>
      </form>
    </div>
  );
}
