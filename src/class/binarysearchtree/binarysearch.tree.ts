import Queue from '../queue';
import Stack from '../stack';
import BinarySearchTreeNode, { type Data } from './binarysearch.node';

/**
 * Clase que representa un binary search tree y proporciona métodos para manipularlo.
 * Insertar:
 * https://youtu.be/MMjU88uZDlo?si=JlNPihyNOQib0ARm
 * Eliminar:
 * https://youtu.be/Nx2kDiqKrKE?si=7JSPbB-mzfD3rv2k
 * Arboles de expresion algebraica:
 * https://youtu.be/EijbqAdgxeA?si=1P0A4octzOCxSoir
 * https://youtu.be/EdxTaeX2W34?si=sCDvHlVA4GymjoXg
 */
export default class BinarySearchTree<T> {
  protected root: BinarySearchTreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  getRoot() {
    return this.root;
  }

  setRoot(newRoot: BinarySearchTreeNode<T> | null) {
    this.root = newRoot;
  }

  isEmpty(): boolean {
    return this.root === null;
  }

  getNode(root: BinarySearchTreeNode<T> | null, keyToSearch: number) {
    let x = root;

    while (x !== null) {
      if (keyToSearch < x.getData().key) {
        x = x.getLeft()!;
      } else if (keyToSearch > x.getData().key) {
        x = x.getRight()!;
      } else {
        return x;
      }
    }
    return null;
  }

  getNodeR(root: BinarySearchTreeNode<T> | null, keyToSearch: number) {
    const fn = (x: BinarySearchTreeNode<T> | null, key: number) => {
      if (x === null) {
        return null;
      } else if (x?.getData().key === key) {
        return x;
      } else if (key < x.getData().key) {
        return fn(x.getLeft(), key);
      } else {
        return fn(x.getRight(), key);
      }
    };
    return fn(root, keyToSearch);
  }

  // Cuenta la cantidad de datos
  cardinalityR(root: BinarySearchTreeNode<T> | null): number {
    let c: number;
    if (root === null) {
      c = 0;
    } else {
      const countLeftKeys = this.cardinality(root.getLeft());
      const countRightKeys = this.cardinality(root.getRight());
      c = countLeftKeys + countRightKeys + 1;
    }
    return c;
  }

  // Cuenta la cantidad de datos
  cardinality(root: BinarySearchTreeNode<T> | null): number {
    if (root === null) return 0;
    let x = root;
    let count = 0;
    const queue = new Queue<BinarySearchTreeNode<T>>();
    queue.add(x);
    while (!queue.isEmpty()) {
      x = queue.poll()!;
      count++;
      if (x.getLeft() !== null) {
        queue.add(x.getLeft()!);
      }
      if (x.getRight() !== null) {
        queue.add(x.getRight()!);
      }
    }
    return count;
  }

  // Cuenta la cantidad de nodos del arbol
  sizeR(root: BinarySearchTreeNode<T> | null): number {
    let c: number;
    if (root === null) {
      c = 0;
    } else {
      const countLeftNodes = this.sizeR(root.getLeft());
      const countRightNodes = this.sizeR(root.getRight());
      c = countLeftNodes + countRightNodes + 1;
    }
    return c;
  }

  size(root: BinarySearchTreeNode<T> | null): number {
    if (root === null) return 0;
    let x = root;
    let count = 0;
    const queue = new Queue<BinarySearchTreeNode<T>>();
    queue.add(x);
    while (!queue.isEmpty()) {
      x = queue.poll()!;
      count++;
      if (x.getLeft() !== null) {
        queue.add(x.getLeft()!);
      }
      if (x.getRight() !== null) {
        queue.add(x.getRight()!);
      }
    }
    return count;
  }

  heightR(root: BinarySearchTreeNode<T> | null) {
    let h: number;
    if (root === null) {
      h = 0;
    } else {
      const leftHeight = this.heightR(root.getLeft());
      const rightHeight = this.heightR(root.getRight());
      h = Math.max(leftHeight, rightHeight) + 1;
    }
    return h;
  }

