const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3001;


app.use(cors());
app.use(express.json());


let tasks = [];


app.get("/tasks", (req, res) => {
  res.json(tasks);
});


app.post("/tasks", (req, res) => {
  const { task, description } = req.body;
  const newTask = { id: uuidv4(), task, description, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});


app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { task, description, completed } = req.body;

  const index = tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], task, description, completed };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});


app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);

  if (tasks.length < initialLength) {
    res.json({ message: "Task deleted successfully" });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
