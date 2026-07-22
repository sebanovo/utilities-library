import Stack from '../../stack';
import { ControlMarcado } from './ControlMarcado';
import { IGraph } from './IGraph';

/**
 * Clase que implementa el algoritmos BFS para un grafo.
 */
export default class DFS {
  private elGrafo: IGraph;
  private recorrido: number[];
  private marcados: ControlMarcado;

  public constructor(unGrafo: IGraph, posVerticeInicial: number) {
    this.elGrafo = unGrafo;
    this.recorrido = [];
    this.marcados = new ControlMarcado(this.elGrafo.cantidadVertices());
    this.ejecutarDFS(posVerticeInicial);
  }

  public ejecutarDFS(posDeVerticeActual: number) {
    this.elGrafo.validarVertice(posDeVerticeActual); //validamos si el vertice esta en rango
    this.marcados.marcarVertice(posDeVerticeActual); // lo marcamos en la lista de marcados
    this.recorrido.push(posDeVerticeActual); //lo anotamos en la lista de visitados
    const adyacenteDeVerticeActual = this.elGrafo.adyacentesDelVertice(posDeVerticeActual); // sacamos un iterable con los adyacentes del vertice
    for (let posDeAdyacente of adyacenteDeVerticeActual) {
      //for each de los adyacentes
      //verifica si el adyacente no esta marcado
      if (!this.marcados.estaMarcado(posDeAdyacente)) {
        //haceso recursion a partir de ese adyacente
        this.ejecutarDFS(posDeAdyacente);
      }
    } //fin del for each
  }

  public ejecutarDFS2(posDeVertice: number) {
    this.elGrafo.validarVertice(posDeVertice); //validamos si el vertice esta en rango
    const stackDeVertices = new Stack<number>();
    stackDeVertices.push(posDeVertice);
    this.marcados.marcarVertice(posDeVertice);

    do {
      const posVerticeActual = stackDeVertices.pop() as number; //saca el vertice de la cola
      //obtiene un iterable con todos los adyacentes del vertice
      const adyacenteDeVerticeActual = this.elGrafo.adyacentesDelVertice(posVerticeActual);
      this.recorrido.push(posVerticeActual); //lo anota en la lista
      //hace un for each con los adyacentes del vertice
      for (let i = adyacenteDeVerticeActual.length - 1; i >= 0; i--) {
        // orden inverso
        let posDeAdyacente = adyacenteDeVerticeActual[i];
        // verifica si el adyacente no esta marcado
        if (!this.marcados.estaMarcado(posDeAdyacente)) {
          // lo mete en la cola  y lo marca
          stackDeVertices.push(posDeAdyacente);
          this.marcados.marcarVertice(posDeAdyacente);
        }
      } //fin del for each
    } while (!stackDeVertices.isEmpty()); //hace este ciclo hasta que la cola este vacia
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
    this.elGrafo.validarVertice(posVertice);
    return this.marcados.estaMarcado(posVertice);
  }
}
