import DFS from '../travels/DFS';
import DirectedGraph from '../../unweighted/DirectedGraph';
import WeightedDirectedGraph from '../../weighted/WeghtedDirectedGraph';
import ConnectedComponents from './ConnectedComponents';

/**
 * Clase que implementa el algoritmos Conexo para un grafo.
 * [Un DiGrafo puede ser]:
 *  1. Fuertemente conexo:
 *    -  Si existe un camino dirigido desde el vértice \(u\) hasta el vértice \(v\), y también desde \(v\) hasta \(u\), para cualquier par de vértices.
 *    - Se debe cumplir para todos los vertices
 *  2. Debilmente conexo:
 *    - Si existe un camino entre cualesquiera dos vértices al ignorar la dirección de las aristas y tratarlas como si no fueran dirigidas.
 *  3. Grafo es no conexo:
 *    - No cumple que sea Fuertemente conexa ni Debilmente conexa.
 *    - Está dividido: El grafo está compuesto por dos o más partes aisladas llamadas componentes conexas.
 *    - Hay más de 1 isla.
 */
export default class StronglyConnectedComponents {
  private graph: DirectedGraph | WeightedDirectedGraph;

  public constructor(graph: DirectedGraph | WeightedDirectedGraph) {
    this.graph = graph;
  }

  public esFuertementeConexo() {
    for (let i = 0; i < this.graph.cantidadVertices(); i++) {
      const recorrido = new DFS(this.graph, i);
      if (!recorrido.llegoATodos()) {
        return false;
      }
    }
    return true;
  }

  public esDebilmenteConexo(): boolean {
    const graph = this.graph.toUndirected();
    const componentes = new ConnectedComponents(graph);
    return componentes.esConexo();
  }
}
