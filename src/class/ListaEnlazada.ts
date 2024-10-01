import { type MethodsOfNumero } from '../@types/types';
import Numero from './Numero';

class Nodo {
  dato: number;
  sig: Nodo | null;

  constructor (dato: number) {
    this.dato = dato;
    this.sig = null;
  }
}

/**
 * Clase que representa una lista enlazada simple y proporciona diversas operaciones y manipulaciones.
 */
export default class ListaEnlazada {
  #head: Nodo | null = null;

  CargarElementoXElemento (dato: number): void {
    if (this.#head === null) {
      this.#head = new Nodo(dato);
      return;
    }

    let x: Nodo | null = this.#head;
    let ant: Nodo | null;
    while (x != null) {
      ant = x;
      x = x.sig;
    }

    ant!.sig = new Nodo(dato);
  }

  descargar (): string {
    let s = '';
    let x = this.#head;
    while (x != null) {
      s += x.dato;
      if (x.sig != null) {
        s += '->';
      }
      x = x.sig;
    }
    return s;
  }

  /**
   * @returns una copia de la lista
   */
  lista (): Nodo | null {
    return structuredClone(this.#head);
  }

  /**
   * Metodo que carga la serie Fibonacci
   * @param {number} n - Número de elementos a cargar.
   * @returns {void}
   */
  cargarFibonacci (n: number): void {
    if (n <= 0) return;
    this.CargarElementoXElemento(0);
    if (n === 1) return;
    this.CargarElementoXElemento(1);

    let prev1 = this.#head;
    let prev2 = this.#head!.sig;
    for (let i = 2; i < n; i++) {
      const dato = prev1!.dato + prev2!.dato;
      this.CargarElementoXElemento(dato);
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
      this.CargarElementoXElemento(valorInicial + i * razon);
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
      this.CargarElementoXElemento(valorInicial * Math.round(Math.pow(razon, n - 1)));
    }
  }

  /**
   * Ordena la lista
   */
  bubbleSort (): void {
    let x = this.#head;
    let y = null;
    while (x != null) {
      y = x.sig;
      while (y != null) {
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
    while (x != null) {
      y = x.sig;
      while (y != null) {
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
    while (x != null) {
      y = x.sig;
      if (bool) {
        while (y != null) {
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
        while (y != null) {
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
   * @returns la longitud de la lista
   */
  length (): number {
    let x = this.#head;
    let c = 0;
    while (x != null) {
      c++;
      x = x.sig;
    }
    return c;
  }

  /**
   * @param dato el dato a buscar
   * @returns {boolean}
   */
  busquedaSecuencial (dato: number): boolean {
    let x = this.#head;
    while (x != null) {
      if (x.dato === dato) return true;
      x = x.sig;
    }
    return false;
  }
}
