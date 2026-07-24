import AbstractGraph from '../types/AbstractGraph';
import Graph from './Graph';

export default class DirectedGraph extends AbstractGraph<number> {
  constructor(nroVertices = 0) {
    super(nroVertices);
  }

  protected getIndice(adyacente: number): number {
    return adyacente;
  }

  protected copiar(adyacente: number): number {
    return adyacente;
  }

  protected actualizarIndices(lista: number[], verticeEliminado: number): void {
    for (let i = 0; i < lista.length; i++) {
      if (lista[i] > verticeEliminado) {
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
  }

  public eliminarArista(origen: number, destino: number): void {
    this.validarVertice(origen);
    this.validarVertice(destino);

    const indice = this.listaDeAdyacencias[origen].indexOf(destino);

    if (indice === -1) {
      throw new Error('La arista no existe');
    }

    this.listaDeAdyacencias[origen].splice(indice, 1);
  }

  public cantidadDeAristas(): number {
    let cantidad = 0;

    for (const adyacentes of this.listaDeAdyacencias) {
      cantidad += adyacentes.length;
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
      if (lista.includes(vertice)) {
        contador++;
      }
    }

    return contador;
  }
  public toUndirected(): Graph {
    const graph = new Graph(this.cantidadVertices());

    for (let origen = 0; origen < this.cantidadVertices(); origen++) {
      for (const destino of this.vecinosDe(origen)) {
        if (!graph.existeAdyacencia(origen, destino)) {
          graph.insertarArista(origen, destino);
        }
      }
    }

    return graph;
  }
}
