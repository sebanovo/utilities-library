import { Data } from '../binarysearchtree/binarysearch.node';
import Stack from '../stack';
import { DEFAULT_GRADE } from '../mwaytree/mway.node';
import MWayTree from '../mwaytree/mway.tree';
import BTreeNode from './b.node';

/**
 * Clase que representa un arbol B tree y proporciona métodos para manipularlo.
 * referencia de youtube:
 * - No soporta claves repetidas como el B+ Tree
 * - Es balanceado, pero el grado tiene que ser mayor que 2 para serlo
 * Ojo:
 * Esta implementación en realidad crear un nodo de (grado + 1) hijos y grado claves para
 * poder usar temporalmente esos comodines
 * https://youtu.be/Fu7kVWTcH5Y?si=p5X7EPcb_Jk2L3fC
 * https://youtu.be/Cqtc81Iee08?si=lYoiIM3cpyDBqtbY
 * Para el arbol B+:
 * https://youtu.be/kbbHTXvylqY?si=hKZ1JaYegIBtJ2Ej
 */
export default class BTree<T> extends MWayTree<T> {
  private MAXIMUM_NUMBER_OF_KEYS: number;
  private MINIMUM_NUMBER_OF_KEYS: number;
  /** minimo número de hijos (punteros) que tiene un nodo a la mitad  */
  private MINIMUM_NUMBER_OF_CHILDS: number;

  constructor(degree: number = DEFAULT_GRADE) {
    if (degree <= 2) {
      throw new Error('El grado debe ser mayor que 2');
    }
    super(degree);
    this.MAXIMUM_NUMBER_OF_KEYS = degree - 1;
    this.MINIMUM_NUMBER_OF_CHILDS = Math.ceil(degree / 2);
    this.MINIMUM_NUMBER_OF_KEYS = this.MINIMUM_NUMBER_OF_CHILDS - 1;
  }

  /**
   * Copia un rango de datos e hijos de un nodo.
   */
  private splitRange(
    node: BTreeNode<T>,
    startDataPosition: number,
    endDataPosition: number
  ): BTreeNode<T> {
    const nodeCopied = new BTreeNode<T>(this.degree);
    for (let i = startDataPosition; i < endDataPosition; i++) {
      nodeCopied.setData(nodeCopied.countData(), node.getData(i));
      const child = node.getChild(i);
      if (child !== null) {
        nodeCopied.setChild(nodeCopied.countChildren(), child);
      }
    }
    const extraChild = node.getChild(endDataPosition);
    if (extraChild !== null) {
      nodeCopied.setChild(nodeCopied.countChildren(), extraChild);
    }
    return nodeCopied;
  }

  /**
   * Divide un nodo en dos alrededor de la posición central.
   * Devuelve [leftNode, rightNode].
   */
  private splitNode(node: BTreeNode<T>): [BTreeNode<T>, BTreeNode<T>] {
    const leftNode = this.splitRange(node, 0, this.MINIMUM_NUMBER_OF_KEYS);
    const rightNode = this.splitRange(node, this.MINIMUM_NUMBER_OF_KEYS + 1, node.countData());
    return [leftNode, rightNode];
  }

  private separarNodo(node: BTreeNode<T>, stack: Stack<BTreeNode<T>>): void {
    // dividir el nodo en nodo izquierdo y derecho
    const [leftNode, rightNode] = this.splitNode(node);

    const middleData = node.getData(this.MINIMUM_NUMBER_OF_KEYS);
    // caso especial: el nodo era la raiz, osea pila vacia
    if (stack.isEmpty()) {
      const newRoot = new BTreeNode<T>(this.degree);
      newRoot.setData(0, middleData);
      newRoot.setChild(0, leftNode);
      newRoot.setChild(1, rightNode);
      this.root = newRoot;
      return;
    } else {
      // clonar los datos e hijos al nodo temporal
      const originalParent = stack.pop()!;
      const temporalParentNode = new BTreeNode<T>(this.degree + 1);
      this.clone(originalParent, temporalParentNode);

      // Desplazar elementos hacia la derecha mientras sean mayores al nuevo dato
      let pos = temporalParentNode.countData();
      while (pos > 0 && temporalParentNode.getData(pos - 1)!.key > middleData!.key) {
        temporalParentNode.setData(pos, temporalParentNode.getData(pos - 1));
        pos--;
      }

      temporalParentNode.setData(pos, middleData);

      // Insertar hijo izquierdo
      const leftFirstKey = leftNode.getData(0)!.key;
      let leftInsertPos = temporalParentNode.findGreaterKeyIndex(leftFirstKey);
      temporalParentNode.setChild(leftInsertPos, leftNode);

      // Insertar hijo derecho
      const rightFirstKey = rightNode.getData(0)!.key;
      let rightInsertPos = temporalParentNode.findGreaterKeyIndex(rightFirstKey);

      // Desplazar hijos a la derecha y luego insertar
      for (let i = temporalParentNode.countData() - 1; i >= rightInsertPos; i--) {
        const children = temporalParentNode.getChild(i);
        temporalParentNode.setChild(i + 1, children);
      }
      temporalParentNode.setChild(rightInsertPos, rightNode);

      if (temporalParentNode.countData() > this.MAXIMUM_NUMBER_OF_KEYS) {
        this.separarNodo(temporalParentNode, stack);
      } else {
        originalParent.clear();
        this.clone(temporalParentNode, originalParent);
      }
    }
  }

