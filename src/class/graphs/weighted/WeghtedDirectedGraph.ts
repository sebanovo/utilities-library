import AbstractGraph from '../types/AbstractGraph';
import WeightedNeighbor from '../types/WeightedNeighbor';
import WeightedGraph from './WeightedGraph';

export default class WeightedDirectedGraph extends AbstractGraph<WeightedNeighbor> {
  constructor(nroVertices = 0) {
    super(nroVertices);
  }

  protected getIndice(adyacente: WeightedNeighbor): number {
    return adyacente.getIndiceDeVertice();
  }

  protected copiar(adyacente: WeightedNeighbor): WeightedNeighbor {
    return new WeightedNeighbor(adyacente.getIndiceDeVertice(), adyacente.getPeso());
  }

  protected actualizarIndices(lista: WeightedNeighbor[], verticeEliminado: number): void {
    for (const adyacente of lista) {
      if (adyacente.getIndiceDeVertice() > verticeEliminado) {
        adyacente.setIndiceDeVertice(adyacente.getIndiceDeVertice() - 1);
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
  }

  public eliminarArista(origen: number, destino: number): void {
    this.validarVertice(origen);
    this.validarVertice(destino);

    const lista = this.listaDeAdyacencias[origen];

    const indice = lista.findIndex((a) => a.getIndiceDeVertice() === destino);

    if (indice === -1) {
      throw new Error('La arista no existe');
    }

    lista.splice(indice, 1);
  }

  public cantidadDeAristas(): number {
    let cantidad = 0;

    for (const lista of this.listaDeAdyacencias) {
      cantidad += lista.length;
    }

    return cantidad;
  }

  public gradoDeSalida(vertice: number): number {
    this.validarVertice(vertice);

    return this.listaDeAdyacencias[vertice].length;
  }

  public gradoDeEntrada(vertice: number): number {
    this.validarVertice(vertice);

    let contador = 0;

    for (const lista of this.listaDeAdyacencias) {
      if (lista.some((a) => a.getIndiceDeVertice() === vertice)) {
        contador++;
      }
    }

    return contador;
  }

  public peso(origen: number, destino: number): number {
    const adyacente = this.listaDeAdyacencias[origen].find(
      (a) => a.getIndiceDeVertice() === destino
    );

    if (!adyacente) {
      throw new Error('La arista no existe');
    }

    return adyacente.getPeso();
  }

  public toUndirected(): WeightedGraph {
    const graph = new WeightedGraph(this.cantidadVertices());

    for (let origen = 0; origen < this.cantidadVertices(); origen++) {
      for (const vecino of this.adyacentesDelVertice(origen)) {
        const destino = vecino.getIndiceDeVertice();

        if (!graph.existeAdyacencia(origen, destino)) {
          graph.insertarArista(origen, destino, vecino.getPeso());
        }
      }
    }

    return graph;
  }
}
