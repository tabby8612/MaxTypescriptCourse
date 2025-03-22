//------------------ Return Type
function add(a: number, b: number): number {
  return a + b;
}

// void means function will end without returning anything.
function print(message: string): void {
  console.log(`${message} is posted`);
}

// never means function will never end as it throws error that needs to be catch
function logAndThrow(errorMessage: string): never {
  console.log(errorMessage);
  throw new Error("Error has occured");
}

//----------------------- Function as Parameter Type
function printMessage(cb: (m: string) => void) {
  cb("Print it");
}

printMessage(logAndThrow);

type UserType = {
  name: string;
  age: number;
  greet: () => string;
};

let userT1: UserType = {
  name: "Tabish",
  age: 25,
  greet() {
    console.log(`Greeting message`);
    return "greet";
  },
};
