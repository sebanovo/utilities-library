import { Data } from '../binarysearchtree/binarysearch.node';
import Stack from '../stack';
import MWayTreeNode, { DEFAULT_GRADE } from './mway.node';
import MWayTree from './mway.tree';

/**
 * Clase que representa un arbol B tree y proporciona métodos para manipularlo.
 * referencia de youtube:
 * - No soporta claves repetidas como el B+ Tree
 * - Es balanceado
 * https://youtu.be/Fu7kVWTcH5Y?si=p5X7EPcb_Jk2L3fC
 * https://youtu.be/Cqtc81Iee08?si=lYoiIM3cpyDBqtbY
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

  private buscarPosicionClave(key: number, nodo: MWayTreeNode<T> | null): number {
    if (nodo === null) return -1;
    if (nodo.isLeaf()) {
      // aqui dice que es undefined
      // buscar en la hoja
      for (let i = 0; i < nodo.countData(); i++) {
        let dataActual = nodo.getData(i);
        if (dataActual?.key === key) {
          return i;
        }
      }
      return -1;
    }
    for (let i = 0; i < nodo.countData(); i++) {
      let dataActual = nodo.getData(i);
      if (dataActual?.key === key) {
        return i;
      }
      if (key < dataActual!.key) {
        return this.buscarPosicionClave(key, nodo.getChild(i));
      }
    }
    // verificamos si en la ultimo hijo tiene la claveABuscar o no y retornamos
    return this.buscarPosicionClave(key, nodo.getChild(nodo.countData()));
  }

  // // busca el nodo
  // private buscarNodo(key: number, nodo: MWayTreeNode<T> | null): MWayTreeNode<T> | null {
  //   if (nodo === null) return null;
  //   if (nodo.isLeaf()) {
  //     for (let i = 0; i < nodo.countData(); i++) {
  //       const dataActual = nodo.getData(i);
  //       if (dataActual?.key === key) {
  //         return nodo;
  //       }
  //     }
  //     return null;
  //   }
  //   for (let i = 0; i < nodo.countData(); i++) {
  //     const dataActual = nodo.getData(i);
  //     if (dataActual?.key === key) {
  //       return nodo;
  //     }
  //   }
  //   let posicionParaBajar = this.buscarPosicionDondeBajar(key, nodo);
  //   return this.buscarNodo(key, nodo.getChild(posicionParaBajar));
  // }

  private buscarPosicionDondeBajar(key: number, nodo: MWayTreeNode<T>) {
    if (nodo === null) return -1;
    for (let i = 0; i < nodo?.countData(); i++) {
      const dataActual = nodo.getData(i);
      if (dataActual && key < dataActual!.key) {
        return i;
      }
    }
    return nodo.countData();
  }

  private insertarClaveYValorOrdenado(nodoActual: MWayTreeNode<T>, data: Data<T>) {
    nodoActual.setData(nodoActual.countData(), data);
    for (let i = 0; i < nodoActual.countData() - 1; i++) {
      for (let j = 0; j < nodoActual.countData() - 1; j++) {
        let dataActual = nodoActual.getData(j);
        let dataSiguiente = nodoActual.getData(j + 1);
        if (dataActual!.key > dataSiguiente!.key) {
          nodoActual.setData(j, dataSiguiente);
          nodoActual.setData(j + 1, dataActual);
        }
      }
    }
  }

  private dividirElNodo(nodo: MWayTreeNode<T>, stack: Stack<MWayTreeNode<T>>): void {
    const data = nodo.getData(this.MINIMUM_NUMBER_OF_KEYS);
    // proceso 1
    const nodoAntesDeLaClaveASubir = this.crearNuevoNodo(0, nodo, this.MINIMUM_NUMBER_OF_KEYS);
    let hijoDelNodoActual = nodo.getChild(this.MINIMUM_NUMBER_OF_KEYS);
    if (hijoDelNodoActual !== null) {
      nodoAntesDeLaClaveASubir.setChild(nodoAntesDeLaClaveASubir.countData(), hijoDelNodoActual);
    }
    // proceso 2
    const nodoDespuesDeLaClaveASubir = this.crearNuevoNodo(
      this.MINIMUM_NUMBER_OF_KEYS + 1,
      nodo,
      nodo.countData()
    );
    hijoDelNodoActual = nodo.getChild(nodo.countData());
    if (hijoDelNodoActual !== null) {
      nodoDespuesDeLaClaveASubir.setChild(
        nodoDespuesDeLaClaveASubir.countData(),
        hijoDelNodoActual
      );
    }

    /*
     * revisamos la pila de ancestros si estuviera vacia asumimos que la raiz
     * era la que esta rompiendo la regla y creamos una nueva raiz
     */
    if (stack.isEmpty()) {
      const newRoot = new MWayTreeNode<T>(this.degree);
      newRoot.setData(0, data);
      newRoot.setChild(0, nodoAntesDeLaClaveASubir);
      newRoot.setChild(1, nodoDespuesDeLaClaveASubir);
      this.root = newRoot;
      return;
    }
    /*
     * sacamos el nodo de la pila de ancestros y ponemos los nuevos nodos
     * nodoAntesDeLaClave y nodoDespuesDeLaClave
     */
    const nodoAncestro = stack.pop();
    this.insertarClaveYValorOrdenado(nodoAncestro!, data!);
    // proceso1
    const dataAntesDeLaClaveSubir = nodoAntesDeLaClaveASubir.getData(0);
    const claveDelNodoAntesDeLaClaveSubir = dataAntesDeLaClaveSubir!.key;
    /*
     * una vez que sacamos la clave del nodoAntesDeLaClaveASubir
     * vemos por donde bajar del nodoAncestro
     */
    let posicionParaInsertarElNodo = this.buscarPosicionDondeBajar(
      claveDelNodoAntesDeLaClaveSubir,
      nodoAncestro!
    );
    /*
     * actualizamos el hijo que era donde habia roto la regla
     * del nro de claves
     */
    nodoAncestro?.setChild(posicionParaInsertarElNodo, nodoAntesDeLaClaveASubir);

    // proceso 2
    /* hacemos lo mismo pero con el otro nodo nodoDespuesDeLaClaveASubir */
    const dataDespuesDeLaClaveSubir = nodoDespuesDeLaClaveASubir.getData(0);
    const claveDelNodoDespuesDeLaClaveSubir = dataDespuesDeLaClaveSubir!.key;
    /*
     * una vez que sacamos la clave del nodoAntesDeLaClaveASubir
     * vemos por donde bajar del nodoAncestro
     */
    posicionParaInsertarElNodo = this.buscarPosicionDondeBajar(
      claveDelNodoDespuesDeLaClaveSubir,
      nodoAncestro!
    );
    /* preguntamos si existe un nodo en esa posicion */
    const hijo = nodoAncestro?.getChild(posicionParaInsertarElNodo);
    if (hijo !== null) {
      /*
       * llamamos aun metodo privado que recorra todos
       * los hijos desde una posicion y inserte el nodoDespuesDeLaClaveASubir
       */
      this.insertarHijoOrdenado(
        nodoAncestro!,
        posicionParaInsertarElNodo,
        nodoDespuesDeLaClaveASubir
      );
    } else {
      nodoAncestro?.setChild(posicionParaInsertarElNodo, nodoDespuesDeLaClaveASubir);
    }
    /*
     * verificamos si el nodoAncestro esta rompiendo la regla de nro maximo de
     * claves
     */
    if (nodoAncestro!.countData() > this.MAXIMUM_NUMBER_OF_KEYS) {
      this.dividirElNodo(nodoAncestro!, stack);
    }
  }

  /*
   * este metodo privado inserta(los mueve de posicion)los hijos para
   * insertar u nuevo hijo en una posicion especifica
   */
  private insertarHijoOrdenado(
    nodoActual: MWayTreeNode<T>,
    posicionAInsertar: number,
    nodoAInsertar: MWayTreeNode<T>
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

  private crearNuevoNodo(posicionInicial: number, nodo: MWayTreeNode<T>, posicionFinal: number) {
    const nodoARetornar = new MWayTreeNode<T>(this.degree);
    for (let i = posicionInicial; i < posicionFinal; i++) {
      const data = nodo.getData(i);
      this.insertarClaveYValorOrdenado(nodoARetornar, data!);
      const hijoDelNodoActual = nodo.getChild(i);
      if (hijoDelNodoActual !== null) {
        const dataHijo = hijoDelNodoActual.getData(0);
        const posicionParaInsertarHijo = this.buscarPosicionDondeBajar(
          dataHijo!.key,
          nodoARetornar
        );
        nodoARetornar.setChild(posicionParaInsertarHijo, hijoDelNodoActual);
      }
    }
    return nodoARetornar;
  }

  override insert(data: Data<T>): this {
    if (this.root === null) {
      const newNodo = new MWayTreeNode<T>(this.degree);
      newNodo.setData(0, data);
      this.root = newNodo;
      return this;
    }
    const stack = new Stack<MWayTreeNode<T>>();
    let nodoActual = this.root;
    do {
      let posicionDeLaClaveAInsertar = this.buscarPosicionClave(data.key, nodoActual);
      // si ya existe remplaza el valor solamente
      if (posicionDeLaClaveAInsertar !== -1) {
        nodoActual = super.getNodeR(nodoActual, data.key)!;
        nodoActual.setData(posicionDeLaClaveAInsertar, data);
        nodoActual = null!;
      } else if (nodoActual.isLeaf()) {
        this.insertarClaveYValorOrdenado(nodoActual, data);
        if (nodoActual.countData() > this.MAXIMUM_NUMBER_OF_KEYS) {
          this.dividirElNodo(nodoActual, stack);
        }
        nodoActual = null!;
      } else {
        // el nodoActual no es una hoja y ya sabemos que la clave no existe
        // buscamos la posicion por donde bajar
        let posicionPorDondeBajar = this.buscarPosicionDondeBajar(data!.key, nodoActual);
        stack.push(nodoActual);
        nodoActual = nodoActual.getChild(posicionPorDondeBajar)!;
      }
    } while (nodoActual !== null);
    return this;
  }
  override insertR(data: Data<T>): this {
    this.insert(data);
    return this;
  }
}
