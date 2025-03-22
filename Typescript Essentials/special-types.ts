//---------------- NULL Type

let a: null | string;

a = "hi";
a = null;

const inputEl = document.getElementById("user_name")!;

if (!inputEl) throw new Error("Element Not Found");

console.log(inputEl);
// console.log(inputEl.value); // error value is not Property 'value'
// console.log(inputEl?.value); // optional chaining

//---------------- Type Casting
const inputHTML = document.getElementById("user_name") as HTMLInputElement | null;

// if (!inputHTML) throw new Error("this is error");

console.log(inputHTML?.value);
