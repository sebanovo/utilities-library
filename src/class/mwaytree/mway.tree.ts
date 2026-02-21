import type { Data } from '../binarysearchtree/binarysearch.node';
import MWayTreeNode, { DEFAULT_GRADE } from './mway.node';
import Queue from '../queue';
import Stack from '../stack';
// pending
// inorder (iterative)
// postOrder (iterative)

/**
 * Clase que representa un arbol m-way tree y proporciona métodos para manipularlo.
 */
export default class MWayTree<T> {
  protected root: MWayTreeNode<T> | null;
  protected degree: number;

  constructor(degree: number = DEFAULT_GRADE) {
    this.degree = degree;
    this.root = null;
  }

  getRoot() {
    return this.root;
  }

  setRoot(newRoot: MWayTreeNode<T> | null) {
    this.root = newRoot;
  }

  isEmpty(): boolean {
    return this.root === null;
  }

  getNode(root: MWayTreeNode<T> | null, key: number) {
    let x = root;
    while (x !== null) {
      let updateNode = false;
      for (let i = 0; !updateNode && i < x.countData(); i++) {
        if (key === x.getData(i)?.key) {
          return x.getData(i);
        }
        if (key < x.getData(i)!.key) {
          updateNode = true;
          x = x.getChild(i)!;
        }
      }
      if (!updateNode) {
        x = x.getChild(x.countData())!;
      }
    }
    return null;
  }

  getNodeR(root: MWayTreeNode<T> | null, keyToSearch: number) {
    const fn = (node: MWayTreeNode<T> | null, key: number) => {
      if (node === null) {
        return null;
      } else {
        let updateNode = false;
        for (let i = 0; !updateNode && i < node.countData(); i++) {
          if (key === node.getData(i)?.key) {
            return node.getData(i);
          } else if (key < node.getData(i)!.key) {
            updateNode = true;
            return fn(node.getChild(i), key);
          }
        }
        if (!updateNode) {
          return fn(node.getChild(node.countData()), key);
        }
      }
      return null;
    };
    return fn(root, keyToSearch);
  }

  cardinality(root: MWayTreeNode<T> | null): number {
    let c = 0;
    if (root === null) {
      return 0;
    } else {
      c = root.countData();
      for (let i = 0; i < root.countData(); i++) {
        c += this.cardinality(root.getChild(i));
      }
      c += this.cardinality(root.getChild(root.countData()));
    }
    return c;
  }

  // Cuenta la cantidad de nodos del arbol
  size(root: MWayTreeNode<T> | null): number {
    if (root === null) return 0;
    let x = root;
    let count = 0;
    const queue = new Queue<MWayTreeNode<T>>();
    queue.add(x);
    while (!queue.isEmpty()) {
      x = queue.poll()!;
      count++;
      for (let i = 0; i < x.countData(); i++) {
        if (x.getChild(i) !== null) {
          queue.add(x.getChild(i)!);
        }
      }
      if (x.getChild(x.countData()) !== null) {
        queue.add(x.getChild(x.countData())!);
      }
    }
    return count;
  }

  sizeR(root: MWayTreeNode<T> | null): number {
    let result = 0;
    if (root === null) {
      // nada
    } else {
      for (let i = 0; i < root.countData(); i++) {
        result += this.sizeR(root.getChild(i));
      }
      result += this.sizeR(root.getChild(root.countData())) + 1;
    }
    return result;
  }

  heightR(root: MWayTreeNode<T> | null) {
    let h = 0;
    if (root === null) {
      // nada
    } else {
      for (let i = 0; i < root.countData(); i++) {
        h = Math.max(h, this.heightR(root.getChild(i)));
      }
      h = Math.max(h, this.heightR(root.getChild(root.countData()))) + 1;
    }
    return h;
  }

  height(root: MWayTreeNode<T> | null) {
    if (root === null) return 0;
    let x = root;
    const queue = new Queue<MWayTreeNode<T>>();
    let height = 0;
    queue.add(x);
    while (!queue.isEmpty()) {
      const level = queue.size();
      for (let i = 0; i < level; i++) {
        x = queue.poll()!;
        for (let j = 0; j < x.countData(); j++) {
          if (x.getChild(j) !== null) {
            queue.add(x.getChild(j)!);
          }
        }

        if (x.getChild(x.countData()) !== null) {
          queue.add(x.getChild(x.countData())!);
        }
      }
      height++;
    }
    return height;
  }

