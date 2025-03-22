function getLength(val: any[]): number;
function getLength(val: string): string;
function getLength(val: string | any[]) {
  if (typeof val === "string") {
    const numberOfWords = val.split(" ").length;
    return `${numberOfWords} words`;
  }

  return val.length;
}

const numOfWords = getLength("does this work?");
numOfWords.length;
const numItems = getLength(["Sports", "Cookies"]);

//----------- Index Types
// allows unlimited properties in an object
type DataStore = {
  [prop: string]: number | boolean;
};

//similar to
let someObj: Record<string, number | boolean>;

let data1: DataStore = {};
data1.id = 15358;
data1.isAvailable = true;
// data1.name = "db"; //Error because value can only be number or boolean.

//------------ As const
// as const makes array readonly
let roles = ["admin", "editor", "visitor"] as const;

const firstRole = roles[0];
// roles.push("admin"); //! Error - Property 'push' does not exist on type 'readonly ["admin", "editor", "visitor"]'.ts(2339)

// ------------- satisfy
// is advanced feature in which TS confirms if object satisfy the Record type
// and then it make object concerte with provided key and values.

const dataEntries = {
  entry1: 0.51,
  entry2: -1.23,
} satisfies Record<string, number>;

dataEntries.entry1;
// dataEntries.entry3;
