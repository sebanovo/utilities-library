export interface IGraph {
  insertarVertice(): void;

  cantidadVertices(): number;

  validarVertice(v: number): void;

  existeAdyacencia(origen: number, destino: number): boolean;

  vecinosDe(vertice: number): number[];
}
