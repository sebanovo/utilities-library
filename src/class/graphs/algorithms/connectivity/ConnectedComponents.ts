import Graph from '../../unweighted/Graph';
import WeightedGraph from '../../weighted/WeightedGraph';
import DFS from '../travels/DFS';

/**
 * Implementa el algoritmo para saber si un (grafo o grafo pesado) (no dirigido) es (conexo o no-conexo)
 * [Un Grafo puede ser]:
 * 1. Conexo (solo hay 1 isla)
 * 2. No Conexo (hay mas de 1 isla)
 */
export default class ConnectedComponents {
  private graph: Graph | WeightedGraph;

  public constructor(graph: Graph | WeightedGraph) {
    this.graph = graph;
  }

  public esConexo() {
    const recorrido = new DFS(this.graph, 0);
    return recorrido.llegoATodos();
  }
}
