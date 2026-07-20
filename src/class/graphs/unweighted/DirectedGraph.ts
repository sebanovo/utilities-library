import Graph from './Graph';
/**
 * Clase que implementa un grafo dirigido.
 */
export default class DirectedGraph extends Graph {
  public constructor();
  public constructor(nroVertice: number);
  public constructor(nroVertice?: number) {
    if (!nroVertice) {
      super();
      return;
    }
    super(nroVertice);
  }

  public override insertarArista(posVerticeOrigen: number, posVerticeDestino: number) {
    super.validarVertice(posVerticeOrigen);
    super.validarVertice(posVerticeDestino);
    if (super.existeAdyacencia(posVerticeOrigen, posVerticeDestino)) {
      throw new Error('Arista Ya Existe Exception');
    }
    const adyacenciaDelOrigen = this.listaDeAdyacencias[posVerticeOrigen];
    adyacenciaDelOrigen.push(posVerticeDestino);
    adyacenciaDelOrigen.sort((a, b) => a - b);
  }

  public override cantidadDeAristas() {
    let c = 0;
    for (let adyacencias of this.listaDeAdyacencias) {
      c += adyacencias.length;
    }
    return c;
  }

  /**
   * No existe grado de un vertice en un grafo dirigido
   * @param _
   */
  public override gradoDeVertice(_: number): number {
    throw new Error('No existe grado de un vertice en un grafo dirigido');
  }

  /**
   * Este metodo devuelve el grado que (sale) de un vertice
   */
  public gradoDeSalida(posDeVertice: number) {
    // llama al metodo de grado de vertice del grafo no dirigido
    return super.gradoDeVertice(posDeVertice);
  }

  /**
   * Este metodo devuelve el grado que (entra) de un vertice
   */
  public gradoDeEntrada(posDeVertice: number) {
    super.validarVertice(posDeVertice);
    let contador = 0;
    for (let adyacenciaActual of this.listaDeAdyacencias) {
      if (adyacenciaActual.includes(posDeVertice)) {
        contador++;
      }
    }
    return contador;
  }

  /**
   * Este metodo se reescribio por que un digrafo solo borra en un sentido
   */
  public eliminarArista(posVerticeOrigen: number, posVerticeDestino: number) {
    super.validarVertice(posVerticeOrigen);
    super.validarVertice(posVerticeDestino);
    if (!super.existeAdyacencia(posVerticeOrigen, posVerticeDestino)) {
      throw new Error('Arista no existe');
    }
    const adyacentesDelOrigen = this.listaDeAdyacencias[posVerticeOrigen];
    const indiceOrigen = adyacentesDelOrigen.indexOf(posVerticeDestino);
    adyacentesDelOrigen.splice(indiceOrigen, 1);
  }
}
