/**
 * Clase Pila.
 */
export default class Stack<T> {
  private list: T[] = [];

  isEmpty() {
    return this.list.length === 0;
  }

  push(item: T) {
    this.list.push(item);
    return item;
  }

  pop() {
    return this.list.pop();
  }

  peek() {
    if (this.list.length === 0) {
      return;
    }
    return this.list[this.list.length - 1];
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
