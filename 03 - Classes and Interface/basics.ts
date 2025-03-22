abstract class User {
  private hobbies: string[] = ["coding", "gaming"];
  public readonly familyName: string = "Sajwani";
  private fullName: string = "";

  constructor(private name: string, private age: number) {}

  get printHobbies() {
    return this.hobbies;
  }

  set fname(firstName: string) {
    this.fullName = firstName + " " + this.familyName;
  }
}

class Admin extends User {
  constructor(private role: string) {
    super("Tabish", 34);
  }
}

const user1 = new Admin("SuperAdmin");
console.log(user1.printHobbies);