  // Regresa el nodo minimo
  min(root: MWayTreeNode<T> | null) {
    if (root === null) return null;
    let x = root;
    let ant = x;

    while (x !== null) {
      ant = x;
      x = x.getChild(0)!;
    }

    return ant;
  }

  minR(root: MWayTreeNode<T> | null): MWayTreeNode<T> | null {
    if (root === null) {
      return null;
    } else if (root.getChild(0) === null) {
      return root;
    } else {
      return this.minR(root.getChild(0));
    }
  }

  // Regresa el nodo maximo
  max(root: MWayTreeNode<T> | null) {
    if (root === null) return null;
    let x = root;
    let ant = x;

    while (x !== null) {
      ant = x;
      x = x.getChild(x.countData())!;
    }

    return ant;
  }

  maxR(root: MWayTreeNode<T> | null): MWayTreeNode<T> | null {
    if (root === null) {
      return null;
    } else if (root.getChild(root.countData()) === null) {
      return root;
    } else {
      return this.maxR(root.getChild(root.countData()));
    }
  }

  hasKey(key: number) {
    return this.findKey(key) !== null;
  }

  findKey(keyToSearch: number) {
    return this.getNode(this.root, keyToSearch)?.value;
  }

  findKeyR(keyToSearch: number) {
    return this.getNodeR(this.root, keyToSearch)?.value;
  }

  levelOrder() {
    if (this.root === null) return [];

    let x = this.root;
    const list: Array<Data<T>> = [];
    const queue = new Queue<MWayTreeNode<T>>();
    queue.add(x);
    while (!queue.isEmpty()) {
      x = queue.poll()!;
      for (let i = 0; i < x.countData(); i++) {
        list.push(x.getData(i)!);
        if (x.getChild(i) !== null) {
          queue.add(x.getChild(i)!);
        }
      }

      if (x.getChild(x.countData()) !== null) {
        queue.add(x.getChild(x.countData())!);
      }
    }
    return list;
  }

  levelOrderR() {
    if (this.root === null) return [];
    const levels: Array<Array<Data<T>>> = [];
    const fn = (root: MWayTreeNode<T> | null, level: number) => {
      if (levels.length === level) {
        levels.push([]);
      }
      for (let i = 0; i < root!.countData(); i++) {
        levels[level].push(root!.getData(i)!);
        if (root?.getChild(i) !== null) {
          fn(root!.getChild(i), level + 1);
        }
      }
      if (root?.getChild(root.countData()) !== null) {
        fn(root!.getChild(root!.countData()), level + 1);
      }
    };
    fn(this.root, 0);
    return levels.flat(1);
  }

  preOrder(): Array<Data<T>> {
    if (this.root === null) return [];

    interface Frame {
      node: MWayTreeNode<T>;
      index: number;
    }

    const list: Array<Data<T>> = [];
    const stack = new Stack<Frame>();
    stack.push({ node: this.root, index: 0 });

    while (!stack.isEmpty()) {
      // miramos el nodo
      const frame = stack.peek()!;
      const { node } = frame;
      const i = frame.index;

      if (i < node.countData()) {
        list.push(node.getData(i)!);
        frame.index++;
        const child = node.getChild(i);
        if (child !== null) {
          stack.push({ node: child, index: 0 });
        }
      } else {
        stack.pop();
        const child = node.getChild(node.countData());
        if (child !== null) {
          stack.push({ node: child, index: 0 });
        }
      }
    }

    return list;
  }

  preOrderR() {
    const list: Array<Data<T>> = [];
    const rec = (node: MWayTreeNode<T> | null) => {
      if (node !== null) {
        for (let i = 0; i < node.countData(); i++) {
          list.push(node.getData(i)!);
          rec(node.getChild(i));
        }
        rec(node.getChild(node.countData()));
      }
    };
    rec(this.root);
    return list;
  }

