import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

const form = new ProjectInput();
const activeProjects = new ProjectList("active");
const finishedProjects = new ProjectList("finished");