  height(root: BinarySearchTreeNode<T> | null) {
    if (root === null) return 0;
    let x = root;
    const queue = new Queue<BinarySearchTreeNode<T>>();
    let height = 0;
    queue.add(x);
    while (!queue.isEmpty()) {
      const level = queue.size();
      for (let i = 0; i < level; i++) {
        x = queue.poll()!;
        if (x.getLeft() !== null) {
          queue.add(x.getLeft()!);
        }
        if (x.getRight() !== null) {
          queue.add(x.getRight()!);
        }
      }
      height++;
    }
    return height;
  }

  // Regresa el nodo minimo
  min(root: BinarySearchTreeNode<T> | null) {
    if (root === null) return null;
    let x = root;
    let ant = x;

    while (x !== null) {
      ant = x;
      x = x.getLeft()!;
    }

    return ant;
  }

  minR(root: BinarySearchTreeNode<T> | null): BinarySearchTreeNode<T> | null {
    if (root === null) {
      return null;
    } else if (root.getLeft() === null) {
      return root;
    } else {
      return this.minR(root.getLeft());
    }
  }

  // Regresa el nodo maximo
  max(root: BinarySearchTreeNode<T> | null) {
    if (root === null) return null;
    let x = root;
    let ant = x;

    while (x !== null) {
      ant = x;
      x = x.getRight()!;
    }

    return ant;
  }

  maxR(root: BinarySearchTreeNode<T> | null): BinarySearchTreeNode<T> | null {
    if (root === null) {
      return null;
    } else if (root.getRight() === null) {
      return root;
    } else {
      return this.maxR(root.getRight());
    }
  }

  hasKey(key: number) {
    return this.findKey(key) !== null;
  }

  findKey(keyToSearch: number) {
    return this.getNode(this.root, keyToSearch)?.getData().value;
  }

  findKeyR(keyToSearch: number) {
    return this.getNode(this.root, keyToSearch)?.getData().value;
  }

  levelOrderR() {
    if (this.root === null) return [];
    const levels: Array<Array<Data<T>>> = [];
    const fn = (root: BinarySearchTreeNode<T> | null, level: number) => {
      if (levels.length === level) {
        levels.push([]);
      }
      levels[level].push(root!.getData());
      if (root?.getLeft() !== null) {
        fn(root!.getLeft(), level + 1);
      }

      if (root?.getRight() !== null) {
        fn(root!.getRight(), level + 1);
      }
    };
    fn(this.root, 0);
    return levels.flat(1);
  }

  levelOrder() {
    if (this.root === null) return [];

    let x = this.root;
    const list: Array<Data<T>> = [];
    const queue = new Queue<BinarySearchTreeNode<T>>();
    queue.add(x);
    while (!queue.isEmpty()) {
      x = queue.poll()!;

      if (x.getLeft() !== null) {
        queue.add(x.getLeft()!);
      }
      if (x.getRight() !== null) {
        queue.add(x.getRight()!);
      }
      if (x.getData() !== null) {
        list.push(x.getData());
      }
    }
    return list;
  }

  preOrderR() {
    const list: Array<Data<T>> = [];
    const rec = (node: BinarySearchTreeNode<T> | null) => {
      if (node !== null) {
        list.push(node.getData());
        rec(node.getLeft());
        rec(node.getRight());
      }
    };
    rec(this.root);
    return list;
  }

  preOrder() {
    if (this.root === null) return [];

    let x = this.root;
    const list: Array<Data<T>> = [];
    const stack = new Stack<BinarySearchTreeNode<T>>();
    stack.push(x);
    while (!stack.isEmpty()) {
      x = stack.pop()!;

      if (x.getRight() !== null) {
        stack.push(x.getRight()!);
      }
      if (x.getLeft() !== null) {
        stack.push(x.getLeft()!);
      }
      if (x.getData() !== null) {
        list.push(x.getData());
      }
    }
    return list;
  }

  inOrderR() {
    const list: Array<Data<T>> = [];
    const rec = (node: BinarySearchTreeNode<T> | null) => {
      if (node !== null) {
        rec(node.getLeft());
        list.push(node.getData());
        rec(node.getRight());
      }
    };
    rec(this.root);
    return list;
  }

  inOrder() {
    if (this.root === null) return [];
    const list: Array<Data<T>> = [];
    const stack = new Stack<BinarySearchTreeNode<T>>();
    let x = this.root;

    while (!stack.isEmpty() || x !== null) {
      while (x !== null) {
        stack.push(x);
        x = x.getLeft()!;
      }

      x = stack.pop()!;
      list.push(x.getData());
      x = x.getRight()!;
    }

    return list;
  }

