"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_1 = __importDefault(require("./todos/todo"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(todo_1.default);
app.listen(3000);
