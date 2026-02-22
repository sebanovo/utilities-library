import type { Data } from '../binarysearchtree/binarysearch.node';
// EL GRADO ES EL NUMERO MAXIMO DE HIJOS QUE TIENE CADA NODO
export const DEFAULT_GRADE = 2;

/**
 * Clase que representa el nodo de un arbol m-way.
 */
export default class MWayTreeNode<T> {
  private listData: Array<Data<T> | null>;
  private listChilds: Array<MWayTreeNode<T> | null>;
  private readonly degree: number;

  constructor(degree: number = DEFAULT_GRADE) {
    this.degree = degree;
    if (this.degree < 2) {
      throw new Error('El grado debe ser mayor o igual 2');
    }

    this.listData = new Array(this.degree - 1).fill(null);
    this.listChilds = new Array(degree).fill(null);
  }

  getGrade() {
    return this.degree;
  }

  getData(position: number) {
    return this.listData[position];
  }

  setData(position: number, newData: Data<T> | null) {
    this.listData[position] = newData;
    return this;
  }

  getChild(position: number) {
    return this.listChilds[position];
  }

  setChild(positon: number, newNodo: MWayTreeNode<T> | null) {
    this.listChilds[positon] = newNodo;
    return this;
  }

  isLeaf() {
    for (let i = 0; i < this.listChilds.length; i++) {
      if (this.listChilds[i] !== null) {
        return false;
      }
    }
    return true;
  }

  // tiene todos sus hijos
  isFullNode() {
    return this.countChildren() === this.listChilds.length;
  }

  // Cuenta la cantidad de datos
  countData() {
    let c = 0;
    for (let i = 0; i < this.listData.length; i++) {
      if (this.listData[i] !== null) {
        c++;
      }
    }
    return c;
  }

  // Cuenta la cantidad de hijos
  countChildren() {
    let c = 0;
    for (let i = 0; i < this.listChilds.length; i++) {
      if (this.listChilds[i] !== null) {
        c++;
      }
    }
    return c;
  }

  // cuenta los hijos nulos
  countEmptyData() {
    return this.listData.length - this.countData();
  }

  // cuenta los hijos nulos
  countEmptyChildren() {
    return this.listChilds.length - this.countChildren();
  }

  // verifica si es hijo vacio
  isEmptyChild(position: number): boolean {
    return this.listChilds[position] === null;
  }

  getDataArray() {
    return this.listData;
  }

  setDataArray(arrayData: (Data<T> | null)[]) {
    this.listData = arrayData;
  }

  getChildrenArray() {
    return this.listChilds;
  }

  setChildrenArray(arrayChildren: Array<MWayTreeNode<T> | null>) {
    this.listChilds = arrayChildren;
  }

  /**
   * Ordena el nodo de forma ascendente o descendente
   */
  sort(direccion: 'asc' | 'desc' = 'asc') {
    for (let i = 0; i < this.countData() - 1; i++) {
      for (let j = 0; j < this.countData() - 1; j++) {
        let data = this.getData(j);
        let dataNext = this.getData(j + 1);
        if (direccion === 'asc' ? data!.key > dataNext!.key : data!.key < dataNext!.key) {
          this.setData(j, dataNext);
          this.setData(j + 1, data);
        }
      }
    }
    return this;
  }
}
