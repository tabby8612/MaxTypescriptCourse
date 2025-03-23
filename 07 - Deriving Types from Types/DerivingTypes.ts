//------- TS typeof
let setting = {
  difficulty: "easy",
  level: 5,
  isAdminAccessRequire: true,
  buttons: ["Start", "Search"],
};

type Setting = typeof setting;

function applySettings(s: typeof setting) {}

//---- TS typeof
// we can also derived function type using typeof keyword
function sum(a: number, b: number) {
  return a + b;
}
function subtract(a: number, b: number) {
  return a - b;
}

type SumFn = typeof sum;
type SubtractFn = typeof subtract;

function performMathAction(cb: SumFn | SubtractFn) {
  // some code...
}
