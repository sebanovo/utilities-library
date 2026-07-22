import DFS from './DFS';
import { IGraph } from './IGraph';

/**
 * Clase que implementa el algoritmos Conexo para un grafo.
 * [Un Grafo puede ser]:
 * 1. Conexo
 * 2. No Conexo
 *
 * [Un DiGrafo puede ser]:
 * 1. Conexo
 *  1.1. esFuertementeConexo
 *  1.2. DebilmenteConexo
 * 2. No Conexo
 */
export default class Conexo {
  private elGrafo: IGraph;

  public constructor(unGrafo: IGraph) {
    this.elGrafo = unGrafo;
  }

  public esConexo() {
    const recorrido = new DFS(this.elGrafo, 0);
    return recorrido.llegoATodos();
  }

  /**
   * Un grafo dirigido es fuertemente conexo si existe un camino dirigido desde cualquier vértice a cualquier otro vértice en el grafo. En términos simples, esto significa que para cada par de nodos \(u\) y \(v\), puedes llegar de \(u\) a \(v\) y también regresar de \(v\) a \(u\) siguiendo las flechas
   */
  public esFuertementeConexo() {
    for (let i = 0; i < this.elGrafo.cantidadVertices(); i++) {
      const recorrido = new DFS(this.elGrafo, i);
      if (!recorrido.llegoATodos()) {
        return false;
      }
    }
    return true;
  }
}
