import AbstractGraph from '../types/AbstractGraph';
import WeightedNeighbor from '../types/WeightedNeighbor';

export default class WeightedGraph extends AbstractGraph<WeightedNeighbor> {
  protected getIndice(a: WeightedNeighbor): number {
    return a.getIndiceDeVertice();
  }

  protected copiar(a: WeightedNeighbor): WeightedNeighbor {
    return new WeightedNeighbor(a.getIndiceDeVertice(), a.getPeso());
  }

  protected actualizarIndices(lista: WeightedNeighbor[], eliminado: number): void {
    for (const a of lista) {
      if (a.getIndiceDeVertice() > eliminado) {
        a.setIndiceDeVertice(a.getIndiceDeVertice() - 1);
      }
    }
  }

  public insertarArista(origen: number, destino: number, peso: number): void {
    this.validarVertice(origen);
    this.validarVertice(destino);

    if (this.existeAdyacencia(origen, destino)) {
      throw new Error('La arista ya existe');
    }

    this.listaDeAdyacencias[origen].push(new WeightedNeighbor(destino, peso));

    this.listaDeAdyacencias[origen].sort((a, b) => a.compareTo(b));

    if (origen !== destino) {
      this.listaDeAdyacencias[destino].push(new WeightedNeighbor(origen, peso));

      this.listaDeAdyacencias[destino].sort((a, b) => a.compareTo(b));
    }
  }

  public eliminarArista(origen: number, destino: number): void {
    this.validarVertice(origen);
    this.validarVertice(destino);

    const listaOrigen = this.listaDeAdyacencias[origen];

    const indiceOrigen = listaOrigen.findIndex((a) => a.getIndiceDeVertice() === destino);

    if (indiceOrigen === -1) {
      throw new Error('La arista no existe');
    }

    listaOrigen.splice(indiceOrigen, 1);

    if (origen !== destino) {
      const listaDestino = this.listaDeAdyacencias[destino];

      const indiceDestino = listaDestino.findIndex((a) => a.getIndiceDeVertice() === origen);

      listaDestino.splice(indiceDestino, 1);
    }
  }

  public cantidadDeAristas(): number {
    let aristas = 0;
    let lazos = 0;

    for (let i = 0; i < this.listaDeAdyacencias.length; i++) {
      for (const vecino of this.listaDeAdyacencias[i]) {
        if (vecino.getIndiceDeVertice() === i) {
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

  public peso(origen: number, destino: number): number {
    const vecino = this.listaDeAdyacencias[origen].find((a) => a.getIndiceDeVertice() === destino);

    if (!vecino) {
      throw new Error('La arista no existe');
    }

    return vecino.getPeso();
  }
}
