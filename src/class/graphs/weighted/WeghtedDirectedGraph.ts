import WeightedGraph from './WeightedGraph';
import AdyacenteConPeso from './AdyacenteConPeso';

export default class DiGrafoPesado extends WeightedGraph {
  constructor(nroVertices?: number) {
    super(nroVertices);
  }

  /**
   * Inserta una arista dirigida.
   */
  public override insertarArista(origen: number, destino: number, peso: number): void {
    this.validarVertice(origen);
    this.validarVertice(destino);

    if (this.existeAdyacencia(origen, destino)) {
      throw new Error('La arista ya existe');
    }

    this.listaDeAdyacencia[origen].push(new AdyacenteConPeso(destino, peso));

    this.listaDeAdyacencia[origen].sort((a, b) => a.compareTo(b));
  }

  /**
   * Elimina únicamente la arista origen → destino.
   */
  public override eliminarArista(origen: number, destino: number): void {
    this.validarVertice(origen);
    this.validarVertice(destino);

    if (!this.existeAdyacencia(origen, destino)) {
      throw new Error('La arista no existe');
    }

    const lista = this.listaDeAdyacencia[origen];

    const indice = lista.findIndex((a) => a.getIndiceDeVertice() === destino);

    lista.splice(indice, 1);
  }

  /**
   * En un digrafo el grado se divide en entrada y salida.
   */
  public override gradoDeVertice(_: number): number {
    throw new Error('Use gradoDeEntrada() o gradoDeSalida().');
  }

  /**
   * Número de aristas que entran al vértice.
   */
  public gradoDeEntrada(vertice: number): number {
    this.validarVertice(vertice);

    let contador = 0;

    for (const lista of this.listaDeAdyacencia) {
      if (lista.some((a) => a.getIndiceDeVertice() === vertice)) {
        contador++;
      }
    }

    return contador;
  }

  /**
   * Número de aristas que salen del vértice.
   */
  public gradoDeSalida(vertice: number): number {
    return super.gradoDeVertice(vertice);
  }

  /**
   * Cantidad total de aristas.
   */
  public override cantidadDeAristas(): number {
    let contador = 0;

    for (const lista of this.listaDeAdyacencia) {
      contador += lista.length;
    }

    return contador;
  }
}
