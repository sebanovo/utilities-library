import { type MethodsOfNumero } from '../types/types';
import Numero from './Numero';

export class NodoListaDoblementeEnlazada {
  sig: NodoListaDoblementeEnlazada | null;
  ant: NodoListaDoblementeEnlazada | null;
  dato;
  constructor (dato: number) {
    this.dato = dato;
    this.sig = null;
    this.ant = null;
  }
}

/**
 * Clase que representa una lista enlazada doble y proporciona diversas operaciones y manipulaciones.
 */
export default class ListaDoblementeEnlazada {
  #head: NodoListaDoblementeEnlazada | null;
  constructor () {
    this.#head = null;
  }

  insertarFinal (dato: number): void {
    if (this.#head === null) {
      this.#head = new NodoListaDoblementeEnlazada(dato);
      return;
    }

    let x: NodoListaDoblementeEnlazada | null = this.#head;
    let ant: NodoListaDoblementeEnlazada | null;
    while (x !== null) {
      ant = x;
      x = x.sig;
    }
    const nodo = new NodoListaDoblementeEnlazada(dato);
    nodo.ant = ant!;
    ant!.sig = nodo;
  }

  insertarInicio (dato: number): void {
    if (this.#head === null) {
      this.#head = new NodoListaDoblementeEnlazada(dato);
      return;
    }
    const x = new NodoListaDoblementeEnlazada(dato);
    x.sig = this.#head;
    this.#head.ant = x;
    this.#head = x;
  }

