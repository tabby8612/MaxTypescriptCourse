type StringArray = string[];

let num = 1;

type GetElementType<T> = T extends any[] ? T[number] : T;

type Example1 = GetElementType<StringArray>;
type Example2 = GetElementType<typeof num>;

//--------------------- Conditional Types In Functions

type FullNamePerson = { firstname: string; lastname: string };
type FullNameorNothing<T> = T extends FullNamePerson ? string : never;

function getFullName<T extends object>(person: T): FullNameorNothing<T> {
  if ("firstname" in person && "lastname" in person && person.firstname && person.lastname) {
    return `${person.firstname} ${person.lastname}` as FullNameorNothing<T>;
  }

  throw new Error("No firstname and/or lastname found");
}

//-------------------- Infer keyword
//infer keyword can help in getting type that is nested like return type of function.
function add(a: number, b: number) {
  return a + b;
}

function getName() {
  return "Tabish";
}

type AddFn = typeof add;
type getNameFn = typeof getName;

type ReturnValueType<T> = T extends (...args: any[]) => infer RV ? RV : never;

type AddFnReturnValueType = ReturnValueType<AddFn>;
type getNameReturnType = ReturnValueType<getNameFn>;

//------------------ Utility Types
// TS provides several built-in utility types,
// which are at https://www.typescriptlang.org/docs/handbook/utility-types.html

type FnReturnType = ReturnValueType<typeof getName>;
