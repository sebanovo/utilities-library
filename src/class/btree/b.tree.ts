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

  private calculateInsertionPosition(key: number, nodo: BTreeNode<T>) {
    if (nodo === null) return -1;
    for (let i = 0; i < nodo.countData(); i++) {
      const dataActual = nodo.getData(i);
      if (key < dataActual!.key) {
        return i;
      }
    }
    return nodo.countData();
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

  private separarNodo(node: BTreeNode<T>, stack: Stack<BTreeNode<T>>, key: number): void {
    // paso 1: dividir el nodo en nodo izquierdo y derecho
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
      // Subir la clave central al nodo padre
      const originalParent = stack.pop()!;
      const temporalParentNode = new BTreeNode<T>(this.degree + 1);
      // copiar nodo actual a temporalNode
      for (let i = 0; i < originalParent.countData(); i++) {
        temporalParentNode.setData(i, originalParent.getData(i));
        temporalParentNode.setChild(i, originalParent.getChild(i));
      }
      temporalParentNode.setChild(
        temporalParentNode.countData(),
        originalParent.getChild(originalParent.countData())
      );

      // Desplazar elementos hacia la derecha mientras sean mayores al nuevo dato
      let pos = temporalParentNode.countData();
      while (pos > 0 && temporalParentNode.getData(pos - 1)!.key > middleData!.key) {
        temporalParentNode.setData(pos, temporalParentNode.getData(pos - 1));
        pos--;
      }

      temporalParentNode.setData(pos, middleData);

      // Insertar hijo izquierdo
      const leftFirstKey = leftNode.getData(0)!.key;
      let leftInsertPos = this.calculateInsertionPosition(leftFirstKey, temporalParentNode);
      temporalParentNode.setChild(leftInsertPos, leftNode);

      // Insertar hijo derecho
      const rightFirstKey = rightNode.getData(0)!.key;
      let rightInsertPos = this.calculateInsertionPosition(rightFirstKey, temporalParentNode);

      const existingChild = temporalParentNode.getChild(rightInsertPos);
      if (existingChild !== null) {
        // inserta el hijo derecho desplazando los demás a la derecha
        for (let i = temporalParentNode.countData(); i >= rightInsertPos; i--) {
          const children = temporalParentNode.getChild(i);
          if (children !== null) {
            temporalParentNode.setChild(i + 1, children);
          }
        }
        temporalParentNode.setChild(rightInsertPos, rightNode);
      } else {
        temporalParentNode.setChild(rightInsertPos, rightNode);
      }

      if (temporalParentNode.countData() > this.MAXIMUM_NUMBER_OF_KEYS) {
        this.separarNodo(temporalParentNode, stack, key);
      } else {
        originalParent.clear();
        for (let i = 0; i < temporalParentNode.countData(); i++) {
          originalParent.setData(i, temporalParentNode.getData(i));
        }

        // Si NO es hoja -> copiar hijos
        if (!temporalParentNode.isLeaf()) {
          for (let i = 0; i <= temporalParentNode.countData(); i++) {
            originalParent.setChild(i, temporalParentNode.getChild(i));
          }
        }
      }
    }
  }

  override insert(data: Data<T>): this {
    if (this.root === null) {
      const newNodo = new BTreeNode<T>(this.degree);
      newNodo.setData(0, data);
      this.root = newNodo;
      return this;
    }
    const stack = new Stack<BTreeNode<T>>();
    let nodoActual = this.root;
    while (nodoActual !== null) {
      const node = this.getNode(nodoActual, data.key);
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
      if (nodoActual.isLeaf()) {
        // copiar nodo actual a temporalNode
        const temporalNode = new BTreeNode<T>(this.degree + 1);
        for (let i = 0; i < nodoActual.countData(); i++) {
          temporalNode.setData(i, nodoActual.getData(i));
          temporalNode.setChild(i, nodoActual.getChild(i));
        }
        temporalNode.setChild(
          temporalNode.countData(),
          nodoActual.getChild(nodoActual.countData())
        );

        // Desplazar elementos hacia la derecha mientras sean mayores al nuevo dato
        let pos = temporalNode.countData();
        while (pos > 0 && temporalNode.getData(pos - 1)!.key > data.key) {
          temporalNode.setData(pos, temporalNode.getData(pos - 1));
          pos--;
        }

        temporalNode.setData(pos, data);
        if (temporalNode.countData() > this.MAXIMUM_NUMBER_OF_KEYS) {
          this.separarNodo(temporalNode, stack, data.key);
        } else {
          // limpiamos nodoActual
          nodoActual.clear();
          for (let i = 0; i < temporalNode.countData(); i++) {
            nodoActual.setData(i, temporalNode.getData(i));
          }

          // Si NO es hoja -> copiar hijos
          if (!temporalNode.isLeaf()) {
            for (let i = 0; i <= temporalNode.countData(); i++) {
              nodoActual.setChild(i, temporalNode.getChild(i));
            }
          }
        }
        break;
      }

      // Caso 3: seguir buscando
      let posicionDondeBajar = this.calculateInsertionPosition(data!.key, nodoActual);
      stack.push(nodoActual);
      nodoActual = nodoActual.getChild(posicionDondeBajar)!;
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
                const temporalNode = new BTreeNode<T>(this.degree + 1);
                // copiar nodo actual a temporalNode
                for (let i = 0; i < node.countData(); i++) {
                  temporalNode.setData(i, node.getData(i));
                }

                // Desplazar elementos hacia la derecha mientras sean mayores al nuevo dato
                let pos = temporalNode.countData();
                while (pos > 0 && temporalNode.getData(pos - 1)!.key > data.key) {
                  temporalNode.setData(pos, temporalNode.getData(pos - 1));
                  pos--;
                }

                // Insertar el nuevo dato en la posición encontrada
                temporalNode.setData(pos, data);

                // splitear el nodo
                const [leftNode, rightNode] = this.splitNode(temporalNode);
              }
            } else {
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
          }
        } else {
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
