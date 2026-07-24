interface Comparable<T> {
  compareTo(other: T): number;
}

/**
 * Clase que implementa la arista destion como (indiceDeVerticeDestino, peso)
 */
export default class WeightedNeighbor implements Comparable<WeightedNeighbor> {
  private vertexIndex: number; // indiceDeVertice (destino)
  private weight: number; // peso

  public constructor();
  public constructor(indiceDeVertice: number);
  public constructor(indiceDeVertice: number, peso: number);

  constructor(indiceDeVertice: number = 0, peso: number = 0) {
    this.vertexIndex = indiceDeVertice;
    this.weight = peso;
  }

  public getIndiceDeVertice() {
    return this.vertexIndex;
  }

  public setIndiceDeVertice(indiceDeVertice: number) {
    this.vertexIndex = indiceDeVertice;
  }

  public getPeso() {
    return this.weight;
  }

  public setPeso(peso: number) {
    this.weight = peso;
  }

  /**
   * Compara por el índice del vértice.
   * Retorna:
   * < 0 si this < otro
   * = 0 si son iguales
   * > 0 si this > otro
   */
  public compareTo(otro: WeightedNeighbor | null) {
    if (otro === null) {
      return -1;
    }
    return this.vertexIndex - otro.getIndiceDeVertice();
  }

  public equals(otro: WeightedNeighbor | null) {
    if (otro === null) {
      return false;
    }
    return this.compareTo(otro) === 0;
  }
}
