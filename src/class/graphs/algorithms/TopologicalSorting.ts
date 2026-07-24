import Queue from '../../queue';
import DirectedGraph from '../unweighted/DirectedGraph';
import WeightedDirectedGraph from '../weighted/WeghtedDirectedGraph';

/**
 * Clase que implementa el algoritmos OrdenamientoTopologico para un grafo dirigido (pesado y no pesado).
 * Solo tiene sentido para:
 * - DirectedGraph
 * - WeightedDirectedGraph
 * No existe para:
 * - Graph
 * - WeightedGraph
 * porque en un grafo no dirigido no hay una noción de precedencia.
 */
export default class TopologicalSorting {
  constructor(private graph: DirectedGraph | WeightedDirectedGraph) {}

  public ordenar(): number[] {
    const n = this.graph.cantidadVertices();

    const gradoEntrada = new Array<number>(n);

    for (let i = 0; i < n; i++) {
      gradoEntrada[i] = this.graph.gradoDeEntrada(i);
    }

    const cola = new Queue<number>();

    for (let i = 0; i < n; i++) {
      if (gradoEntrada[i] === 0) {
        cola.add(i);
      }
    }

    const orden: number[] = [];

    while (!cola.isEmpty()) {
      const v = cola.poll()!;

      orden.push(v);

      for (const vecino of this.graph.vecinosDe(v)) {
        gradoEntrada[vecino]--;

        if (gradoEntrada[vecino] === 0) {
          cola.add(vecino);
        }
      }
    }

    if (orden.length !== n) {
      throw new Error('El grafo contiene ciclos.');
    }

    return orden;
  }
}
