let hobbies = ["Playing", "Coding"];

// hobbies.push(10);

let users: (string | number)[];
let adminUsers: Array<string | number>;

users = [1, "Max"];
users = ["Max", 1];
users = ["Max", "Tabish"];
users = [1, 1];

adminUsers = [1, "Max"];
adminUsers = ["Max", 1];
adminUsers = ["Max", "Tabish"];
adminUsers = [1, 1];

//-----  tuples - fixing type and no. of parameters
let possibleValues: [number, string];

possibleValues = [5, "five"];
// possibleValues = [5, 5]; // error
// possibleValues = ["five", "5"]; // error

let user: {
  name: string;
  regNo: string | number;
  hobbies: string[];
  role: {
    description: string;
    id: number;
  };
} = {
  name: "Tabish",
  regNo: "Bc230203410",
  hobbies: ["codding", "gaming", "exercising"],
  role: {
    description: "problem solving",
    id: 1,
  },
};

// NOT null (can be any type except null)
// let val: {} = null;  //error
let val: {} = "abc";

//RECORD Type: When object keys and values are not known before.
let data: Record<string, string | number>;

data = {
  name: "Tabish",
  age: 21,
};
