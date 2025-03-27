import express, { NextFunction, Request, Response } from "express";
import todoRoutes from "./todos/todo";

const app = express();

app.use(express.json());

app.use(todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "An Error Has Occurred" });
});

app.listen(3000);