  postOrderR() {
    const list: Array<Data<T>> = [];
    const rec = (node: BinarySearchTreeNode<T> | null) => {
      if (node !== null) {
        rec(node.getLeft());
        rec(node.getRight());
        list.push(node.getData());
      }
    };
    rec(this.root);
    return list;
  }

  postOrder() {
    if (this.root === null) return [];
    const stack1 = new Stack<BinarySearchTreeNode<T>>();
    const stack2 = new Stack<BinarySearchTreeNode<T>>();
    const list: Data<T>[] = [];
    stack1.push(this.root);

    // Primera fase: llenar pila2 en orden inverso
    while (!stack1.isEmpty()) {
      const node = stack1.pop()!;
      stack2.push(node);

      if (node.getLeft() !== null) {
        stack1.push(node.getLeft()!);
      }
      if (node.getRight() !== null) {
        stack1.push(node.getRight()!);
      }
    }

    // Segunda fase: vaciar pila2 (este es el orden postOrder)
    while (!stack2.isEmpty()) {
      list.push(stack2.pop()!.getData());
    }

    return list;
  }

  rebuildPreOrderInOrder(paramPreOrderList: Array<Data<T>>, paramInOrderList: Array<Data<T>>) {
    const rebuild = (preOrderList: Array<Data<T>>, inOrderList: Array<Data<T>>) => {
      if (preOrderList.length === 0 && inOrderList.length === 0) return null;
      const currentData = preOrderList[0];
      const root = new BinarySearchTreeNode(currentData);
      const mid = inOrderList.findIndex((value) => value.key === root.getData().key);

      const nodeLeft = rebuild(preOrderList.slice(1, mid + 1), inOrderList.slice(0, mid));
      const nodeRight = rebuild(preOrderList.slice(mid + 1), inOrderList.slice(mid + 1));

      root.setLeft(nodeLeft);
      root.setRight(nodeRight);
      return root;
    };
    this.root = rebuild(paramPreOrderList, paramInOrderList);
  }

  rebuildPostOrderInOrder(paramPostOrderList: Array<Data<T>>, paramInOrderList: Array<Data<T>>) {
    const rebuild = (postOrderList: Array<Data<T>>, inOrderList: Array<Data<T>>) => {
      if (postOrderList.length === 0 && inOrderList.length === 0) return null;

      const currentData = postOrderList[postOrderList.length - 1];
      const root = new BinarySearchTreeNode(currentData);
      const mid = inOrderList.findIndex((value) => value.key === root.getData().key);

      const nodeLeft = rebuild(postOrderList.slice(0, mid), inOrderList.slice(0, mid));
      const nodeRight = rebuild(
        postOrderList.slice(mid, postOrderList.length - 1),
        inOrderList.slice(mid + 1)
      );

      root.setLeft(nodeLeft);
      root.setRight(nodeRight);
      return root;
    };
    this.root = rebuild(paramPostOrderList, paramInOrderList);
  }

  // cuenta la cantidad de hijos izquierdos
  countLeftChildren() {
    const fn = (node: BinarySearchTreeNode<T> | null): number => {
      let c: number;
      if (node === null) {
        c = 0;
      } else {
        const countLeft = fn(node.getLeft());
        const countRight = fn(node.getRight());
        if (node.getLeft() !== null) {
          c = countLeft + countRight + 1;
        } else {
          c = countLeft + countRight;
        }
      }
      return c;
    };
    return fn(this.root);
  }

  // cuenta la cantidad de hijos derechos
  countRightChildren() {
    const fn = (node: BinarySearchTreeNode<T> | null): number => {
      let c: number;
      if (node === null) {
        c = 0;
      } else {
        const countLeft = fn(node.getLeft());
        const countRight = fn(node.getRight());
        if (node.getRight() !== null) {
          c = countLeft + countRight + 1;
        } else {
          c = countLeft + countRight;
        }
      }
      return c;
    };
    return fn(this.root);
  }

