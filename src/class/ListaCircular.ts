import type { MethodsOfNumero } from '../types/types';
import Numero from './Numero';

export class NodoListaCircular {
  sig: NodoListaCircular | null;
  ant: NodoListaCircular | null;
  dato: number;
  constructor(dato: number) {
    this.dato = dato;
    this.sig = null;
    this.ant = null;
  }
}

/**
 * Clase que representa una lista circular de enlace doble y proporciona diversas operaciones y manipulaciones.
 */
export default class ListaCircular {
  #head: NodoListaCircular | null = null;
  insertarFinal(dato: number): void {
    if (this.#head === null) {
      this.#head = new NodoListaCircular(dato);
      this.#head.sig = this.#head;
      this.#head.ant = this.#head;
      return;
    } else if (this.#head.sig === this.#head && this.#head.ant === this.#head) {
      const nodo = new NodoListaCircular(dato);
      nodo.sig = this.#head;
      nodo.ant = this.#head;
      this.#head.sig = nodo;
      this.#head.ant = nodo;
      return;
    }
    const nodo = new NodoListaCircular(dato);
    const { ant } = this.#head;
    ant!.sig = nodo;
    nodo.ant = ant;
    nodo.sig = this.#head;
    this.#head.ant = nodo;
  }

  insertarInicio(dato: number): void {
    if (this.#head === null) {
      this.#head = new NodoListaCircular(dato);
      this.#head.sig = this.#head;
      this.#head.ant = this.#head;
      return;
    } else if (this.#head.sig === this.#head && this.#head.ant === this.#head) {
      const nodo = new NodoListaCircular(dato);
      nodo.sig = this.#head;
      nodo.ant = this.#head;
      this.#head.sig = nodo;
      this.#head.ant = nodo;
      return;
    }

    const x = new NodoListaCircular(dato);
    x.sig = this.#head;
    x.ant = this.#head.ant;
    this.#head.ant!.sig = x;
    this.#head.ant = x;
    this.#head = x;
  }

