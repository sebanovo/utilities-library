import Queue from '../queue';
import Stack from '../stack';
import BinaryTreeNode, { type Data } from './binarysearch.node';

/**
 * Clase que representa un binary search tree y proporciona métodos para manipularlo.
 */
export default class BinarySearchTree<T> {
  protected root: BinaryTreeNode<T> | null;

  constructor () {
    this.root = null;
  }

  getRoot () {
    return this.root;
  }

  setRoot (newRoot: BinaryTreeNode<T> | null) {
    this.root = newRoot;
  }

  isEmpty (): boolean {
    return this.root === null;
  }

  // Cuenta la cantidad de datos
  cardinality (root: BinaryTreeNode<T> | null): number {
    let c: number;
    if (root === null) {
      c = 0;
    } else {
      c = 1;
      const countLeftKeys = this.cardinality(root.getLeft());
      const countRightKeys = this.cardinality(root.getRight());
      c += countLeftKeys + countRightKeys;
    }
    return c;
  }

  // Cuenta la cantidad de nodos del arbol
  sizeR (root: BinaryTreeNode<T> | null): number {
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

  size (root: BinaryTreeNode<T> | null): number {
    if (root === null) return 0;
    let x = root;
    let count = 0;
    const queue = new Queue<BinaryTreeNode<T>>();
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

  heightR (root: BinaryTreeNode<T> | null) {
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

  height (root: BinaryTreeNode<T> | null) {
    if (root === null) return 0;
    let x = root;
    const queue = new Queue<BinaryTreeNode<T>>();
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
  min (root: BinaryTreeNode<T> | null) {
    if (root === null) return null;
    let x = root;
    let ant = x;

    while (x !== null) {
      ant = x;
      x = x.getLeft()!;
    }

    return ant;
  }

  minR (root: BinaryTreeNode<T> | null): BinaryTreeNode<T> | null {
    if (root === null) {
      return null;
    } else if (root.getLeft() === null) {
      return root;
    } else {
      return this.minR(root.getLeft());
    }
  }

  // Regresa el nodo maximo
  max (root: BinaryTreeNode<T> | null) {
    if (root === null) return null;
    let x = root;
    let ant = x;

    while (x !== null) {
      ant = x;
      x = x.getRight()!;
    }

    return ant;
  }

  maxR (root: BinaryTreeNode<T> | null): BinaryTreeNode<T> | null {
    if (root === null) {
      return null;
    } else if (root.getRight() === null) {
      return root;
    } else {
      return this.maxR(root.getRight());
    }
  }

  hasKey (key: number) {
    return this.findKey(key) !== null;
  }

  findKey (key: number) {
    let x = this.root;

    while (x !== null) {
      if (key < x.getData().key) {
        x = x.getLeft()!;
      } else if (key > x.getData().key) {
        x = x.getRight()!;
      } else {
        return x.getData().value;
      }
    }
    return null;
  }

  findKeyR (keyToSearch: number) {
    const fn = (root: BinaryTreeNode<T> | null, key: number) => {
      if (root === null) {
        return null;
      } else {
        if (root?.getData().key === key) {
          return root.getData().value;
        } else if (key < root.getData().key) {
          return fn(root.getLeft(), key);
        } else {
          return fn(root.getRight(), key);
        }
      }
    };
    return fn(this.root, keyToSearch);
  }

  levelOrderR () {
    if (this.root === null) return [];
    const levels: Array<Array<Data<T>>> = [];
    const fn = (root: BinaryTreeNode<T> | null, level: number) => {
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

  levelOrder () {
    if (this.root === null) return [];

    let x = this.root;
    const list: Array<Data<T>> = [];
    const queue = new Queue<BinaryTreeNode<T>>();
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

  preOrderR () {
    const list: Array<Data<T>> = [];
    const rec = (node: BinaryTreeNode<T> | null) => {
      if (node !== null) {
        list.push(node.getData());
        rec(node.getLeft());
        rec(node.getRight());
      }
    };
    rec(this.root);
    return list;
  }

  preOrder () {
    if (this.root === null) return [];

    let x = this.root;
    const list: Array<Data<T>> = [];
    const stack = new Stack<BinaryTreeNode<T>>();
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

  inOrderR () {
    const list: Array<Data<T>> = [];
    const rec = (node: BinaryTreeNode<T> | null) => {
      if (node !== null) {
        rec(node.getLeft());
        list.push(node.getData());
        rec(node.getRight());
      }
    };
    rec(this.root);
    return list;
  }

  inOrder () {
    if (this.root === null) return [];
    const list: Array<Data<T>> = [];
    const stack = new Stack<BinaryTreeNode<T>>();
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

  postOrderR () {
    const list: Array<Data<T>> = [];
    const rec = (node: BinaryTreeNode<T> | null) => {
      if (node !== null) {
        rec(node.getLeft());
        rec(node.getRight());
        list.push(node.getData());
      }
    };
    rec(this.root);
    return list;
  }

  postOrder () {
    if (this.root === null) return [];

    let x = this.root;
    const stack = new Stack<BinaryTreeNode<T>>();
    const list: Array<Data<T>> = [];

    while (x !== null) {
      stack.push(x);
      if (x.getLeft() !== null) {
        x = x.getLeft()!;
      } else {
        x = x.getRight()!;
      }
    }

    while (!stack.isEmpty()) {
      const aux = stack.pop()!;
      list.push(aux.getData());
      if (!stack.isEmpty()) {
        const dad = stack.peek()!;
        if (dad.getRight() !== null && dad.getRight() !== aux) {
          let rightChildren = dad.getRight();
          while (rightChildren !== null) {
            stack.push(rightChildren);
            if (rightChildren.getLeft() !== null) {
              rightChildren = rightChildren.getLeft();
            } else {
              rightChildren = rightChildren.getRight();
            }
          }
        }
      }
    }
    return list;
  }

  rebuildPreOrderInOrder (
    paramPreOrderList: Array<Data<T>>,
    paramInOrderList: Array<Data<T>>
  ) {
    const rebuild = (preOrderList: Array<Data<T>>, inOrderList: Array<Data<T>>) => {
      if (preOrderList.length === 0 && inOrderList.length === 0) return null;
      const currentData = preOrderList[0];
      const root = new BinaryTreeNode(currentData);
      const mid = inOrderList.findIndex(
        (value) => value.key === root.getData().key
      );

      const nodeLeft = rebuild(
        preOrderList.slice(1, mid + 1),
        inOrderList.slice(0, mid)
      );
      const nodeRight = rebuild(
        preOrderList.slice(mid + 1),
        inOrderList.slice(mid + 1)
      );

      root.setLeft(nodeLeft);
      root.setRight(nodeRight);
      return root;
    };
    this.root = rebuild(paramPreOrderList, paramInOrderList);
  }

  rebuildPostOrderInOrder (
    paramPostOrderList: Array<Data<T>>,
    paramInOrderList: Array<Data<T>>
  ) {
    const rebuild = (postOrderList: Array<Data<T>>, inOrderList: Array<Data<T>>) => {
      if (postOrderList.length === 0 && inOrderList.length === 0) return null;

      const currentData = postOrderList[postOrderList.length - 1];
      const root = new BinaryTreeNode(currentData);
      const mid = inOrderList.findIndex(
        (value) => value.key === root.getData().key
      );

      const nodeLeft = rebuild(
        postOrderList.slice(0, mid),
        inOrderList.slice(0, mid)
      );
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
  countLeftChildren () {
    const fn = (node: BinaryTreeNode<T> | null): number => {
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
  countRightChildren () {
    const fn = (node: BinaryTreeNode<T> | null): number => {
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
  allNodesHaveTwoChildrenInLevel (targetLevel: number): boolean {
    const fn = (
      node: BinaryTreeNode<T> | null,
      currentTarget: number
    ): boolean => {
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
  countNodesInLevel (targetLevel: number) {
    const fn = (
      node: BinaryTreeNode<T> | null,
      currentTarget: number
    ): number => {
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

  insert (data: Data<T>) {
    if (!data.key) throw new Error('La key no puede ser nulo');
    if (this.root === null) {
      this.root = new BinaryTreeNode<T>(data);
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

    const newNode = new BinaryTreeNode(data);
    if (data.key < ant.getData().key) {
      ant.setLeft(newNode);
    } else {
      ant.setRight(newNode);
    }
    return this;
  }

  insertR (data: Data<T>) {
    if (!data.key) throw new Error('La key no puede ser nulo');
    if (this.root === null) {
      this.root = new BinaryTreeNode<T>(data);
      return this;
    }
    const fn = (node: BinaryTreeNode<T> | null) => {
      if (node === null) {
        return new BinaryTreeNode<T>(data);
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
  delete (keyToDelete: number) {
    const fn = (
      node: BinaryTreeNode<T> | null,
      key: number
    ): BinaryTreeNode<T> | null => {
      if (node === null) {
        return null;
      } else {
        if (key < node.getData().key) {
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
      }
      return node;
    };
    this.root = fn(this.root, keyToDelete);
    return this;
  }

  toString (): string {
    if (this.root === null) return 'El árbol está vacio';
    const fn = (
      node: BinaryTreeNode<T> | null,
      prefix: string,
      isLeft: boolean
    ): string => {
      if (node === null) {
        return prefix + (isLeft ? '|--(L) ' : '└──(R) ') + 'null\n';
      }

      let result =
        prefix + (isLeft ? '|--(L) ' : '└─-(R) ') + `${node.getData().key}\n`;

      const newPrefix = prefix + (isLeft ? '|  ' : '   ');

      result += fn(node.getLeft(), newPrefix, true);
      result += fn(node.getRight(), newPrefix, false);
      return result;
    };

    return (
      '└──(#) ' +
      this.root.getData().key +
      '\n' +
      fn(this.root.getLeft(), '   ', true) +
      fn(this.root.getRight(), '   ', false)
    );
  }
}
