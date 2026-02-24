import Queue from '../queue';
import Stack from '../stack';
import NAryTreeNode from './nary.node';

/**
 * Es un arbol NArio
 * Se usa la primera representacion 
 * La segunda representación es usando un pountero extra
 * Cada hijo tiene un hermano excepto la raiz

             R                        R
           / | \                      |
          B  C  D                     B -- C -- D
         / \    |                     |         |
        E   F   G                     E -- F    G
 */
export default class NAryTree<T> {
  private root: NAryTreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  isEmpty(): boolean {
    return this.root === null;
  }

  getRoot(): NAryTreeNode<T> | null {
    return this.root;
  }

  setRoot(data: T) {
    this.root = new NAryTreeNode(data);
  }

  getNode(parentNode: NAryTreeNode<T> | null, dataToSearch: T) {
    if (parentNode === null) {
      return null;
    }

    const stack = new Stack<NAryTreeNode<T>>();
    stack.push(parentNode);

    while (!stack.isEmpty()) {
      const nodoActual = stack.pop()!;

      if (nodoActual.getData() === dataToSearch) {
        return nodoActual;
      }

      for (let i = nodoActual.countChilds() - 1; i >= 0; i--) {
        const child = nodoActual.getChild(i);
        if (child !== null) {
          stack.push(child);
        }
      }
    }

    return null;
  }

  getNodeR(root: NAryTreeNode<T> | null, keyToSearch: T) {
    const fn = (node: NAryTreeNode<T> | null, keyToSearch: T): NAryTreeNode<T> | null => {
      if (node === null) return null;
      if (keyToSearch === node.getData()) return node;

      for (const child of node.getChildrensArray()) {
        const found = fn(child, keyToSearch);
        if (found !== null) return found;
      }
      return null;
    };
    return fn(root, keyToSearch);
  }

  // Cuenta la cantidad de datos
  cardinalityR(root: NAryTreeNode<T> | null): number {
    let c: number;
    if (root === null) {
      c = 0;
    } else {
      let cardinalityOfChilds = 0;
      for (var child of root.getChildrensArray()) {
        cardinalityOfChilds += this.cardinality(child);
      }
      c = cardinalityOfChilds + 1;
    }
    return c;
  }

  // Cuenta la cantidad de datos
  cardinality(root: NAryTreeNode<T> | null): number {
    if (root === null) return 0;
    let x = root;
    let count = 0;
    const queue = new Queue<NAryTreeNode<T>>();
    queue.add(x);
    while (!queue.isEmpty()) {
      x = queue.poll()!;
      count++;

      for (let i = 0; i < x.countChilds(); i++) {
        const child = x.getChild(i);
        if (child !== null) {
          queue.add(child);
        }
      }
    }
    return count;
  }

  // Cuenta la cantidad de nodos del arbol
  sizeR(root: NAryTreeNode<T> | null): number {
    let c: number;
    if (root === null) {
      c = 0;
    } else {
      let sizeOfChilds = 0;
      for (const child of root.getChildrensArray()) {
        sizeOfChilds += this.sizeR(child);
      }
      c = sizeOfChilds + 1;
    }
    return c;
  }

  size(root: NAryTreeNode<T> | null): number {
    if (root === null) return 0;
    let x = root;
    let count = 0;
    const queue = new Queue<NAryTreeNode<T>>();
    queue.add(x);
    while (!queue.isEmpty()) {
      x = queue.poll()!;
      count++;

      for (let i = 0; i < x.countChilds(); i++) {
        const child = x.getChild(i);
        if (child !== null) {
          queue.add(child);
        }
      }
    }
    return count;
  }

  heightR(root: NAryTreeNode<T> | null) {
    let h: number;
    if (root === null) {
      h = 0;
    } else {
      let childrensHeight = 0;
      for (const child of root.getChildrensArray()) {
        childrensHeight = Math.max(childrensHeight, this.heightR(child));
      }
      h = childrensHeight + 1;
    }
    return h;
  }

  height(root: NAryTreeNode<T> | null) {
    if (root === null) return 0;
    let x = root;
    const queue = new Queue<NAryTreeNode<T>>();
    let height = 0;
    queue.add(x);
    while (!queue.isEmpty()) {
      const level = queue.size();
      for (let i = 0; i < level; i++) {
        x = queue.poll()!;
        for (const child of x.getChildrensArray()) {
          if (child !== null) {
            queue.add(child);
          }
        }
      }
      height++;
    }
    return height;
  }

