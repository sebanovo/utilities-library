import { IGraph } from './IGraph';

export default abstract class AbstractGraph<T> implements IGraph {
  protected listaDeAdyacencias: T[][] = [];

  constructor(nroVertices = 0) {
    if (nroVertices < 0) {
      throw new Error('Cantidad de vértices inválida');
    }

    for (let i = 0; i < nroVertices; i++) {
      this.insertarVertice();
    }
  }

  public insertarVertice(): void {
    this.listaDeAdyacencias.push([]);
  }

  public cantidadVertices(): number {
    return this.listaDeAdyacencias.length;
  }

  public validarVertice(v: number): void {
    if (v < 0 || v >= this.cantidadVertices()) {
      throw new Error('Vértice inválido');
    }
  }

  public existeAdyacencia(origen: number, destino: number): boolean {
    this.validarVertice(origen);
    this.validarVertice(destino);

    return this.listaDeAdyacencias[origen].some((a) => this.getIndice(a) === destino);
  }

  public adyacentesDelVertice(v: number): T[] {
    this.validarVertice(v);

    return this.listaDeAdyacencias[v].map((a) => this.copiar(a));
  }

  public eliminarVertice(v: number): void {
    this.validarVertice(v);

    this.listaDeAdyacencias.splice(v, 1);

    for (const lista of this.listaDeAdyacencias) {
      let indice = lista.findIndex((a) => this.getIndice(a) === v);

      if (indice >= 0) {
        lista.splice(indice, 1);
      }

      this.actualizarIndices(lista, v);
    }
  }

  /**
   *  0 -> [1,2,4]
   */
  public vecinosDe(vertice: number): number[] {
    this.validarVertice(vertice);

    return this.listaDeAdyacencias[vertice].map((v) => this.getIndice(v));
  }

  protected abstract actualizarIndices(lista: T[], eliminado: number): void;

  protected abstract getIndice(adyacente: T): number;

  protected abstract copiar(adyacente: T): T;
}
