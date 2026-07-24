export class ControlMarcado {
  private marcados: boolean[] = [];

  public constructor(nroVertices: number) {
    this.marcados = [];
    this.marcados = new Array(nroVertices).fill(false);
  }

  public marcarVertice(posDeVertice: number) {
    this.marcados[posDeVertice] = true;
  }

  public desmarcarVertice(posVertice: number) {
    this.marcados[posVertice] = false;
  }

  public desmarcarTodos() {
    this.marcados = this.marcados.fill(false);
  }

  public estanTodosMarcados() {
    return !this.marcados.includes(false);
  }

  public estaMarcado(posDeVertice: number) {
    return this.marcados[posDeVertice];
  }
}
