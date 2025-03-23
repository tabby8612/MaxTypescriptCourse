type User = { name: string; age: number };
type UserKeys = keyof User;

let validKey: UserKeys;

validKey = "name";
validKey = "age";

function getProp<T extends object, U extends keyof T>(obj: T, key: U) {
  const val = obj[key];

  return val;
}

const data = { id: 1, isStored: true, values: [-1, 2, 5] };
const value = getProp(data, "isStored");

//-------------- Indexed Type
type AppUser = {
  name: string;
  age: number;
  permission: {
    id: string;
    title: string;
    description: string;
  }[];
};

type Permission = AppUser["permission"];
type perm1 = Permission[number];
