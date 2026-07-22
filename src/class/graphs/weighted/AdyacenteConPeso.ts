interface Comparable<T> {
  compareTo(other: T): number;
}

/**
 * Clase que implementa
 */
export default class AdyacenteConPeso implements Comparable<AdyacenteConPeso> {
  private indiceDeVertice: number;
  private peso: number;

  public constructor();
  public constructor(indiceDeVertice: number);
  public constructor(indiceDeVertice: number, peso: number);

  constructor(indiceDeVertice: number = 0, peso: number = 0) {
    this.indiceDeVertice = indiceDeVertice;
    this.peso = peso;
  }

  public getIndiceDeVertice() {
    return this.indiceDeVertice;
  }

  public setIndiceDeVertice(indiceDeVertice: number) {
    this.indiceDeVertice = indiceDeVertice;
  }

  public getPeso() {
    return this.peso;
  }

  public setPeso(peso: number) {
    this.peso = peso;
  }

  /**
   * Compara por el índice del vértice.
   * Retorna:
   * < 0 si this < otro
   * = 0 si son iguales
   * > 0 si this > otro
   */
  public compareTo(otro: AdyacenteConPeso | null) {
    if (otro === null) {
      return -1;
    }
    return this.indiceDeVertice - otro.getIndiceDeVertice();
  }

  public equals(otro: AdyacenteConPeso | null) {
    if (otro === null) {
      return false;
    }
    return this.compareTo(otro) === 0;
  }
}
