/**
 * Clase que implementa un grafo no dirigido.
 */
export default class Graph {
  protected listaDeAdyacencias: number[][] = [];

  public getListaDeAdyacencia(): number[][] {
    return structuredClone(this.listaDeAdyacencias);
  }

  public constructor();
  public constructor(nroVertices: number);

  public constructor(nroVertices?: number) {
    this.listaDeAdyacencias = [];
    if (!nroVertices) {
      return;
    }
    if (nroVertices < 0) {
      throw new Error('La cantidad de vertices no puede ser negativo');
    }
    for (let i = 0; i < nroVertices; i++) {
      this.insertarVertice();
    }
  }

  public insertarVertice() {
    const adayacenciaDelNuevoVertice: number[] = [];
    this.listaDeAdyacencias.push(adayacenciaDelNuevoVertice);
  }

  public validarVertice(posVertice: number) {
    if (posVertice < 0 || posVertice >= this.listaDeAdyacencias.length) {
      throw new Error('Posicion de vertice invalido');
    }
  }

  public existeAdyacencia(posVerticeOrigen: number, posVerticeDestino: number) {
    this.validarVertice(posVerticeOrigen);
    this.validarVertice(posVerticeDestino);
    const adyacentesDelOrigen: number[] = this.listaDeAdyacencias[posVerticeOrigen];
    return adyacentesDelOrigen.includes(posVerticeDestino);
  }

  public insertarArista(posVerticeOrigen: number, posVerticeDestino: number) {
    if (this.existeAdyacencia(posVerticeOrigen, posVerticeDestino)) {
      throw new Error('Arista Ya Existe Exception');
    }
    const adyacentesDelOrigen = this.listaDeAdyacencias[posVerticeOrigen];
    adyacentesDelOrigen.push(posVerticeDestino);
    adyacentesDelOrigen.sort((a, b) => a - b);
    if (posVerticeOrigen !== posVerticeDestino) {
      const adyacentesDelDestino = this.listaDeAdyacencias[posVerticeDestino];
      adyacentesDelDestino.push(posVerticeOrigen);
      adyacentesDelDestino.sort((a, b) => a - b);
    }
  }

  public cantidadVertices() {
    return this.listaDeAdyacencias.length;
  }

  public cantidadDeAristas() {
    let contadorDeArista = 0;
    let contadorDeLazo = 0;
    for (
      let posVerticeActual = 0;
      posVerticeActual < this.listaDeAdyacencias.length;
      posVerticeActual++
    ) {
      const adyacentesDelVertice = this.listaDeAdyacencias[posVerticeActual];
      for (let posAdyacente of adyacentesDelVertice) {
        if (posAdyacente === posVerticeActual) {
          contadorDeLazo++;
        } else {
          contadorDeArista++;
        }
      }
    }
    return Math.floor(contadorDeArista / 2) + contadorDeLazo;
  }
  /**
   * El grado de un vertice en un grafo no dirigido es la cantidad de aristas que tienen
   * @param posVertice
   * @returns
   */
  public gradoDeVertice(posVertice: number) {
    this.validarVertice(posVertice);
    const adyacenteDelVertice = this.listaDeAdyacencias[posVertice];
    return adyacenteDelVertice.length;
  }

  public eliminarVertice(posVertice: number) {
    this.validarVertice(posVertice);
    // eliminar vertice
    this.listaDeAdyacencias.splice(posVertice, 1);
    // eliminar aristas conectadas al vertice eliminado
    for (let adyacentesDeUnVertice of this.listaDeAdyacencias) {
      let posDeLaAdyacencia = adyacentesDeUnVertice.indexOf(posVertice);
      if (posDeLaAdyacencia >= 0) {
        adyacentesDeUnVertice.splice(posDeLaAdyacencia, 1);
      }
    }
    // descontar -1 a todos los adyacentes que sean mayores al posVetice
    for (let adyacentes of this.listaDeAdyacencias) {
      for (let j = 0; j < adyacentes.length; j++) {
        if (adyacentes[j] > posVertice) {
          adyacentes[j]--;
        }
      }
    }
  }

  public eliminarArista(posVerticeOrigen: number, posVerticeDestino: number) {
    this.validarVertice(posVerticeOrigen);
    this.validarVertice(posVerticeDestino);
    if (!this.existeAdyacencia(posVerticeOrigen, posVerticeDestino)) {
      throw new Error('Arista no existe');
    }

    const adyacentesDelOrigen = this.listaDeAdyacencias[posVerticeOrigen];
    const indiceOrigen = adyacentesDelOrigen.indexOf(posVerticeDestino);
    adyacentesDelOrigen.splice(indiceOrigen, 1);

    if (posVerticeOrigen !== posVerticeDestino) {
      const adyacentesDelDestino = this.listaDeAdyacencias[posVerticeDestino];
      const indiceDestino = adyacentesDelDestino.indexOf(posVerticeOrigen);
      adyacentesDelDestino.splice(indiceDestino, 1);
    }
  }

  public adyacentesDelVertice(posDeVertice: number) {
    this.validarVertice(posDeVertice);
    const adyacenteDelVertice = this.listaDeAdyacencias[posDeVertice];
    const copiaDeAdyacencia: number[] = [];
    for (let adyacente of adyacenteDelVertice) {
      copiaDeAdyacencia.push(adyacente);
    }
    return copiaDeAdyacencia;
  }
}
// const graph = new Graph(5);
// const l = graph.getListaDeAdyacencia();
// l[0] = [1, 2];
// l[1] = [0, 3];
// l[2] = [1, 4];
// l[3] = [3];
// console.log(graph.cantidadDeAristas());
// console.log(graph.cantidadVertices());
// // graph.listaDeAdyacencia = [[1, 2], [0, 3], [0], [1, 4], [3]];
