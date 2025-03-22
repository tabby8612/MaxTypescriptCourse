interface Authenticable {
  email: string;
  password: string;

  login(): void;
  logout(): void;
}

interface Authenticable {
  role: string;
}

interface AdminAuthenticable extends Authenticable {
  isLoggedIn: boolean;
}

let student1: Authenticable = {
  email: "tabishsajwani@gmail.com",
  password: "123",
  role: "admin",

  login() {
    console.log(`logged In`);
  },

  logout() {
    console.log(`logged out`);
  },
};

class AuthenticableUser implements Authenticable {
  constructor(public email: string, public password: string, public role: string, private age: number) {}

  login() {}
  logout() {}
}

function isAuthenticated(user: Authenticable) {
  user.login();
}
