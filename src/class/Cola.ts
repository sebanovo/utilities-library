class Nodo {
  dato: number;
  sig: Nodo | null;
  constructor (dato: number = 0) {
    this.dato = dato;
    this.sig = null;
  }
}

export default class Cola {
  top: Nodo | null = null;
  encolar (dato: number): void {
    const nodo = new Nodo(dato);
    if (!this.top) {
      this.top = nodo;
      return;
    }
    let x = this.top;
    let ant: Nodo | null = null;
    while (x !== null) {
      ant = x;
      x = x.sig!;
    }
    ant!.sig = nodo;
  }

  desencolar (): number | undefined {
    if (!this.top) return;
    const dato = this.top.dato;
    this.top = this.top.sig;
    return dato;
  }

  length (): number {
    let c = 0;
    let x = this.top;
    while (x !== null) {
      c++;
      x = x.sig;
    }
    return c;
  }

  descargar (): string {
    let s = '';
    let x = this.top;
    while (x !== null) {
      s += x.dato;
      if (x.sig !== null) {
        s += '->';
      }
      x = x.sig;
    }

    return s;
  }

  estaVacia (): boolean {
    return this.length() === 0;
  }
}
