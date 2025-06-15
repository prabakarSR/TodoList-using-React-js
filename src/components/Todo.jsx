import "./Todo.css";
import Swal from "sweetalert2";

export default function Todo({ task, toggleComplete, deleteTodo, editTodo }) {
  // Confirm delete function
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTodo(task.id);
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  };

  return (
    <div className="Todo">
      <div className="box2">
        <p
          role="button"
          tabIndex={0}
          onClick={() => toggleComplete(task.id)}
          style={{
            fontSize: "30px",
            fontFamily: "'Roboto', sans-serif",
            display: "inline-block",
            width: "437px",
            cursor: "pointer",
          }}
          className={`${task.completed ? "completed" : ""}`}
        >
          {task.task}
        </p>
        <button
          onClick={() => editTodo(task.id)}
          className="edit-btn"
          aria-label={`Edit task ${task.task}`}
        >
          Edit
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          onClick={handleDelete}
          className="del-btn"
          aria-label={`Delete task ${task.task}`}
        >
          Delete
        </button>
        <div
          style={{
            fontSize: "22px",
            marginTop: "7px",
            width: "430px",
            fontFamily: '"Times New Roman", Times, serif',
          }}
          className={`${task.completed ? "completed" : ""}`}
        >
          {task.description}
        </div>
        <div className="line"></div>
      </div>
    </div>
  );
}
