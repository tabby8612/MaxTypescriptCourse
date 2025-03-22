type FileData = {
  type: "file";
  path: string;
  content: string;
  open(): void;
};

type DatabaseData = {
  type: "db";
  connectionUrl: string;
  credentials: string;
  load(): void;
};

type Status = {
  isOpen: boolean;
  errorMessage?: string;
};

type AccessedFileData = FileData & Status;
type AccessedDatabaseData = DatabaseData & Status;

//-------------- Type Guard
type Source = FileData | DatabaseData;

function loadData(data: Source) {
  if ("path" in data) {
    // Works with FileData object
    return;
  }

  data.connectionUrl;
}

//--------------- Discrimating Union Type
// in which we have one common property
// in two object and we use it to discrimate object.
function findData(source: Source) {
  if (source.type === "file") {
    console.log(`Access file`);
    return;
  }
  console.log(`Access data from `, source.connectionUrl);
}

//---------------- Type Guard with Instanceof
class User {
  constructor(public name: string) {}

  join() {}
}

class Admin {
  constructor(permissions: string[]) {}

  scan() {}
}

const user = new User("Max");
const admin = new Admin(["ban", "restore"]);

type Entity = User | Admin;

function init(entity: Entity) {
  if (entity instanceof User) {
    entity.join();
    return;
  }
  entity.scan();
}

//--------------- Intersection in Interface
interface FileData1 {
  path: string;
  content: string;
}

interface DatabaseData1 {
  connectionUrl: string;
  credentials: string;
}

interface Status1 {
  isOpen: boolean;
  errorMessage?: string;
}

interface AccessedFileData1 extends FileData, Status1 {}
interface AccessedDatabaseData1 extends DatabaseData, Status {}