  postOrderR() {
    const list: Array<Data<T>> = [];
    const rec = (node: MWayTreeNode<T> | null) => {
      if (node !== null) {
        rec(node.getChild(0));
        for (let i = 0; i < node.countData(); i++) {
          rec(node.getChild(i + 1));
          list.push(node.getData(i)!);
        }
      }
    };
    rec(this.root);
    return list;
  }

  inOrderR() {
    const list: Array<Data<T>> = [];
    const rec = (node: MWayTreeNode<T> | null) => {
      if (node !== null) {
        for (let i = 0; i < node.countData(); i++) {
          rec(node.getChild(i));
          list.push(node.getData(i)!);
        }
        rec(node.getChild(node.countData()));
      }
    };
    rec(this.root);
    return list;
  }

  insertR(data: Data<T>) {
    if (!data.key) throw new Error('La key no puede ser nulo');

    const fn = (node: MWayTreeNode<T> | null): MWayTreeNode<T> => {
      if (node === null) {
        const newNode = new MWayTreeNode<T>(this.degree);
        newNode.setData(0, data);
        return newNode;
      } else {
        for (let i = 0; i < node.countData(); i++) {
          if (data.key === node.getData(i)?.key) {
            node.getData(i)!.value = data.value;
            return node;
          } else if (data.key < node.getData(i)!.key) {
            if (node.countEmptyData() > 0) {
              for (let j = node.countData(); j > i; j--) {
                node.setData(j, node.getData(j - 1));
              }
              node.setData(i, data);
            } else {
              node.setChild(i, fn(node.getChild(i)));
              return node;
            }
            return node;
          }
        }
        if (node.countEmptyData() > 0) {
          node.setData(node.countData(), data);
        } else {
          node.setChild(node.countData(), fn(node.getChild(node.countData())));
        }
      }
      return node;
    };
    this.root = fn(this.root);

    return this;
  }

  insert(data: Data<T>): this {
    if (this.root === null) {
      const newNodo = new MWayTreeNode<T>(this.degree);
      newNodo.setData(0, data);
      this.root = newNodo;
      return this;
    }
    let x = this.root;
    while (x !== null) {
      let b = false;
      for (let i = 0; i < x.countData(); i++) {
        if (data.key === x.getData(i)?.key) {
          x.getData(i)!.value = data.value;
          return this;
        }
        if (data.key < x.getData(i)!.key) {
          if (x.isLeaf()) {
            if (x.countEmptyData() > 0) {
              for (let j = x.countData(); j > i; j--) {
                x.setData(j, x.getData(j - 1));
              }
              x.setData(i, data);
              return this;
            } else {
              const newNodo = new MWayTreeNode<T>(this.degree);
              newNodo.setData(0, data);
              x.setChild(i, newNodo);
              return this;
            }
          } else {
            if (x.getChild(i) === null) {
              x.setChild(i, new MWayTreeNode<T>(this.degree));
            }
            x = x.getChild(i)!;
            b = true;
            break;
          }
        }
      }
      if (!b) {
        if (x.isLeaf()) {
          if (x.countEmptyData() > 0) {
            x.setData(x.countData(), data);
            return this;
          } else {
            const newNodo = new MWayTreeNode<T>(this.degree);
            newNodo.setData(0, data);
            x.setChild(x.countData(), newNodo);
            return this;
          }
        } else {
          if (x.getChild(x.countData()) === null) {
            x.setChild(x.countData(), new MWayTreeNode<T>(this.degree));
          }
          x = x.getChild(x.countData())!;
        }
      }
    }
    return this;
  }

  private getSuccesorInOrder(key: number): Data<T> | null {
    const array = this.inOrderR();
    const index = array.findIndex((value) => value.key === key);
    return array[index + 1];
  }

  private getPredecessorInOrder(key: number): Data<T> | null {
    const array = this.inOrderR();
    const index = array.findIndex((value) => value.key === key);
    return array[index - 1];
  }

  private hasChildToBefore(node: MWayTreeNode<T>, init: number): boolean {
    for (let i = init + 1; i < node.countData(); i++) {
      if (node.getChild(i) !== null) {
        return true;
      }
    }
    return node.getChild(node.countData()) !== null;
  }

