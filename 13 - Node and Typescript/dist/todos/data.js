"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTodo = addTodo;
exports.getTodo = getTodo;
exports.getTodos = getTodos;
exports.deleteTodo = deleteTodo;
exports.updateTodo = updateTodo;
let TODOS = [];
function addTodo(text) {
    const newTodo = { id: Math.random(), text };
    TODOS.push(newTodo);
    return newTodo;
}
function getTodo(id) {
    const todo = TODOS.find((el) => el.id === id);
    if (!todo) {
        throw new Error("todo not found");
    }
    return todo;
}
function getTodos() {
    return TODOS;
}
function deleteTodo(id) {
    TODOS = TODOS.filter((el) => el.id !== id);
    return TODOS;
}
function updateTodo(id, text) {
    const todo = getTodo(id);
    todo.text = text;
    return todo;
}
