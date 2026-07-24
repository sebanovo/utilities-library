import Queue from '../../../queue';
import { ControlMarcado } from './ControlMarcado';
import { IGraph } from '../../types/IGraph';

/**
 * Clase que implementa el algoritmos BFS para un grafo.
 */
export default class BFS {
  private grafo: IGraph;
  private recorrido: number[];
  private marcados: ControlMarcado;

  public constructor(grafo: IGraph, posVerticeInicial: number) {
    this.grafo = grafo;
    this.recorrido = [];
    this.marcados = new ControlMarcado(this.grafo.cantidadVertices());
    this.ejecutarBFS(posVerticeInicial);
  }

  public ejecutarBFS(posDeVertice: number) {
    this.grafo.validarVertice(posDeVertice); // validamos si el vertice esta en rango
    const colaDeVertices = new Queue<number>();
    colaDeVertices.add(posDeVertice);
    this.marcados.marcarVertice(posDeVertice);

    do {
      const posVerticeActual = colaDeVertices.poll() as number; //saca el vertice de la cola
      //obtiene un iterable con todos los adyacentes del vertice
      const adyacenteDeVerticeActual = this.grafo.vecinosDe(posVerticeActual);
      this.recorrido.push(posVerticeActual); //lo anota en la lista
      //hace un for each con los adyacentes del vertice
      for (let posDeAdyacente of adyacenteDeVerticeActual) {
        // verifica si el adyacente no esta marcado
        if (!this.marcados.estaMarcado(posDeAdyacente)) {
          // lo mete en la cola  y lo marca
          colaDeVertices.add(posDeAdyacente);
          this.marcados.marcarVertice(posDeAdyacente);
        }
      } //fin del for each
    } while (!colaDeVertices.isEmpty()); //hace este ciclo hasta que la cola este vacia
  }

  // este metodo devuelve la lista de los vertices visitados en forma de iterable
  public getRecorrido() {
    return structuredClone(this.recorrido);
  }

  // este metodo devuelve un booleano si llego a todos los vertices del grafo
  public llegoATodos() {
    // revisamos en la lista de marcados y lo devuelve
    return this.marcados.estanTodosMarcados();
  }

  //este metodo revisa si un vertice fue visitado o no
  public llegoAVertice(posVertice: number) {
    //valida si el vertice esta en rango y luego revisa en la lista de marcados
    this.grafo.validarVertice(posVertice);
    return this.marcados.estaMarcado(posVertice);
  }
}
