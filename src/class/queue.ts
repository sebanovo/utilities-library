/**
 * Clase Cola
 */
export default class Queue<T> {
  private list: T[] = [];

  isEmpty() {
    return this.list.length === 0;
  }

  add(item: T) {
    this.list.push(item);
    return true;
  }

  poll() {
    return this.list.shift();
  }

  peek() {
    if (this.list.length === 0) {
      return;
    }
    return this.list[0];
  }

  size() {
    return this.list.length;
  }

  getArray() {
    return [...this.list];
  }

  clear() {
    this.list = [];
  }
}