  descargar1(): string {
    if (this.#head === null) return '';
    else if (this.#head.sig === this.#head && this.#head.ant === this.#head) {
      const s1 = String(this.#head.dato);
      const s2 = String(this.#head.dato);
      return `${s1}\r\n${s2}`;
    }
    let s1 = '';
    let x = this.#head.sig;
    let ant1 = null;
    while (x !== this.#head) {
      ant1 = x;
      s1 += ant1?.dato;
      if (ant1?.sig !== this.#head) {
        s1 += '->';
      }
      x = x!.sig;
    }

    s1 = `${String(this.#head.dato)}->${s1}`;

    let s2 = '';

    let y = this.#head.sig;
    let ant2 = null;
    while (y !== this.#head) {
      ant2 = y;
      s2 += ant2?.dato;
      if (ant2?.sig !== this.#head) {
        s2 += '<-';
      }
      y = y!.sig!;
    }

    s2 = `${String(this.#head.dato)}<-${s2}`;

    return `${s1}\r\n${s2}`;
  }

  descargar2(): string {
    if (this.#head === null) return '';
    else if (this.#head.sig === this.#head && this.#head.ant === this.#head) {
      const s1 = String(this.#head.dato);
      const s2 = String(this.#head.dato);
      return `${s1}\r\n${s2}`;
    }
    let s1 = '';
    let x = this.#head.ant;
    let ant1 = null;
    while (x !== this.#head) {
      ant1 = x;
      s1 += ant1?.dato;
      if (ant1?.ant !== this.#head) {
        s1 += '->';
      }
      x = x!.ant;
    }
    s1 += `->${String(this.#head.dato)}`;

    let s2 = '';

    let y = this.#head.ant;
    let ant2 = null;
    while (y !== this.#head) {
      ant2 = y;
      s2 += ant2?.dato;
      if (ant2?.ant !== this.#head) {
        s2 += '<-';
      }
      y = y!.ant!;
    }

    s2 += `<-${String(this.#head.dato)}`;

    return `${s1}\r\n${s2}`;
  }

  eliminarFinal(): void {
    if (this.#head === null) return;
    if (this.#head.sig === this.#head) {
      this.#head.sig = null;
      this.#head.ant = null;
      this.#head = null;
      return;
    }
    let final = this.#head.ant;
    const antFinal = this.#head.ant!.ant;
    final!.sig = null;
    final!.ant = null;
    final = null;
    antFinal!.sig = this.#head;
    this.#head.ant = antFinal;
  }

  eliminarInicio(): void {
    if (this.#head === null) return;
    if (this.#head.sig === this.#head) {
      this.#head.sig = null;
      this.#head.ant = null;
      this.#head = null;
      return;
    }
    const { sig } = this.#head;
    const { ant } = this.#head;
    ant!.sig = sig;
    sig!.ant = ant;
    this.#head.sig = null;
    this.#head.ant = null;
    this.#head = sig;
  }

  obtenerInicio(): NodoListaCircular | null {
    return this.#head;
  }

  obtenerFinal(): NodoListaCircular | null {
    return this.#head?.ant ?? null;
  }

  length(): number {
    if (!this.#head) return 0;
    if (this.#head.sig === this.#head) return 1;
    let c = 0;
    let x = this.#head.sig;
    while (x !== this.#head) {
      c++;
      x = x!.sig;
    }
    return ++c;
  }

  /**
   * Metodo que carga la serie Fibonacci
   * @param {number} n - Número de elementos a cargar.
   * @returns {void}
   */
  cargarFibonacci(n: number): void {
    if (n <= 0) return;
    this.insertarFinal(0);
    if (n === 1) return;
    this.insertarFinal(1);

    let prev1 = this.#head;
    let prev2 = this.#head!.sig;
    for (let i = 2; i < n; i++) {
      const dato = prev1!.dato + prev2!.dato;
      this.insertarFinal(dato);
      prev1 = prev2!;
      prev2 = prev2!.sig;
    }
  }

  /**
   * Metodo que carga serie Aritmetica
   * @param {number} numeroDeElementos - Número de elementos a cargar.
   * @param {number} valorInicial - Primer término de la serie.
   * @param {number} razon - Razón de la serie.
   * @returns {void}
   */
  cargarSerieAritmetica(numeroDeElementos: number, valorInicial: number, razon: number): void {
    if (numeroDeElementos <= 0) return;

    for (let i = 0; i < numeroDeElementos; i++) {
      this.insertarFinal(valorInicial + i * razon);
    }
  }

  /**
   * Metodo que carga serie Geometrica
   * @param {number} numeroDeElementos - Número de elementos a cargar.
   * @param {number} valorInicial - Primer término de la serie.
   * @param {number} razon - Razón de la serie.
   * @returns {void}
   */
  cargarSerieGeometrica(numeroDeElementos: number, valorInicial: number, razon: number): void {
    if (numeroDeElementos <= 0) return;

    let n = 1;
    for (let i = 0; i < numeroDeElementos; i++, n++) {
      this.insertarFinal(valorInicial * Math.round(razon ** (n - 1)));
    }
  }

  /**
   * Ordena la lista
   */
  ordenar(): void {
    if (!this.#head) return;
    let x = this.#head;
    let y: NodoListaCircular | null = null;

    while (x !== this.#head.ant) {
      y = x.sig;
      while (y !== this.#head) {
        if (x.dato > y!.dato) {
          [x.dato, y!.dato] = [y!.dato, x.dato];
        }
        y = y!.sig;
      }
      x = x.sig!;
    }
  }

  /**
   * Segmenta la lista
   * @param {MethodsOfNumero} method  Metodo de la clase Número
   */
  segmentar(method: MethodsOfNumero): void {
    if (!this.#head) return;
    const n1 = new Numero();
    const n2 = new Numero();

    let x = this.#head;
    let y: NodoListaCircular | null = null;

    while (x !== this.#head.ant) {
      y = x.sig;
      while (y !== this.#head) {
        n1.cargar(y!.dato);
        n2.cargar(x.dato);
        if (
          (n1[method]() && !n2[method]()) ||
          (n1[method]() && n2[method]() && y!.dato < x.dato) ||
          (!n1[method]() && !n2[method]() && y!.dato < x.dato)
        ) {
          [x.dato, y!.dato] = [y!.dato, x.dato];
        }
        y = y!.sig;
      }
      x = x.sig!;
    }
  }

  /**
   * Intercala la lista
   * @param {MethodsOfNumero} method  Metodo de la clase Número
   */
  intercalar(method: MethodsOfNumero): void {
    if (!this.#head) return;
    const n1 = new Numero();
    const n2 = new Numero();

    let bool = true;

    let x = this.#head;
    let y: NodoListaCircular | null = null;

    while (x !== this.#head.ant) {
      y = x.sig;
      if (bool) {
        while (y !== this.#head) {
          n1.cargar(y!.dato);
          n2.cargar(x.dato);
          if (
            (n1[method]() && !n2[method]()) ||
            (n1[method]() && n2[method]() && y!.dato < x.dato) ||
            (!n1[method]() && !n2[method]() && y!.dato < x.dato)
          ) {
            [x.dato, y!.dato] = [y!.dato, x.dato];
          }
          y = y!.sig;
        }
      } else {
        while (y !== this.#head) {
          n1.cargar(y!.dato);
          n2.cargar(x.dato);
          if (
            (!n1[method]() && n2[method]()) ||
            (!n1[method]() && !n2[method]() && y!.dato < x.dato) ||
            (n1[method]() && n2[method]() && y!.dato < x.dato)
          ) {
            [x.dato, y!.dato] = [y!.dato, x.dato];
          }
          y = y!.sig;
        }
      }
      bool = !bool;
      x = x.sig!;
    }
  }

  /**
   * @param dato el dato a buscar
   * @returns {boolean}
   */
  busquedaSecuencial(dato: number): boolean {
    if (!this.#head) return false;
    let x = this.#head;
    do {
      if (x.dato === dato) return true;
      x = x.sig!;
    } while (x !== this.#head);
    return false;
  }

  /**
   * Invierte la lista enlazada circular
   */
  invertir(): void {
    if (!this.#head || (this.#head.sig === this.#head && this.#head.ant === this.#head)) return;

    let x = this.#head;
    let ant: NodoListaCircular | null = null;

    do {
      ant = x.ant;
      x.ant = x.sig;
      x.sig = ant;
      x = x.ant!;
    } while (x !== this.#head);

    this.#head = ant!.ant;
  }

  /**
   * Funcion que se ejecuta para cada nodo
   * @param callbackfn callback
   */
  forEach(
    callbackfn: (
      value: number,
      nodo: NodoListaCircular | null,
      list: NodoListaCircular | null
    ) => void
  ): void {
    if (!this.#head) return;
    let x = this.#head;
    do {
      callbackfn(x.dato, x, this.#head);
      x = x.sig!;
    } while (x !== this.#head);
  }

  /**
   * @returns una copia de la lista
   */
  lista(): NodoListaCircular | null {
    return structuredClone(this.#head);
  }
}
