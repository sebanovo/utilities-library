import AbstractGraph from '../types/AbstractGraph';

export default class Graph extends AbstractGraph<number> {
  protected getIndice(v: number): number {
    return v;
  }

  protected copiar(v: number): number {
    return v;
  }

  protected actualizarIndices(lista: number[], eliminado: number): void {
    for (let i = 0; i < lista.length; i++) {
      if (lista[i] > eliminado) {
        lista[i]--;
      }
    }
  }

  public insertarArista(origen: number, destino: number): void {
    this.validarVertice(origen);
    this.validarVertice(destino);

    if (this.existeAdyacencia(origen, destino)) {
      throw new Error('La arista ya existe');
    }

    this.listaDeAdyacencias[origen].push(destino);
    this.listaDeAdyacencias[origen].sort((a, b) => a - b);

    if (origen !== destino) {
      this.listaDeAdyacencias[destino].push(origen);
      this.listaDeAdyacencias[destino].sort((a, b) => a - b);
    }
  }

  public eliminarArista(origen: number, destino: number): void {
    this.validarVertice(origen);
    this.validarVertice(destino);

    const indiceOrigen = this.listaDeAdyacencias[origen].indexOf(destino);

    if (indiceOrigen === -1) {
      throw new Error('La arista no existe');
    }

    this.listaDeAdyacencias[origen].splice(indiceOrigen, 1);

    if (origen !== destino) {
      const indiceDestino = this.listaDeAdyacencias[destino].indexOf(origen);
      this.listaDeAdyacencias[destino].splice(indiceDestino, 1);
    }
  }

  public cantidadDeAristas(): number {
    let aristas = 0;
    let lazos = 0;

    for (let i = 0; i < this.listaDeAdyacencias.length; i++) {
      for (const vecino of this.listaDeAdyacencias[i]) {
        if (vecino === i) {
          lazos++;
        } else {
          aristas++;
        }
      }
    }

    return aristas / 2 + lazos;
  }

  public gradoDeVertice(vertice: number): number {
    this.validarVertice(vertice);
    return this.listaDeAdyacencias[vertice].length;
  }
}