  delete(keyToDelete: number) {
    const fn = (node: MWayTreeNode<T> | null, key: number): MWayTreeNode<T> | null => {
      if (node === null) {
        return null;
      } else {
        for (let i = 0; i < node.countData(); i++) {
          if (key === node.getData(i)?.key) {
            // caso 1
            if (node.isLeaf()) {
              for (let j = i; j < node.countData() - 1; j++) {
                node.setData(j, node.getData(j + 1));
              }
              node.setData(node.countData() - 1, null);
              return node.countData() === 0 ? null : node;
            } else {
              // case 2.1 find succesor in order
              // case 2.2 find predecessor in order
              const replacementData = this.hasChildToBefore(node, i)
                ? this.getSuccesorInOrder(key)
                : this.getPredecessorInOrder(key);
              const modifiedNode = fn(node, replacementData!.key);
              modifiedNode!.setData(i, replacementData);
              return modifiedNode;
            }
          }
          if (key < node.getData(i)!.key) {
            node.setChild(i, fn(node.getChild(i), key));
            return node;
          }
        }
        node.setChild(node.countData(), fn(node.getChild(node.countData()), key));
      }
      return node;
    };
    this.root = fn(this.root, keyToDelete);
  }

  toString(): string {
    if (this.root === null) {
      return 'El árbol está vacío';
    }

    const fn = (node: MWayTreeNode<T> | null, prefix: string, isLast: boolean): string => {
      if (node === null) {
        return `${prefix + (isLast ? '└── ' : '├── ')}null\n`;
      }
      console.log(node);
      let result = `${prefix + (isLast ? '└── ' : '├── ')}[${node
        .getDataArray()
        .map((d) => (d ? d.key : ' '))
        .join(', ')}]\n`;

      const newPrefix = prefix + (isLast ? '    ' : '│   ');

      for (let i = 0; i < node.countData(); i++) {
        result += fn(node.getChild(i), newPrefix, i === node.countData());
      }

      result += fn(node.getChild(node.countData()), newPrefix, true);

      return result;
    };

    return fn(this.root, '', true);
  }

  // cuenta la cantidad de hijos izquierdos
  countLeftChildren() {
    const fn = (node: MWayTreeNode<T> | null): number => {
      if (node === null) {
        return 0;
      } else {
        let count = 0;
        for (let i = 0; i < node.countData(); i++) {
          if (node.getChild(i) !== null) {
            count++;
          }
          count += fn(node.getChild(i));
        }
        count += fn(node.getChild(node.countData()));
        return count;
      }
    };
    return fn(this.root);
  }

  // cuenta la cantidad de hijos derechos
  countRightChildren() {
    const fn = (node: MWayTreeNode<T> | null): number => {
      if (node === null) {
        return 0;
      } else {
        let count = 0;
        for (let i = 0; i < node.countData(); i++) {
          count += fn(node.getChild(i));
        }
        count += fn(node.getChild(node.countData()));
        if (node.getChild(node.countData()) !== null) {
          count++;
        }
        return count;
      }
    };
    return fn(this.root);
  }

  // Verifica si el nodo tiene todos sus nodos hijos
  isFullNodeinLevel(targetLevel: number): boolean {
    const fn = (node: MWayTreeNode<T> | null, currentTarget: number): boolean => {
      if (node === null) {
        return false;
      } else if (currentTarget === targetLevel) {
        return node.isFullNode();
      } else {
        for (let i = 0; i < node.countData(); i++) {
          if (!fn(node.getChild(i), currentTarget + 1)) {
            return false;
          }
        }
        return fn(node.getChild(node.countData()), currentTarget + 1);
      }
    };
    return fn(this.root, 0);
  }

  // Cuenta la cantidad de nodos del nivel (n)
  countNodesInLevel(targetLevel: number) {
    const fn = (node: MWayTreeNode<T> | null, currentTarget: number): number => {
      if (node === null) {
        return 0;
      } else if (currentTarget === targetLevel) {
        return 1;
      } else {
        let result = 0;
        for (let i = 0; i < node.countData(); i++) {
          result += fn(node.getChild(i), currentTarget + 1);
        }
        result += fn(node.getChild(node.countData()), currentTarget + 1);
        return result;
      }
    };
    return fn(this.root, 0);
  }
}
