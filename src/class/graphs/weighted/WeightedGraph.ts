import AdyacenteConPeso from './AdyacenteConPeso';

export default class GrafoPesado {
  protected listaDeAdyacencia: AdyacenteConPeso[][] = [];

  constructor(nroVertices?: number) {
    if (nroVertices === undefined) {
      return;
    }

    if (nroVertices < 0) {
      throw new Error('La cantidad de vértices no puede ser negativa');
    }

    for (let i = 0; i < nroVertices; i++) {
      this.insertarVertice();
    }
  }

  public insertarVertice(): void {
    this.listaDeAdyacencia.push([]);
  }

  public validarVertice(posVertice: number): void {
    if (posVertice < 0 || posVertice >= this.listaDeAdyacencia.length) {
      throw new Error('Posición de vértice inválida');
    }
  }

  public existeAdyacencia(origen: number, destino: number): boolean {
    this.validarVertice(origen);
    this.validarVertice(destino);

    return this.listaDeAdyacencia[origen].some((a) => a.getIndiceDeVertice() === destino);
  }

  public insertarArista(origen: number, destino: number, peso: number): void {
    if (this.existeAdyacencia(origen, destino)) {
      throw new Error('La arista ya existe');
    }

    this.listaDeAdyacencia[origen].push(new AdyacenteConPeso(destino, peso));

    this.listaDeAdyacencia[origen].sort((a, b) => a.compareTo(b));

    if (origen !== destino) {
      this.listaDeAdyacencia[destino].push(new AdyacenteConPeso(origen, peso));

      this.listaDeAdyacencia[destino].sort((a, b) => a.compareTo(b));
    }
  }

  public cantidadVertices(): number {
    return this.listaDeAdyacencia.length;
  }

  public cantidadDeAristas(): number {
    let aristas = 0;
    let lazos = 0;

    for (let i = 0; i < this.listaDeAdyacencia.length; i++) {
      for (const adyacente of this.listaDeAdyacencia[i]) {
        if (adyacente.getIndiceDeVertice() === i) {
          lazos++;
        } else {
          aristas++;
        }
      }
    }

    return aristas / 2 + lazos;
  }

  public gradoDeVertice(posVertice: number): number {
    this.validarVertice(posVertice);
    return this.listaDeAdyacencia[posVertice].length;
  }

  public eliminarArista(origen: number, destino: number): void {
    if (!this.existeAdyacencia(origen, destino)) {
      throw new Error('La arista no existe');
    }

    const listaOrigen = this.listaDeAdyacencia[origen];

    const indice = listaOrigen.findIndex((a) => a.getIndiceDeVertice() === destino);

    listaOrigen.splice(indice, 1);

    if (origen !== destino) {
      const listaDestino = this.listaDeAdyacencia[destino];

      const indice2 = listaDestino.findIndex((a) => a.getIndiceDeVertice() === origen);

      listaDestino.splice(indice2, 1);
    }
  }

  public eliminarVertice(posVertice: number): void {
    this.validarVertice(posVertice);

    this.listaDeAdyacencia.splice(posVertice, 1);

    for (const lista of this.listaDeAdyacencia) {
      const indice = lista.findIndex((a) => a.getIndiceDeVertice() === posVertice);

      if (indice >= 0) {
        lista.splice(indice, 1);
      }

      for (const adyacente of lista) {
        if (adyacente.getIndiceDeVertice() > posVertice) {
          adyacente.setIndiceDeVertice(adyacente.getIndiceDeVertice() - 1);
        }
      }
    }
  }

  public adyacentesDelVertice(posVertice: number): AdyacenteConPeso[] {
    this.validarVertice(posVertice);

    return structuredClone(this.listaDeAdyacencia[posVertice]);
  }

  public peso(origen: number, destino: number): number {
    const adyacente = this.listaDeAdyacencia[origen].find(
      (a) => a.getIndiceDeVertice() === destino
    );

    if (!adyacente) {
      throw new Error('No existe la arista');
    }

    return adyacente.getPeso();
  }
}