  // Verifica si todos los nodos del nivel (n) tienen 2 hijos
  allNodesHaveTwoChildrenInLevel(targetLevel: number): boolean {
    const fn = (node: BinarySearchTreeNode<T> | null, currentTarget: number): boolean => {
      let b: boolean;
      if (node === null) {
        b = false;
      } else if (currentTarget === targetLevel) {
        b = node.hasTwoChildren();
      } else {
        const isCompleteForLeft = fn(node.getLeft(), currentTarget + 1);
        const isCompleteForRight = fn(node.getRight(), currentTarget + 1);
        b = isCompleteForLeft && isCompleteForRight;
      }
      return b;
    };
    return fn(this.root, 0);
  }

  // Cuenta la cantidad de nodos del nivel (n)
  countNodesInLevel(targetLevel: number) {
    const fn = (node: BinarySearchTreeNode<T> | null, currentTarget: number): number => {
      let c: number;
      if (node === null) {
        c = 0;
      } else if (currentTarget === targetLevel) {
        c = 1;
      } else {
        const cantidadPorIzquierda = fn(node.getLeft(), currentTarget + 1);
        const cantidadPorDerecha = fn(node.getRight(), currentTarget + 1);
        c = cantidadPorIzquierda + cantidadPorDerecha;
      }
      return c;
    };
    return fn(this.root, 0);
  }

  insert(data: Data<T>) {
    if (!data.key) throw new Error('La key no puede ser nulo');
    if (this.root === null) {
      this.root = new BinarySearchTreeNode<T>(data);
      return this;
    }
    let x = this.root;
    let ant = x;

    while (x !== null) {
      ant = x;
      if (data.key < x.getData().key) {
        x = x.getLeft()!;
      } else if (data.key > x.getData().key) {
        x = x.getRight()!;
      } else {
        x.getData().value = data.value;
        return this;
      }
    }

    const newNode = new BinarySearchTreeNode(data);
    if (data.key < ant.getData().key) {
      ant.setLeft(newNode);
    } else {
      ant.setRight(newNode);
    }
    return this;
  }

  insertR(data: Data<T>) {
    if (!data.key) throw new Error('La key no puede ser nulo');
    if (this.root === null) {
      this.root = new BinarySearchTreeNode<T>(data);
      return this;
    }
    const fn = (node: BinarySearchTreeNode<T> | null) => {
      if (node === null) {
        return new BinarySearchTreeNode<T>(data);
      } else {
        if (data.key < node.getData().key) {
          node.setLeft(fn(node.getLeft()));
        } else if (data.key > node.getData().key) {
          node.setRight(fn(node.getRight()));
        } else {
          node.setData(data);
        }
        return node;
      }
    };

    this.root = fn(this.root);
    return this;
  }

  // Elimina un nodo del arbol
  delete(keyToDelete: number) {
    const fn = (
      node: BinarySearchTreeNode<T> | null,
      key: number
    ): BinarySearchTreeNode<T> | null => {
      if (node === null) {
        return null;
      } else if (key < node.getData().key) {
        node.setLeft(fn(node.getLeft(), key));
      } else if (key > node.getData().key) {
        node.setRight(fn(node.getRight(), key));
      } else {
        // case 1
        if (node.isLeaf()) return null;
        // case 2
        if (node.getLeft() === null) return node.getRight();
        if (node.getRight() === null) return node.getLeft();
        // case 3
        const successor = this.min(node.getRight());
        // const predecessor = this.max(node!.getLeft());
        node.setData(successor!.getData());
        node.setRight(fn(node.getRight(), successor!.getData().key));
        // node.setLeft(fn(node.getLeft(), predecessor!.getData().key));
      }
      return node;
    };
    this.root = fn(this.root, keyToDelete);
    return this;
  }

  toString(): string {
    if (this.root === null) return 'El árbol está vacio';
    const fn = (node: BinarySearchTreeNode<T> | null, prefix: string, isLeft: boolean): string => {
      if (node === null) {
        return `${prefix + (isLeft ? '|-- ' : '└─- ')}null\n`;
      }

      let result = `${prefix + (isLeft ? '|-- ' : '└─- ')}${node.getData().key}\n`;

      const newPrefix = prefix + (isLeft ? '|  ' : '   ');

      result += fn(node.getLeft(), newPrefix, true);
      result += fn(node.getRight(), newPrefix, false);
      return result;
    };

    return `└── ${this.root.getData().key}\n${fn(
      this.root.getLeft(),
      '   ',
      true
    )}${fn(this.root.getRight(), '   ', false)}`;
  }
}