  /**
   * Clona un nodo con grado
   */
  private clone(originalNode: BTreeNode<T>, cloneNode: BTreeNode<T>): void {
    for (let i = 0; i < originalNode.countData(); i++) {
      cloneNode.setData(i, originalNode.getData(i));
      cloneNode.setChild(i, originalNode.getChild(i));
    }
    cloneNode.setChild(cloneNode.countData(), originalNode.getChild(originalNode.countData()));
  }

  override insert(data: Data<T>): this {
    if (this.root === null) {
      const newNodo = new BTreeNode<T>(this.degree);
      newNodo.setData(0, data);
      this.root = newNodo;
      return this;
    }
    const stack = new Stack<BTreeNode<T>>();
    let x = this.root;
    while (x !== null) {
      const node = this.getNode(x, data.key);
      // Caso 1: clave ya existe (actualizar)
      if (node !== null) {
        for (let i = 0; i < node.countData(); i++) {
          if (node.getData(i)?.key === data.key) {
            node.setData(i, data);
            break;
          }
        }
        break;
      }

      // Caso 2: hoja (insertar)
      if (x.isLeaf()) {
        const temporalNode = new BTreeNode<T>(this.degree + 1);
        this.clone(x, temporalNode);
        // Desplazar elementos hacia la derecha mientras sean mayores al nuevo dato
        let pos = temporalNode.countData();
        while (pos > 0 && temporalNode.getData(pos - 1)!.key > data.key) {
          temporalNode.setData(pos, temporalNode.getData(pos - 1));
          pos--;
        }
        temporalNode.setData(pos, data);
        if (temporalNode.countData() > this.MAXIMUM_NUMBER_OF_KEYS) {
          this.separarNodo(temporalNode, stack);
        } else {
          x.clear();
          this.clone(temporalNode, x);
        }
        break;
      }

      // Caso 3: seguir buscando
      let posicionDondeBajar = x.findGreaterKeyIndex(data!.key);
      stack.push(x);
      x = x.getChild(posicionDondeBajar)!;
    }
    return this;
  }

  // override insertR(data: Data<T>): this {
  //   this.insert(data);
  //   return this;
  // }

  override insertR(data: Data<T>): this {
    if (!data.key) throw new Error('La key no puede ser nulo');
    const fn = (node: BTreeNode<T> | null): BTreeNode<T> => {
      if (node === null) {
        const newNode = new BTreeNode<T>(this.degree);
        newNode.setData(0, data);
        return newNode;
      } else {
        for (let i = 0; i < node.countData(); i++) {
          if (data.key === node.getData(i)?.key) {
            node.getData(i)!.value = data.value;
            return node;
          } else if (data.key < node.getData(i)!.key) {
            if (node.isLeaf()) {
              if (node.hasDataSpaceForInsert()) {
                for (let j = node.countData(); j > i; j--) {
                  node.setData(j, node.getData(j - 1));
                }
                node.setData(i, data);
              } else {
                // caso dividir el nodo
                // clonar el nodo dividir el nodo
                const temporalNode = new BTreeNode<T>(this.degree + 1);
                this.clone(node, temporalNode);

                // Desplazar elementos hacia la derecha mientras sean mayores al nuevo dato
                let pos = temporalNode.countData();
                while (pos > 0 && temporalNode.getData(pos - 1)!.key > data.key) {
                  temporalNode.setData(pos, temporalNode.getData(pos - 1));
                  pos--;
                }

                // Insertar el nuevo dato en la posición encontrada
                temporalNode.setData(pos, data);
                if (temporalNode.countData() > this.MAXIMUM_NUMBER_OF_KEYS) {
                  this.separarNodo(temporalNode, stack);
                } else {
                  node.clear();
                  this.clone(temporalNode, node);
                }
              }
            } else {
              stack.push(node);
              node.setChild(i, fn(node.getChild(i)));
              return node;
            }
            return node;
          }
        }
        if (node.isLeaf()) {
          if (node.hasDataSpaceForInsert()) {
            node.setData(node.countData(), data);
          } else {
            // caso dividir el nodo
            // clonar el nodo dividir el nodo
            const temporalNode = new BTreeNode<T>(this.degree + 1);
            this.clone(node, temporalNode);

            // Desplazar elementos hacia la derecha mientras sean mayores al nuevo dato
            let pos = temporalNode.countData();
            while (pos > 0 && temporalNode.getData(pos - 1)!.key > data.key) {
              temporalNode.setData(pos, temporalNode.getData(pos - 1));
              pos--;
            }

            // Insertar el nuevo dato en la posición encontrada
            temporalNode.setData(pos, data);
            if (temporalNode.countData() > this.MAXIMUM_NUMBER_OF_KEYS) {
              this.separarNodo(temporalNode, stack);
            } else {
              node.clear();
              this.clone(temporalNode, node);
            }
          }
        } else {
          stack.push(node);
          node.setChild(node.countData(), fn(node.getChild(node.countData())));
        }
      }
      return node;
    };
    const stack = new Stack<BTreeNode<T>>();
    this.root = fn(this.root);

    return this;
  }
}
