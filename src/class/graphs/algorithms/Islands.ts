// import DirectedGraph from '../unweighted/DirectedGraph';
import Graph from '../unweighted/Graph';
import WeightedGraph from '../weighted/WeightedGraph';
import DFS from './travels/DFS';

/**
 * Implementa contar las islas de un grafo y grafo dirigido
 */
export default class Islands {
  private graph: Graph | WeightedGraph;

  public constructor(graph: Graph | WeightedGraph) {
    this.graph = graph;
  }
  /**
   * Cuenta la cantidad de componentes conexas.
   *
   * Complejidad: O(V + E)
   */
  public cantidadComponentes(): number {
    if (this.graph.cantidadVertices() === 0) {
      return 0;
    }

    const dfs = new DFS(this.graph, 0);

    let cantidad = 1;

    while (!dfs.llegoATodos()) {
      const siguiente = this.obtenerVerticeNoVisitado(dfs);
      dfs.ejecutarDFS(siguiente);
      cantidad++;
    }

    return cantidad;
  }

  /**
   * Devuelve cada componente como una lista de vértices.
   *
   * Ejemplo:
   * [
   *   [0,1,2],
   *   [3,4],
   *   [5]
   * ]
   */
  public obtenerComponentes(): number[][] {
    const componentes: number[][] = [];

    const visitados = new Array(this.graph.cantidadVertices()).fill(false);

    for (let i = 0; i < this.graph.cantidadVertices(); i++) {
      if (visitados[i]) {
        continue;
      }

      const dfs = new DFS(this.graph, i);

      const componente = dfs.getRecorrido();

      for (const v of componente) {
        visitados[v] = true;
      }

      componentes.push(componente);
    }

    return componentes;
  }

  /**
   * Primer vértice que aún no fue visitado.
   */
  private obtenerVerticeNoVisitado(dfs: DFS): number {
    for (let i = 0; i < this.graph.cantidadVertices(); i++) {
      if (!dfs.llegoAVertice(i)) {
        return i;
      }
    }

    throw new Error('No existen vértices sin visitar');
  }
}
