/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
    // for (let marcado of this.marcados) {
    //   if (!marcado) {
    //     return false;
    //   }
    // }
    // return true;
    return !this.marcados.includes(false);
  }

  public estaMarcado(posDeVertice: number) {
    return this.marcados[posDeVertice];
  }
}
