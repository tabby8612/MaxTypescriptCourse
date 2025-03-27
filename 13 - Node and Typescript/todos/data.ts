interface Todo {
  id: number;
  text: string;
}

let TODOS: Todo[] = [];

export function addTodo(text: string) {
  const newTodo = { id: Math.random(), text };
  TODOS.push(newTodo);
  return newTodo;
}

export function getTodo(id: number) {
  const todo = TODOS.find((el) => el.id === id);

  if (!todo) {
    throw new Error("todo not found");
  }

  return todo;
}

export function getTodos() {
  return TODOS;
}

export function deleteTodo(id: number) {
  TODOS = TODOS.filter((el) => el.id !== id);
  return TODOS;
}

export function updateTodo(id: number, text: string) {
  const todo = getTodo(id);
  todo.text = text;
  return todo;
}
