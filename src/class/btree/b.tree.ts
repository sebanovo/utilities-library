import { Data } from '../binarysearchtree/binarysearch.node';
import Stack from '../stack';
import { DEFAULT_GRADE } from '../mwaytree/mway.node';
import MWayTree from '../mwaytree/mway.tree';
import BTreeNode from './b.node';

/**
 * Clase que representa un arbol B tree y proporciona métodos para manipularlo.
 * referencia de youtube:
 * - No soporta claves repetidas como el B+ Tree
 * - Es balanceado
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
    if (degree < 3) {
      throw new Error(
        'El grado no puede ser menor a 3 porque pierde la propiedad de ser balanceado'
      );
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
   * Copia un nodo en otro nodo
   * @param node  nodo a ser copiado en otro nodo
   * @param startDataPosition posicion Inicial del nodo a copiar
   * @param endDataPosition  posicion Final del nodo a copiar
   * @returns {BTreeNode<T>} nodo nuevo a retornar
   */
  private copiarNodo(
    node: BTreeNode<T>,
    startDataPosition: number,
    endDataPosition: number
  ): BTreeNode<T> {
    const nodeCopied = new BTreeNode<T>(this.degree + 1);
    for (let i = startDataPosition; i < endDataPosition; i++) {
      nodeCopied.setData(nodeCopied.countData(), node.getData(i));
      const children = node.getChild(i);
      if (children !== null) {
        nodeCopied.setChild(nodeCopied.countChildren(), children);
      }
    }
    let children = node.getChild(endDataPosition);
    if (children !== null) {
      nodeCopied.setChild(nodeCopied.countData(), children);
    }
    return nodeCopied;
  }

  private splitNode(node: BTreeNode<T>, stack: Stack<BTreeNode<T>>): void {
    // paso 1: dividir el nodo en nodo izquierdo y derecho
    const nodeLeft = this.copiarNodo(node, 0, this.MINIMUM_NUMBER_OF_KEYS);
    const nodeRight = this.copiarNodo(node, this.MINIMUM_NUMBER_OF_KEYS + 1, node.countData());

    const middleData = node.getData(this.MINIMUM_NUMBER_OF_KEYS);
    // caso especial: el nodo era la raiz, osea pila vacia
    if (stack.isEmpty()) {
      const newRoot = new BTreeNode<T>(this.degree + 1);
      newRoot.setData(0, middleData);
      newRoot.setChild(0, nodeLeft);
      newRoot.setChild(1, nodeRight);
      this.root = newRoot;
      return;
    } else {
      // Subir la clave central al nodo padre
      const parent = stack.pop()!;
      parent.setData(parent.countData(), middleData).sort(); // agrega la clave y ordena

      // Insertar hijo izquierdo
      const leftFirstKey = nodeLeft.getData(0)!.key;
      let leftInsertPos = this.calculateInsertionPosition(leftFirstKey, parent);
      parent.setChild(leftInsertPos, nodeLeft);

      // Insertar hijo derecho
      const rightFirstKey = nodeRight.getData(0)!.key;
      let rightInsertPos = this.calculateInsertionPosition(rightFirstKey, parent);

      const existingChild = parent.getChild(rightInsertPos);
      if (existingChild !== null) {
        this.insertarHijoEnOrden(parent, rightInsertPos, nodeRight);
      } else {
        parent.setChild(rightInsertPos, nodeRight);
      }

      // Verificar si el padre se desbordó
      if (parent.countData() > this.MAXIMUM_NUMBER_OF_KEYS) {
        this.splitNode(parent, stack);
      }
    }
  }

  /**
   * Inserta un nuevo hijo en una posición específica,
   * desplazando los hijos existentes hacia la derecha.
   */
  private insertarHijoEnOrden(
    parentNode: BTreeNode<T>,
    positionToInsert: number,
    childrenToInsert: BTreeNode<T>
  ): void {
    for (let i = parentNode.countData(); i >= positionToInsert; i--) {
      const children = parentNode.getChild(i);
      if (children !== null) {
        parentNode.setChild(i + 1, children);
      }
    }
    parentNode.setChild(positionToInsert, childrenToInsert);
  }

  override insert(data: Data<T>): this {
    if (this.root === null) {
      const newNodo = new BTreeNode<T>(this.degree + 1);
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
        nodoActual.setData(nodoActual.countData(), data).sort();
        if (nodoActual.countData() > this.MAXIMUM_NUMBER_OF_KEYS) {
          this.splitNode(nodoActual, stack);
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

  override insertR(data: Data<T>): this {
    this.insert(data);
    return this;
  }
}
