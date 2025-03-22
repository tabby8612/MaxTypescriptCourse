//--------- unknown Type
// both any and unknown used when type of values are not known. They work with slight difference
// any type disables typescript type-checking, while unknown doesn't disable it.

function process(val: unknown) {
  if (typeof val === "string") {
    val.toLowerCase();
  }
}

function process1(val: any) {
  val.toLowerCase();
}

//---------- Optional
function generateError(msg?: string) {
  console.log(msg);
}

generateError("Hello");
generateError();

type TUser = {
  name: string;
  email: string;
  role?: "admin" | "guest";
};

let tuser1: TUser = {
  name: "tabish",
  email: "tabishsajwani@hotmail.com",
  role: "admin",
};

let tuser2: TUser = {
  name: "tabish",
  email: "tabishsajwani@hotmail.com",
};

//--------- Nullish Coalescing
// In JS nullish ?? operator checks if value is falsy then it gets RHS value.
// In TS nullish ?? operator checks if value is only either NULL or undefined then it gets RHS value.

let input = "";
const didProvideInput = input ?? false;
