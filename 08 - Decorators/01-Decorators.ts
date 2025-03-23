/* 
Decorator is a piece of code that interact with other code.
Decorator is a OOP concept.
On very basic decorator is a function that attach to a class and interact with it.
*/

function logger<T extends new (...args: any[]) => any>(target: T, ctx: ClassDecoratorContext) {
  console.log(target);
  console.log(ctx);

  return class extends target {
    constructor(...args: any[]) {
      super();
      console.log(this);
    }
  };
}

function autoBind(target: (...args: any[]) => any, ctx: ClassMethodDecoratorContext) {
  ctx.addInitializer(function (this: any) {
    this[ctx.name] = this[ctx.name].bind(this);
  });

  return function (this: any) {
    target.apply(this);
  };
}

function Replacer<T>(initValue: T) {
  return function fieldlogger(target: undefined, ctx: ClassFieldDecoratorContext) {
    console.log(target);
    console.log(ctx);

    return (initialValue: any) => {
      console.log(`The initial value is: `, initialValue);
      return `${initialValue} ${initValue}`;
    };
  };
}

@logger
class Person {
  @Replacer("Sajwani")
  name = "Tabish";

  @autoBind
  greet() {
    console.log(`Hello from Person Class`);
    console.log("Inside greet value of this.name is: ", this.name);
  }
}

console.log(`Initiating Instance of Class`);
let tabish = new Person();
console.log(`calling greet method to print this.name`);
tabish.greet();
