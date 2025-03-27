"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_js_1 = require("./data.js");
const router = express_1.default.Router();
router.post("/todo", (req, res) => {
    const text = req.body.text;
    const addedTodo = (0, data_js_1.addTodo)(text);
    res.json({ message: "Todo Added", todo: addedTodo });
});
exports.default = router;
