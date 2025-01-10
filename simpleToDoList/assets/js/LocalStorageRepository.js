export class LocalStorageRepository {
  constructor(prefix = 'app') {
    this.prefix = prefix;
  }

  save(key, value) {
    const data = this._getAllData();
    data[key] = value;
    localStorage.setItem(this.prefix, JSON.stringify(data));
  }

  find(key) {
    const data = this._getAllData();
    return data[key] || null;
  }

  findAll() {
    return Object.values(this._getAllData());
  }

  delete(key) {
    const data = this._getAllData();
    delete data[key];
    localStorage.setItem(this.prefix, JSON.stringify(data));
  }

  clear() {
    localStorage.removeItem(this.prefix);
  }

  _getAllData() {
    const storedData = localStorage.getItem(this.prefix);
    return storedData ? JSON.parse(storedData) : {};
  }
}