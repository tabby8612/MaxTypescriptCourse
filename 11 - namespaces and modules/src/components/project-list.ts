import { Component } from "./base-components.js";
import { Project, ProjectStatus } from "../models/project-model.js";
import { DragTarget, Draggable } from "../models/drag-drop-interface.js";
import { projectState } from "../state/app-state.js";

export class ProjectList extends Component<HTMLDivElement, HTMLFormElement> implements DragTarget {
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }
  configure() {
    this.element.addEventListener("dragover", (e: DragEvent) => {
      this.dragOverHandler(e);
    });

    this.element.addEventListener("dragleave", (e: DragEvent) => {
      this.dragLeaveHandler(e);
    });

    this.element.addEventListener("drop", (e: DragEvent) => {
      this.dropHandler(e);
    });

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;

      this.renderProjects();
      this.renderContent();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent = this.type.toUpperCase() + " PROJECTS";
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
    listEl.innerHTML = "";

    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }

  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] == "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  dropHandler(event: DragEvent): void {
    console.log(`Drop Handler`);
    console.log(event.dataTransfer!.getData("text/plain"));

    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.movProject(prjId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
  }
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(event: DragEvent) {
    console.log(event);
  }

  configure() {
    this.element.addEventListener("dragstart", (e: DragEvent) => {
      this.dragStartHandler(e);
    });

    this.element.addEventListener("dragend", (e: DragEvent) => {
      this.dragEndHandler(e);
    });
  }

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;

    this.element.querySelector("h3")!.textContent = `${this.project.people == 1 ? "1 Person" : this.project.people + " Persons"} Assigned`;

    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
