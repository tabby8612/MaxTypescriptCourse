enum Role {
  Admin,
  Editor,
  Guest,
}

let adminUser: Role = 0;
let editorUser: Role = Role.Editor;

enum CusRole {
  Admin = 1,
  Editor,
  Guest,
}

// let admin: CusRole = 0; // error now number starts from 1
let guest: CusRole = CusRole.Guest;

//Literal Types

let role: "admin" | "editor" | "guest" = "admin";

let nums: [1 | -1, 4 | 5];
nums = [1, 5];
nums = [-1, 4];
// nums = [0,4];  // error as 0 is not defined and not assigable to 1 or -1

// ---------------------- Types ---------------------------
// instead of defining literal types again and again we can define it as type.

type User = "admin" | "editor" | "guest";

let user1: User = "admin";

function roles(a: User, b: User) {
  //now parameters can have only one of these three values of type user
  console.log(a);
}

// roles("admin", "visitor"); // error '"visitor"' is not assignable to parameter of type 'User'
roles("admin", "editor");
