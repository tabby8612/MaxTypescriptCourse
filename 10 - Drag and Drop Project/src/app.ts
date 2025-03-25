interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) {}
}

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

interface Validable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validableInput: Validable): boolean {
  let isValid = true;

  if (validableInput.required) {
    isValid = isValid && validableInput.value.toString().length != 0;
  }
  if (validableInput.minLength != null && typeof validableInput.value === "string") {
    isValid = isValid && validableInput.value.length >= validableInput.minLength;
  }
  if (validableInput.maxLength != null && typeof validableInput.value === "string") {
    isValid = isValid && validableInput.value.length <= validableInput.maxLength;
  }
  if (validableInput.min != null && typeof validableInput.value === "number") {
    isValid = isValid && validableInput.value >= validableInput.min;
  }
  if (validableInput.max != null && typeof validableInput.value === "number") {
    isValid = isValid && validableInput.value <= validableInput.max;
  }

  return isValid;
}

function autoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState | null = null;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);

    this.projects.push(newProject);

    console.log(this.projects);

    this.updateListeners();
  }

  movProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  public templateElement: HTMLTemplateElement;
  public hostElement: T;
  public element: U;

  constructor(templateId: string, hostElementId: string, insertAtBeginning: boolean, newElementId?: string) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as U;

    if (newElementId) this.element.id = newElementId;

    this.attach(insertAtBeginning);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

class ProjectList extends Component<HTMLDivElement, HTMLFormElement> implements DragTarget {
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

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  private titleInputElement: HTMLInputElement;
  private descriptionInputElement: HTMLInputElement;
  private peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = document.querySelector("#title") as HTMLInputElement;
    this.descriptionInputElement = document.getElementById("description") as HTMLInputElement;
    this.peopleInputElement = document.getElementById("people") as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", (event: Event) => {
      event.preventDefault();
      this.submitHandler();
    });
  }

  @autoBind
  private submitHandler() {
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      this.clearInput();
      projectState.addProject(title, description, people);
    }
  }

  private gatherUserInput(): [string, string, number] | undefined {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = +this.peopleInputElement.value;

    const titleValidator: Validable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidator: Validable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidator: Validable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (!validate(titleValidator) || !validate(descriptionValidator) || !validate(peopleValidator)) {
      alert("Invalid Input. Please Try Again");
      return;
    } else {
      return [enteredTitle, enteredDescription, enteredPeople];
    }
  }

  private clearInput() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  renderContent(): void {}
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

const form = new ProjectInput();
const activeProjects = new ProjectList("active");
const finishedProjects = new ProjectList("finished");
