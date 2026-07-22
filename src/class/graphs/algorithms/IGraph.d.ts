export interface IGraph {
  validarVertice(posDeVertice: number): void; //validamos si el vertice esta en rango
  adyacentesDelVertice(posVerticeActual: number): number[];
  cantidadVertices(): number;
}
