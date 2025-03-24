function WithTemplate(template: string, hookId: string) {
  // This is Factory that returns decorator
  return function <T extends new (...args: any[]) => any>(originalConstructor: T) {
    // This is decorator that can return attached class
    return class extends originalConstructor {
      // This is attached class
      constructor(..._: any[]) {
        super();
        console.log(`Rendering Template`);

        const divEl = document.getElementById(hookId);
        const p = new originalConstructor();

        if (divEl) {
          divEl.innerHTML = template;
          divEl.querySelector("h1")!.innerHTML += p.name;
        }
      }
    };
  };
}

@WithTemplate("<h1>Hello from </h1>", "app")
class Person {
  name = "Tabish";

  constructor() {
    console.log(`Creating person object...`);
  }

  setName(@required fname: string) {
    this.name = fname;
  }

  getName() {
    console.log(this.name);
    return this.name;
  }
}

const pers = new Person();

function render(template: string, hookId: string) {
  console.log(`Message from render`);
  return function (constructor: any) {
    console.log(`Message from Render's constructor`);
    const divEl = document.getElementById(hookId);

    const p = new constructor();

    if (divEl) {
      divEl.innerHTML = template;
      divEl.querySelector("h1")!.innerHTML += p.name;
    }
  };
}

function moreRender(template: string, hookId: string) {
  console.log(`Message from moreRender`);
  return function (constructor: any) {
    console.log(`Message from moreRender's constructor`);
    const app2 = document.getElementById(hookId);

    const p = new constructor();

    if (app2) {
      app2.innerHTML = template;
      app2.querySelector("h2")!.innerHTML += p.name;
    }
  };
}

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  console.log(target);
  console.log(propertyKey);
  console.log(parameterIndex);
}

const btn = document.getElementById("btn");
btn?.addEventListener("click", function () {
  const per1: Person = new Person();
  per1.getName();
});

class Course {
  private title: string;
  private price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  getTitle(): string {
    return this.title;
  }

  getPrice(): number {
    return this.price;
  }
}

const form = document.getElementById("form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  console.log(titleEl.value);
  console.log(priceEl.value);
});
