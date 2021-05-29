class State {
  logged = false;

  user: string | null = null;

  constructor() {
    this.logged = false;
    this.user = '123';
  }

  signIn(userValue: string) {
    this.logged = true;
    this.user = userValue;
  }

  signOut() {
    this.logged = false;
    this.user = null;
  }
}

export default new State();