  // Regresa el nodo minimo
  minR(root: NAryTreeNode<T> | null) {
    const fn = (
      node: NAryTreeNode<T> | null,
      min: NAryTreeNode<T> | null
    ): NAryTreeNode<T> | null => {
      if (node === null) return null;
      if (node.isLeaf()) return node;
      for (const child of node.getChildrensArray()) {
        const nodeActual = fn(child, min);
        if (nodeActual !== null && min !== null) {
          if (nodeActual.getData() < min?.getData()) {
            min = child;
          }
        }
      }
      return min;
    };
    return fn(root, root);
  }

  min(root: NAryTreeNode<T> | null) {
    if (root === null) {
      return null;
    }

    let min = root;
    const stack = new Stack<NAryTreeNode<T>>();
    stack.push(root);

    while (!stack.isEmpty()) {
      const nodoActual = stack.pop()!;

      if (min.getData() > nodoActual.getData()) {
        min = nodoActual;
      }

      for (let i = nodoActual.countChilds() - 1; i >= 0; i--) {
        const child = nodoActual.getChild(i);
        if (child !== null) {
          stack.push(child);
        }
      }
    }

    return min;
  }

  maxR(root: NAryTreeNode<T> | null) {
    const fn = (
      node: NAryTreeNode<T> | null,
      max: NAryTreeNode<T> | null
    ): NAryTreeNode<T> | null => {
      if (node === null) return null;
      if (node.isLeaf()) return node;
      for (const child of node.getChildrensArray()) {
        const nodeActual = fn(child, max);
        if (nodeActual !== null && max !== null) {
          if (nodeActual.getData() > max?.getData()) {
            max = child;
          }
        }
      }
      return max;
    };
    return fn(root, root);
  }

  // Regresa el nodo maximo
  max(root: NAryTreeNode<T> | null) {
    if (root === null) {
      return null;
    }

    let max = root;
    const stack = new Stack<NAryTreeNode<T>>();
    stack.push(root);

    while (!stack.isEmpty()) {
      const nodoActual = stack.pop()!;

      if (max.getData() < nodoActual.getData()) {
        max = nodoActual;
      }

      for (let i = nodoActual.countChilds() - 1; i >= 0; i--) {
        const child = nodoActual.getChild(i);
        if (child !== null) {
          stack.push(child);
        }
      }
    }

    return max;
  }

  preOrderR() {
    const list: Array<T> = [];
    const rec = (node: NAryTreeNode<T> | null) => {
      if (node === null) return;
      list.push(node.getData());
      for (let i = 0; i < node?.countChilds(); i++) {
        rec(node.getChild(i));
      }
    };
    rec(this.root);
    return list;
  }

  postOrderR() {
    const list: Array<T> = [];
    const rec = (node: NAryTreeNode<T> | null) => {
      if (node === null) return;
      for (let i = 0; i < node?.countChilds(); i++) {
        rec(node.getChild(i));
      }
      list.push(node.getData());
    };
    rec(this.root);
    return list;
  }

  insert(parentData: T, childrenData: T) {
    if (this.root === null) return this;
    const parentNode = this.getNode(this.root, parentData);
    if (parentNode === null) return this;
    parentNode?.appendChild(new NAryTreeNode(childrenData));
    return this;
  }

  insertR(parentData: T, childrenData: T) {
    if (this.root === null) return this;
    const parentNode = this.getNodeR(this.root, parentData);
    if (parentNode === null) return this;
    parentNode?.appendChild(new NAryTreeNode(childrenData));
    return this;
  }

  toString(): string {
    if (this.root === null) {
      return 'El árbol está vacío';
    }

    const fn = (node: NAryTreeNode<T> | null, prefix: string, isLast: boolean): string => {
      if (node === null) {
        return `${prefix + (isLast ? '└── ' : '├── ')}null\n`;
      }
      let result = `${prefix + (isLast ? '└── ' : '├── ')}${node.getData()}\n`;

      const newPrefix = prefix + (isLast ? '    ' : '│   ');

      const n = node.getChildrensArray().length;
      for (let i = 0; i < n; i++) {
        result += fn(node.getChild(i), newPrefix, i === n - 1);
      }

      return result;
    };

    return fn(this.root, '', true);
  }
}
