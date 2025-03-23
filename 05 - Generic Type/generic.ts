type GenericDataStore<T> = {
  [key: string]: T;
};

let store: GenericDataStore<string | boolean> = {};
store.name = "Tabish Store";
store.isInstructor = false;

//----------- Generic Functions
function merge<T>(a: T, b: T) {
  return [a, b];
}

merge<number>(2, 5);
merge(3, 7);
merge("Hiking", "Soccerr");

//------------ Multiple Generics
function merging<T, U>(a: T, b: U) {
  return [a, b];
}

merging<number, string>(2, "5");
merging("Apples", 7);
merging("Hiking", "Soccerr");

//------------- Generic Constraints
// TS allow us to provide constraints to our generic type.

function mergeObj<T extends object, U extends object>(a: T, b: U) {
  return { ...a, ...b };
}

console.log(mergeObj({ username: "tabish8612" }, { age: 5 }));

//----------- Generic Class and Interface
interface GenericInterface<T> {}

class GenericClass<T> {
  constructor(private name: T) {}
}
