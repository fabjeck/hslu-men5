class TokenStore {
  constructor() {
    this.list = new Set();
  }

  add(refreshToken) {
    this.list.add(refreshToken);
  }

  remove(refreshToken) {
    this.list.remove(refreshToken);
  }

  contains(refreshToken) {
    return this.list.has(refreshToken);
  }
}

const singletonInstance = new TokenStore();
Object.freeze(singletonInstance);

export default singletonInstance;
