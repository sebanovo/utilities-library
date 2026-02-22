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
  // minimo número de hijos (punteros) que tiene un nodo a la mitad
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

  private buscarPosicionDondeBajar(key: number, nodo: BTreeNode<T>) {
    if (nodo === null) return -1;
    for (let i = 0; i < nodo.countData(); i++) {
      const dataActual = nodo.getData(i);
      if (key < dataActual!.key) {
        return i;
      }
    }
    return nodo.countData();
  }

  private splitNode(node: BTreeNode<T>, stack: Stack<BTreeNode<T>>): void {
    // paso 1: copiar el nodo en un nodo izquierdo
    const nodeLeft = this.copiarNodo(node, 0, this.MINIMUM_NUMBER_OF_KEYS);
    let leftChild = node.getChild(this.MINIMUM_NUMBER_OF_KEYS);
    if (leftChild !== null) {
      nodeLeft.setChild(nodeLeft.countData(), leftChild);
    }
    // paso 2: copiar el nodo en un nodo derecho
    const nodeRight = this.copiarNodo(node, this.MINIMUM_NUMBER_OF_KEYS + 1, node.countData());
    const rightChild = node.getChild(node.countData());
    if (rightChild !== null) {
      nodeRight.setChild(nodeRight.countData(), rightChild);
    }

    const data = node.getData(this.MINIMUM_NUMBER_OF_KEYS);
    // caso especial: el nodo era la raiz, osea pila vacia
    if (stack.isEmpty()) {
      const newRoot = new BTreeNode<T>(this.degree + 1);
      newRoot.setData(0, data);
      newRoot.setChild(0, nodeLeft);
      newRoot.setChild(1, nodeRight);
      this.root = newRoot;
      return;
    }

    // mover dato al nodo padre
    const parentNode = stack.pop()!;
    parentNode.setData(parentNode.countData(), data).sort(); // setea al final y ordena

    // proceso1
    const dataAntesDeLaClaveSubir = nodeLeft.getData(0);
    const claveDelNodoAntesDeLaClaveSubir = dataAntesDeLaClaveSubir!.key;
    /*
     * una vez que sacamos la clave del nodoAntesDeLaClaveASubir
     * vemos por donde bajar del nodoAncestro
     */
    let posicionParaInsertarElNodo = this.buscarPosicionDondeBajar(
      claveDelNodoAntesDeLaClaveSubir,
      parentNode!
    );
    /*
     * actualizamos el hijo que era donde habia roto la regla
     * del nro de claves
     */
    parentNode?.setChild(posicionParaInsertarElNodo, nodeLeft);

    // proceso 2
    /* hacemos lo mismo pero con el otro nodo nodoDespuesDeLaClaveASubir */
    const dataDespuesDeLaClaveSubir = nodeRight.getData(0);
    const claveDelNodoDespuesDeLaClaveSubir = dataDespuesDeLaClaveSubir!.key;
    /*
     * una vez que sacamos la clave del nodoAntesDeLaClaveASubir
     * vemos por donde bajar del nodoAncestro
     */
    posicionParaInsertarElNodo = this.buscarPosicionDondeBajar(
      claveDelNodoDespuesDeLaClaveSubir,
      parentNode!
    );
    /* preguntamos si existe un nodo en esa posicion */
    const hijo = parentNode?.getChild(posicionParaInsertarElNodo);
    if (hijo !== null) {
      /*
       * llamamos aun metodo privado que recorra todos
       * los hijos desde una posicion y inserte el nodoDespuesDeLaClaveASubir
       */
      this.insertarHijoOrdenado(parentNode!, posicionParaInsertarElNodo, nodeRight);
    } else {
      parentNode?.setChild(posicionParaInsertarElNodo, nodeRight);
    }
    /*
     * verificamos si el nodoAncestro esta rompiendo la regla de nro maximo de
     * claves
     */
    if (parentNode!.countData() > this.MAXIMUM_NUMBER_OF_KEYS) {
      this.splitNode(parentNode!, stack);
    }
  }

  /*
   * este metodo privado inserta(los mueve de posicion)los hijos para
   * insertar u nuevo hijo en una posicion especifica
   */
  private insertarHijoOrdenado(
    nodoActual: BTreeNode<T>,
    posicionAInsertar: number,
    nodoAInsertar: BTreeNode<T>
  ) {
    /*
     * hacemos un for desde el nro de claves no vacias del nodoActual hasta que
     * deje de ser mayor a la posicionAInsertar
     */
    for (let i = nodoActual.countData(); i > posicionAInsertar; i--) {
      const hijoDelNodoActual = nodoActual.getChild(i - 1);
      if (hijoDelNodoActual !== null) {
        const dataHijoDelNodoActual = hijoDelNodoActual.getData(hijoDelNodoActual.countData() - 1);
        let posicionAInsertar = this.buscarPosicionDondeBajar(
          dataHijoDelNodoActual!.key,
          nodoActual
        );
        nodoActual.setChild(posicionAInsertar, hijoDelNodoActual);
      }
    }
    /*
     * una vez terminado el for podemos insertar el nodo en la posicion especifica
     */
    nodoActual.setChild(posicionAInsertar, nodoAInsertar);
  }

  /**
   * Copia un nodo en otro nodo
   * @param node  nodo a ser copiado en otro nodo
   * @param posicionInicial posicion Inicial del nodo a copiar
   * @param posicionFinal  posicion Final del nodo a copiar
   * @returns {BTreeNode<T>} nodo nuevo a retornar
   */
  private copiarNodo(
    node: BTreeNode<T>,
    posicionInicial: number,
    posicionFinal: number
  ): BTreeNode<T> {
    const nodeCopied = new BTreeNode<T>(this.degree + 1);
    for (let i = posicionInicial; i < posicionFinal; i++) {
      nodeCopied.setData(nodeCopied.countData(), node.getData(i));
      const children = node.getChild(i);
      if (children !== null) {
        nodeCopied.setChild(nodeCopied.countChildren(), children);
      }
    }
    return nodeCopied;
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
      // ✔ Caso 1: clave ya existe (actualizar)
      if (node !== null) {
        for (let i = 0; i < node.countData(); i++) {
          if (node.getData(i)?.key === data.key) {
            node.setData(i, data);
            break;
          }
        }
        break;
      }

      // ✔ Caso 2: hoja (insertar)
      if (nodoActual.isLeaf()) {
        nodoActual.setData(nodoActual.countData(), data).sort();
        if (nodoActual.countData() > this.MAXIMUM_NUMBER_OF_KEYS) {
          this.splitNode(nodoActual, stack);
        }
        break;
      }

      // ✔ Caso 3: seguir buscando
      let posicionDondeBajar = this.buscarPosicionDondeBajar(data!.key, nodoActual);
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
