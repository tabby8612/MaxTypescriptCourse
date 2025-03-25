import { Component } from "./base-components.js";
import { autoBind as bindDector } from "../utility/autobind.js";
import { projectState } from "../state/app-state.js";
// import { Validable, validate } from "../utility/util.js";
import * as Validation from "../utility/util.js";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

  // @autoBind
  @bindDector
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

    const titleValidator: Validation.Validable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidator: Validation.Validable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidator: Validation.Validable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (!Validation.validate(titleValidator) || !Validation.validate(descriptionValidator) || !Validation.validate(peopleValidator)) {
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
