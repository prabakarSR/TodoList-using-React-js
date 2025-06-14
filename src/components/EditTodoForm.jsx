import "../components/TodoList.css";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./EditTodoForm.css";

export default function EditTodoForm({ editTodo, task }) {
  const [taskName, setTaskName] = useState(task.task);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(taskName, description, task.id);
    setTaskName("");
    setDescription("");
  };

  return (
    <div className="todoList">
      <form onSubmit={handleSubmit}>
        <div className="box">
          <br />
          <input
            onChange={(e) => setTaskName(e.target.value)}
            value={taskName}
            className="taskName-input"
            type="text"
            placeholder="Update task"
            required
          />
          &nbsp;&nbsp;
          <span>
            <button
              type="submit"
              disabled={!taskName.trim() || !description.trim()}
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
              Update Task
            </button>
          </span>
          <div>
            <input
              className="desc-input"
              placeholder="Update description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
            <div className="line2"></div>
          </div>
        </div>
      </form>
    </div>
  );
}