  eliminarFinal (): void {
    if (this.#head === null) return;
    if (this.#head.sig === null) {
      this.#head = null;
      return;
    }
    let x = this.#head;
    let ant: NodoListaDoblementeEnlazada | null;
    while (x.sig !== null) {
      ant = x;
      x = x.sig!;
    }
    ant!.sig = null;
    x.ant = null;
  }

  eliminarInicio (): void {
    if (this.#head === null) return;
    if (this.#head.sig === null) {
      this.#head = null;
      return;
    }
    this.#head.sig.ant = null;
    this.#head = this.#head.sig;
  }

  obtenerInicio (): NodoListaDoblementeEnlazada | null {
    return this.#head;
  }

  obtenerFinal (): NodoListaDoblementeEnlazada | null {
    if (this.#head?.sig == null) return this.#head;
    let x = this.#head;
    let ant: NodoListaDoblementeEnlazada | null = null;
    while (x !== null) {
      ant = x;
      x = x.sig!;
    }
    return ant;
  }

  length (): number {
    let c = 0;
    let x = this.#head;
    while (x !== null) {
      c++;
      x = x.sig;
    }
    return c;
  }

  descargar1 (): string {
    let s = '';
    let x = this.#head;
    while (x !== null) {
      s += x.dato;
      if (x.sig !== null) {
        s += '->';
      }
      x = x.sig;
    }

    s += '\r\n';
    let y = this.#head;

    while (y !== null) {
      s += y.dato;
      if (y.sig !== null) {
        s += '<-';
      }
      y = y.sig!;
    }
    return s;
  }

  descargar2 (): string {
    let s = '';
    let x = this.obtenerFinal();
    while (x !== null) {
      s += x.dato;
      if (x.ant !== null) {
        s += '->';
      }
      x = x.ant;
    }

    s += '\r\n';
    let y = this.obtenerFinal();

    while (y !== null) {
      s += y.dato;
      if (y.ant !== null) {
        s += '<-';
      }
      y = y.ant!;
    }
    return s;
  }

  /**
   * Metodo que carga la serie Fibonacci
   * @param {number} n - Número de elementos a cargar.
   * @returns {void}
   */
  cargarFibonacci (n: number): void {
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
  cargarSerieAritmetica (
    numeroDeElementos: number,
    valorInicial: number,
    razon: number
  ): void {
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
  cargarSerieGeometrica (numeroDeElementos: number, valorInicial: number, razon: number): void {
    if (numeroDeElementos <= 0) return;

    let n = 1;
    for (let i = 0; i < numeroDeElementos; i++, n++) {
      this.insertarFinal(valorInicial * Math.round(Math.pow(razon, n - 1)));
    }
  }


  /**
   * Ordena la lista
   */
  ordenar (): void {
    let x = this.#head;
    let y = null;
    while (x !== null) {
      y = x.sig;
      while (y !== null) {
        if (x.dato > y.dato) {
          ;[x.dato, y.dato] = [y.dato, x.dato];
        }
        y = y.sig;
      }
      x = x.sig;
    }
  }

  /**
   * Segmenta la lista
   * @param {MethodsOfNumero} method  Metodo de la clase Número
   */
  segmentar (method: MethodsOfNumero): void {
    const n1 = new Numero();
    const n2 = new Numero();

    let x = this.#head;
    let y = null;
    while (x !== null) {
      y = x.sig;
      while (y !== null) {
        n1.cargar(y.dato);
        n2.cargar(x.dato);
        if ((n1[method]() && !n2[method]()) ||
          (n1[method]() && n2[method]() && y.dato < x.dato) ||
          (!n1[method]() && !n2[method]() && y.dato < x.dato)) {
          ;[x.dato, y.dato] = [y.dato, x.dato];
        }
        y = y.sig;
      }
      x = x.sig;
    }
  }

  /**
   * Intercala la lista
   * @param {MethodsOfNumero} method  Metodo de la clase Número
   */
  intercalar (method: MethodsOfNumero): void {
    const n1 = new Numero();
    const n2 = new Numero();

    let bool = true;

    let x = this.#head;
    let y = null;
    while (x !== null) {
      y = x.sig;
      if (bool) {
        while (y !== null) {
          n1.cargar(y.dato);
          n2.cargar(x.dato);
          if ((n1[method]() && !n2[method]()) ||
            (n1[method]() && n2[method]() && y.dato < x.dato) ||
            (!n1[method]() && !n2[method]() && y.dato < x.dato)) {
            ;[x.dato, y.dato] = [y.dato, x.dato];
          }
          y = y.sig;
        }
      } else {
        while (y !== null) {
          n1.cargar(y.dato);
          n2.cargar(x.dato);
          if ((!n1[method]() && n2[method]()) ||
            (!n1[method]() && !n2[method]() && y.dato < x.dato) ||
            (n1[method]() && n2[method]() && y.dato < x.dato)) {
            ;[x.dato, y.dato] = [y.dato, x.dato];
          }
          y = y.sig;
        }
      }
      bool = !bool;
      x = x.sig;
    }
  }

  /**
   * @param dato el dato a buscar
   * @returns {boolean}
   */
  busquedaSecuencial (dato: number): boolean {
    let x = this.#head;
    while (x !== null) {
      if (x.dato === dato) return true;
      x = x.sig;
    }
    return false;
  }

  /**
   * Invierte la lista enlazada
   */
  invertir (): void {
    let actual = this.#head;
    let temporal: NodoListaDoblementeEnlazada | null = null;

    while (actual !== null) {
      temporal = actual.ant;
      actual.ant = actual.sig;
      actual.sig = temporal;
      actual = actual.ant;
    }

    if (temporal !== null) this.#head = temporal.ant;
  }

  /**
   * Funcion que se ejecuta para cada nodo
   * @param callbackfn callback
   */
  forEach (callbackfn: (value: number, nodo: NodoListaDoblementeEnlazada | null, list: NodoListaDoblementeEnlazada | null) => void): void {
    let x = this.#head;
    while (x !== null) {
      callbackfn(x.dato, x, this.#head);
      x = x.sig;
    }
  }

  /**
   * @returns una copia de la lista
   */
  lista (): NodoListaDoblementeEnlazada | null {
    return structuredClone(this.#head);
  }
}
