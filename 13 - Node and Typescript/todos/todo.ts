import express from "express";
import { addTodo, getTodos, getTodo, updateTodo, deleteTodo } from "./data.js";

const router = express.Router();

router.post("/todo", (req, res) => {
  const text = req.body.text;

  const addedTodo = addTodo(text);

  res.json({ message: "Todo Added", todo: addedTodo });
});

router.get("/todos", (req, res) => {
  const Todos = getTodos();
  res.json(Todos);
});

router.get("/todos/:id", (req, res) => {
  const todo = getTodo(+req.params.id);
  res.json({ message: "todo fetching successful", todo });
});

router.patch("/todo/:id", (req, res) => {
  const updatedTodo = updateTodo(+req.params.id, req.body.text);
  res.json({ message: "todo updating complete", updatedTodo });
});

router.delete("/todo/:id", (req, res) => {
  deleteTodo(+req.params.id);
  res.json({ message: "Todo deleted" });
});

export default router;
