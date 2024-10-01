import { type MatrizDimension, methodsOfNumero, type MethodsOfNumero } from '../@types/types';
import Numero from './Numero';
/**
 * Clase Matriz para trabajar con matrices
 */
export default class Matriz {
  #rowLength: number = 0;
  #columnLength: number = 0;
  #matriz: number[][] = [];
  /**
   * Metodo que carga la matriz con valores randoms de un rango
   * @param {number} nf número de fila
   * @param {number} nc número de columna
   * @param {number} a rango a
   * @param {number} b rango b
   * @returns {void}
   */
  cargar (nf: number, nc: number, a: number, b: number): void {
    if (nf === null || nc === null || a === null || b === null) {
      throw new Error('Ingrese los parametros en cargar');
    }

    this.#rowLength = nf;
    this.#columnLength = nc;

    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      this.#matriz[f1] ??= [];
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        this.#matriz[f1][c1] = Math.floor(Math.random() * (b - a + 1) + a);
      }
    }
  }

  /**
   * Retorna el número de filas
   * @returns {number}
   */
  rowLength (): number {
    return this.#rowLength;
  }

  /**
   * Retorna el número de columnas
   * @returns {number}
   */
  columnLength (): number {
    return this.#columnLength;
  }

  /**
   * Cargar Vibora por filas
   * @param nf Número de filas
   * @param nc Número de columnas
   * @example
   * cargarViboraPorFilas(5,5)
   * 1   2  3  4  5
   * 10  9  8  7  6
   * 11 12 13 14 15
   * 20 19 18 17 16
   * 21 22 23 24 25
   */
  cargarViboraPorFilas (nf: number, nc: number): void {
    // pending
    this.#rowLength = nf;
    this.#columnLength = nc;
    let r = 1;
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        this.#matriz[f1] ??= [];

        this.#matriz[f1][c1] = r;
        r++;
      }
    }
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      if (f1 % 2 === 1) {
        let inicio = 0;
        let final = this.#columnLength - 1;
        while (inicio < final) {
          this.intercambiar(f1, inicio, f1, final);
          inicio++;
          final--;
        }
      }
    }
  }

  /**
   * Cargar Vibora por columnas
   * @param nf Número de filas
   * @param nc Número de columnas
   * @example
   * cargarViboraPorColumnas(5,5)
   * 1 10 11 20 21
   * 2  9 12 19 22
   * 3  8 13 18 23
   * 4  7 14 17 24
   * 5  6 15 16 25
   */
  cargarViboraPorColumnas (nf: number, nc: number): void {
    // pending
    this.#rowLength = nf;
    this.#columnLength = nc;
    let r = 1;
    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      for (let f1 = 0; f1 < this.#rowLength; f1++) {
        this.#matriz[f1] ??= [];

        this.#matriz[f1][c1] = r;
        r++;
      }
    }
    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      if (c1 % 2 === 1) {
        let inicio = 0;
        let final = this.#rowLength - 1;
        while (inicio < final) {
          this.intercambiar(inicio, c1, final, c1);
          inicio++;
          final--;
        }
      }
    }
  }

  /**
   * Metodo que retorna la matriz en formato especial de cadena
   * @returns {string}
   */
  descargar (): string {
    let s = '';
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        s = s + (this.#matriz[f1][c1] ?? ' ') + '\t';
      }
      s = s + '\n';
    }
    return s;
  }

  /**
   * Retorna la matriz
   * @returns {number[][]}
   */
  matriz (): number[][] {
    return structuredClone(this.#matriz);
  }

  #checarMethodsOfNumero (method: MethodsOfNumero): never | void {
    const index = methodsOfNumero.indexOf(method);
    if (index === -1) {
      throw new Error('El metodo no corresponse a una funcion de la clase Número');
    }
  }

  #checarDireccion (direccion: string): never | void {
    if (direccion !== 'asc' && direccion !== 'desc') {
      throw new Error("La dirección tiene que ser 'asc' o 'desc'");
    }
  }

  /**
   * Retorna un objeto con la fila y la columna
   * @returns {MatrizDimension}
   */
  retornarDimension (): MatrizDimension {
    return {
      rows: this.#rowLength,
      columns: this.#columnLength
    };
  }

  /**
   * Metodo que carga serie Aritmetica
   * @param {number} nf numero de fila
   * @param {number} nc numero de columna
   * @param {number} a1 numero de inicio
   * @param {number} r la razón
   * @returns {void}
   */
  cargarSerieAritmetica (nf: number, nc: number, a1: number, r: number): void {
    if (nf === null || nc === null || a1 === null || r === null) {
      throw new Error('Ingrese los parametros en cargar');
    }

    this.#rowLength = nf;
    this.#columnLength = nc;

    let n = 1;
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      this.#matriz[f1] ??= [];
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        this.#matriz[f1][c1] = a1 + (n - 1) * r;
        n++;
      }
    }
  }

  /**
   * Metodo que carga serie Geometrica
   * @param {number} nf numero de fila
   * @param {number} nc numero de columna
   * @param {number} a1 numero de inicio
   * @param {number} r la razón
   * @returns {void}
   */
  cargarSerieGeometrica (nf: number, nc: number, a1: number, r: number): void {
    if (nf === null || nc === null || a1 === null || r === null) {
      throw new Error('Ingrese los parametros en cargar');
    }

    this.#rowLength = nf;
    this.#columnLength = nc;

    let n = 1;

    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      this.#matriz[f1] ??= [];
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        this.#matriz[f1][c1] = a1 * Math.round(Math.pow(r, n - 1));
        n++;
      }
    }
  }

  /**
   * Busca si un número pertenece a la Matriz
   * @param {number} num numero a buscar
   * @returns {boolean}
   */
  pertenencia (num: number): boolean {
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        if (this.#matriz[f1][c1] === num) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Verifica si un número es mayor a todos los números de la matriz
   * @param {number} num numero a comparar
   * @returns {boolean}
   */
  verificarMayor (num: number): boolean {
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        if (this.#matriz[f1][c1] > num) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Verifica si un número es menor a todos los números de la matriz
   * @param {number} num numero a comparar
   * @returns {boolean}
   */
  verificarMenor (num: number): boolean {
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        if (this.#matriz[f1][c1] < num) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Verifica si la matriz esta ordenada
   * @returns {boolean}
   */
  verificarOrdenado (direccion: 'asc' | 'desc' = 'asc'): boolean {
    this.#checarDireccion(direccion);
    let control = this.#matriz[0][0];

    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        if (
          direccion === 'asc'
            ? this.#matriz[f1][c1] < control
            : this.#matriz[f1][c1] > control
        ) {
          return false;
        }
        control = this.#matriz[f1][c1];
      }
    }
    return true;
  }

  /**
   * Verifica si la matriz esta ordenada respecto a una razón
   * @param {number} r la razón
   * @returns {boolean}
   */
  verificarOrdenadoRazon (r: number): boolean {
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < this.#columnLength - 1; c1++) {
        if (this.#matriz[f1][c1] + r !== this.#matriz[f1][c1 + 1]) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Verifica si todos los elementos de la matriz son iguales
   * @returns {boolean}
   */
  verificarTodosIguales (): boolean {
    const first: number = this.#matriz[0][0];
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        if (first !== this.#matriz[f1][c1]) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Verifica si todos los elementos de la matriz son diferentes
   * @returns {boolean}
   */
  verificarTodosDiferentes (): boolean {
    const set = new Set();
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        const numero = this.#matriz[f1][c1];

        if (set.has(numero)) {
          return false;
        }
        set.add(numero);
      }
    }
    return true;
  }

  /**
   * Suma dos matrices
   * @param {Matriz} m1 objeto de la clase matriz
   * @param {Matriz} m2 objeto de la clase matriz
   * @returns {void}
   */
  suma (m1: Matriz, m2: Matriz): void {
    if (m1.#rowLength !== m2.#rowLength || m1.#columnLength !== m2.#columnLength) {
      throw new Error('No se pueden sumar matrices de dimensiones diferentes');
    }
    this.#rowLength = m1.#rowLength;
    this.#columnLength = m1.#columnLength;

    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      this.#matriz[f1] ??= [];
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        this.#matriz[f1][c1] = m1.#matriz[f1][c1] + m2.#matriz[f1][c1];
      }
    }
  }

  /**
   * Resta dos matrices
   * @param {Matriz} m1 objeto de la clase matriz
   * @param {Matriz} m2 objeto de la clase matriz
   * @returns {void}
   */
  resta (m1: Matriz, m2: Matriz): void {
    if (m1.#rowLength !== m2.#rowLength || m1.#columnLength !== m2.#columnLength) {
      throw new Error('No se pueden sumar matrices de dimensiones diferentes');
    }
    this.#rowLength = m1.#rowLength;
    this.#columnLength = m1.#columnLength;

    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      this.#matriz[f1] ??= [];
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        this.#matriz[f1][c1] = m1.#matriz[f1][c1] - m2.#matriz[f1][c1];
      }
    }
  }

  /**
   * Multiplica dos matrices
   * @param {Matriz} m1 objeto de la clase matriz
   * @param {Matriz} m2 objeto de la clase matriz
   * @returns {void}
   */
  multiplicacion (m1: Matriz, m2: Matriz): void {
    if (m1.#columnLength !== m2.#rowLength) {
      throw new Error(
        'La columna de la primera matriz debe ser igual que la fila de la segunda matriz'
      );
    }

    this.#rowLength = m1.#rowLength;
    this.#columnLength = m2.#columnLength;

    let suma;
    const n = m1.#columnLength;

    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      this.#matriz[f1] ??= [];
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        suma = 0;
        for (let k = 0; k < n; k++) {
          suma = suma + m1.#matriz[f1][k] * m2.#matriz[k][c1];
        }
        this.#matriz[f1][c1] = suma;
      }
    }
  }

  /**
   * Multiplica la matriz por un escalar
   * @param {number} escalar número real
   * @returns {void}
   */
  multiplicacionPorEscalar (escalar: number): void {
    if (this.#rowLength === 0 || this.#columnLength === 0) return;

    for (let f1 = 1; f1 < this.#rowLength; f1++) {
      this.#matriz[f1] ??= [];
      for (let c1 = 1; c1 < this.#columnLength; c1++) {
        this.#matriz[f1][c1] = escalar * this.#matriz[f1][c1];
      }
    }
  }

  /**
   *  Trasnposicion de matrices
   */
  transposicion (): void {
    const m1 = new Matriz();
    for (let f1 = 0; f1 < this.#columnLength; f1++) {
      m1.#matriz[f1] ??= [];
      for (let c1 = 0; c1 < this.#rowLength; c1++) {
        m1.#matriz[f1][c1] = this.#matriz[c1][f1];
      }
    }
    // Intercambiar
    ;[this.#rowLength, this.#columnLength] = [this.#columnLength, this.#rowLength];
    this.#matriz = m1.#matriz;
  }

  /**
   * Intercambia dos elementos de la matriz
   * @param {number} f1 fila 1
   * @param {number} c1 columna 1
   * @param {number} f2 fila 2
   * @param {number} c2 columna 2
   */
  intercambiar (f1: number, c1: number, f2: number, c2: number): void {
    ;[this.#matriz[f1][c1], this.#matriz[f2][c2]] = [
      this.#matriz[f2][c2],
      this.#matriz[f1][c1]
    ];
  }

  /**
   * Retorna el número mayor de la matriz
   * @returns {number}
   */
  devolverMayor (): number {
    if (this.#rowLength === 0 || this.#columnLength === 0) {
      throw new Error('La matriz está vacía.');
    }

    let mayor = this.#matriz[0][0];

    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        if (mayor < this.#matriz[f1][c1]) {
          mayor = this.#matriz[f1][c1];
        }
      }
    }
    return mayor;
  }

  /**
   * Retorna el número menor de la matriz
   * @returns {number}
   */
  devolverMenor (): number {
    if (this.#rowLength === 0 || this.#columnLength === 0) {
      throw new Error('La matriz está vacía.');
    }

    let menor = this.#matriz[0][0];

    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        if (menor > this.#matriz[f1][c1]) {
          menor = this.#matriz[f1][c1];
        }
      }
    }
    return menor;
  }

  /**
   * Busca un elemento y devuelve sus posiciones
   * @param {number} num numero a buscar
   * @returns {number[]} La posición del número en formato [x, y], o [null, null] si no se encuentra.
   */
  busquedaSecuencial (num: number): number[] | null[] {
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        if (this.#matriz[f1][c1] === num) {
          return [f1 + 1, c1 + 1];
        }
      }
    }
    return [null, null];
  }

  /**
   * Retorna la frecuencia de un número
   * @param {number} num número
   * @returns {number}
   */
  frecuencia (num: number): number {
    let frec = 0;
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        if (num === this.#matriz[f1][c1]) {
          frec++;
        }
      }
    }
    return frec;
  }

  /**
   * Ordena la matriz
   * @param {'asc' | 'desc'} direccion direccion del ordenamiento
   */
  ordenar (direccion: 'asc' | 'desc' = 'asc'): void {
    this.#checarDireccion(direccion);
    let inc;
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        for (let f2 = f1; f2 < this.#rowLength; f2++) {
          if (f1 === f2) {
            inc = c1;
          } else {
            inc = 0;
          }
          for (let c2 = inc; c2 < this.#columnLength; c2++) {
            if (
              direccion === 'asc'
                ? this.#matriz[f1][c1] > this.#matriz[f2][c2]
                : this.#matriz[f1][c1] < this.#matriz[f2][c2]
            ) {
              this.intercambiar(f1, c1, f2, c2);
            }
          }
        }
      }
    }
  }

  /**
   * Segmenta la matriz pasandole una funcion de un objeto de la instancia Numero
   * @param {MethodsOfNumero} method metodo del objeto Numero
   */
  segmentar (method: MethodsOfNumero): void {
    this.#checarMethodsOfNumero(method);
    let inc;
    const n1 = new Numero();
    const n2 = new Numero();

    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        for (let f2 = f1; f2 < this.#rowLength; f2++) {
          if (f1 === f2) {
            inc = c1 + 1;
          } else {
            inc = 0;
          }
          for (let c2 = inc; c2 < this.#columnLength; c2++) {
            n1.cargar(this.#matriz[f2][c2]);
            n2.cargar(this.#matriz[f1][c1]);
            if (
              (n1[method]() && !n2[method]()) ||
              (n1[method]() &&
                n2[method]() &&
                this.#matriz[f2][c2] < this.#matriz[f1][c1]) ||
              (!n1[method]() &&
                !n2[method]() &&
                this.#matriz[f2][c2] < this.#matriz[f1][c1])
            ) {
              this.intercambiar(f2, c2, f1, c1);
            }
          }
        }
      }
    }
  }

  /**
   * Intercalar la matriz pasandole una funcion de un objeto de la instancia Numero
   * @param {MethodsOfNumero} method metodo del objeto Numero
   */
  intercalar (method: MethodsOfNumero): void {
    this.#checarMethodsOfNumero(method);

    let inc;
    let bool = true;

    const n1 = new Numero();
    const n2 = new Numero();

    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        if (bool) {
          for (let f2 = f1; f2 < this.#rowLength; f2++) {
            if (f1 === f2) {
              inc = c1 + 1;
            } else {
              inc = 0;
            }
            for (let c2 = inc; c2 < this.#columnLength; c2++) {
              n1.cargar(this.#matriz[f2][c2]);
              n2.cargar(this.#matriz[f1][c1]);
              if (
                (n1[method]() && !n2[method]()) ||
                (n1[method]() &&
                  n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1]) ||
                (!n1[method]() &&
                  !n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1);
              }
            }
          }
        } else {
          for (let f2 = f1; f2 < this.#rowLength; f2++) {
            if (f1 === f2) {
              inc = c1 + 1;
            } else {
              inc = 0;
            }
            for (let c2 = inc; c2 < this.#columnLength; c2++) {
              n1.cargar(this.#matriz[f2][c2]);
              n2.cargar(this.#matriz[f1][c1]);
              if (
                (!n1[method]() && n2[method]()) ||
                (!n1[method]() &&
                  !n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1]) ||
                (n1[method]() &&
                  n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1);
              }
            }
          }
        }
        bool = !bool;
      }
    }
  }

  // extensiones 1 (Añadir Columna)
  /**
   * Se debe ingresar un metodo de la clase Numero
   * @param {Function} method metodo de la clase Numero
   */
  #añadirColumna (method: Function): void {
    this.#matriz[this.#columnLength] ??= [];
    this.#matriz[this.#columnLength + 1] ??= [];

    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      this.#matriz[f1][this.#columnLength] = method(f1);
    }
    this.#columnLength++;
  }

  /**
   * Retorna la suma de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  sumaFila (fila: number): number {
    let suma = 0;

    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      suma = suma + this.#matriz[fila][c1];
    }
    return suma;
  }

  /**
   * Retorna la Mutiplicación de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  multiplicacionFila (fila: number): number {
    let producto = 1;
    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      producto = producto * this.#matriz[fila][c1];
    }
    return producto;
  }

  /**
   * Cuenta los pares de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarParesFila (fila: number): number {
    let count = 0;
    const n1 = new Numero();
    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      n1.cargar(this.#matriz[fila][c1]);
      if (n1.esPar()) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los no pares de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarNoParesFila (fila: number): number {
    let count = 0;
    const n1 = new Numero();
    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      n1.cargar(this.#matriz[fila][c1]);
      if (!n1.esPar()) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los Primos de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarPrimosFila (fila: number): number {
    let count = 0;
    const n1 = new Numero();
    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      n1.cargar(this.#matriz[fila][c1]);
      if (n1.esPrimo()) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los no primos de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarNoPrimosFila (fila: number): number {
    let count = 0;
    const n1 = new Numero();
    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      n1.cargar(this.#matriz[fila][c1]);
      if (!n1.esPrimo()) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los Capicuas de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarCapicuasFila (fila: number): number {
    let count = 0;
    const n1 = new Numero();
    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      n1.cargar(this.#matriz[fila][c1]);
      if (n1.esCapicua()) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los no Capicuas de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarNoCapicuasFila (fila: number): number {
    let count = 0;
    const n1 = new Numero();
    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      n1.cargar(this.#matriz[fila][c1]);
      if (!n1.esCapicua()) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los fibonaccis de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarFibonaccisFila (fila: number): number {
    let count = 0;
    const n1 = new Numero();
    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      n1.cargar(this.#matriz[fila][c1]);
      if (n1.esFibonacci()) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los no fibonaccis de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarNoFibonaccisFila (fila: number): number {
    let count = 0;
    const n1 = new Numero();
    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      n1.cargar(this.#matriz[fila][c1]);
      if (!n1.esFibonacci()) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los elementos diferentes de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarElementosDiferentesFila (fila: number): number {
    let esDiferente;
    let count = 1;
    for (let i = 1; i < this.#columnLength; i++) {
      esDiferente = true;
      for (let j = 0; j < i; j++) {
        if (this.#matriz[fila][i] === this.#matriz[fila][j]) {
          esDiferente = false;
          break;
        }
      }
      if (esDiferente) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los elementos unicos de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarElementosUnicosFila (fila: number): number {
    let count = 0;
    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      if (this.frecuenciaFila(fila, this.#matriz[fila][c1]) === 1) {
        count++;
      }
    }
    return count;
  }

  /**
   * Retorna la frecuencia de un número en la fila
   * @param {number} fila fila real de 0 - fila
   * @param {number} num numero
   * @returns {number}
   */
  frecuenciaFila (fila: number, num: number): number {
    let frec = 0;
    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      if (this.#matriz[fila][c1] === num) {
        frec++;
      }
    }
    return frec;
  }

  #mayorFrecuenciaFila (fila: number): number {
    let dato1, frec1, dato2, frec2;

    dato1 = this.#matriz[fila][0];
    frec1 = this.frecuenciaFila(fila, dato1);
    for (let i = 0; i < this.#columnLength; i++) {
      dato2 = this.#matriz[fila][i];
      frec2 = this.frecuenciaFila(fila, dato2);
      if (frec1 < frec2) {
        dato1 = dato2;
        frec1 = frec2;
      }
    }
    return dato1;
  }

  #menorFrecuenciaFila (fila: number): number {
    let dato1, frec1, dato2, frec2;

    dato1 = this.#matriz[fila][0];
    frec1 = this.frecuenciaFila(fila, dato1);
    for (let i = 0; i < this.#columnLength; i++) {
      dato2 = this.#matriz[fila][i];
      frec2 = this.frecuenciaFila(fila, dato2);
      if (frec1 > frec2) {
        dato1 = dato2;
        frec1 = frec2;
      }
    }
    return dato1;
  }

  // extensiones 2 (Añadir Fila)
  #añadirFila (method: (arg0: number) => number): void {
    this.#matriz[this.#rowLength] ??= [];
    this.#matriz[this.#rowLength + 1] ??= [];

    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      this.#matriz[this.#rowLength][c1] = method(c1);
    }
    this.#rowLength++;
  }

  /**
   * Retorna la suma de la columna real
   * @param {number} columna real de 0 - columna
   * @returns {number}
   */
  sumaColumna (columna: number): number {
    let suma = 0;

    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      suma = suma + this.#matriz[f1][columna];
    }
    return suma;
  }

  /**
   * Retorna la multiplicacion de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  multiplicacionColumna (columna: number): number {
    let producto = 1;

    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      producto = producto + this.#matriz[f1][columna];
    }
    return producto;
  }

  /**
   * Cuenta los pares de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarParesColumna (columna: number): number {
    let count = 0;
    const n1 = new Numero();
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      n1.cargar(this.#matriz[f1][columna]);
      if (n1.esPar()) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los no pares de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarNoParesColumna (columna: number): number {
    let count = 0;
    const n1 = new Numero();
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      n1.cargar(this.#matriz[f1][columna]);
      if (!n1.esPar()) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los primos de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarPrimosColumna (columna: number): number {
    let count = 0;
    const n1 = new Numero();
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      n1.cargar(this.#matriz[f1][columna]);
      if (n1.esPrimo()) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los no primos de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarNoPrimosColumna (columna: number): number {
    let count = 0;
    const n1 = new Numero();
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      n1.cargar(this.#matriz[f1][columna]);
      if (!n1.esPrimo()) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los capicuas de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarCapicuasColumna (columna: number): number {
    let count = 0;
    const n1 = new Numero();
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      n1.cargar(this.#matriz[f1][columna]);
      if (n1.esCapicua()) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los no capicuas de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarNoCapicuasColumna (columna: number): number {
    let count = 0;
    const n1 = new Numero();
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      n1.cargar(this.#matriz[f1][columna]);
      if (!n1.esCapicua()) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los fibonaccis de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarFibonaccisColumna (columna: number): number {
    let count = 0;
    const n1 = new Numero();
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      n1.cargar(this.#matriz[f1][columna]);
      if (n1.esFibonacci()) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los no fibonaccis de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarNoFibonaccisColumna (columna: number): number {
    let count = 0;
    const n1 = new Numero();
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      n1.cargar(this.#matriz[f1][columna]);
      if (n1.esFibonacci()) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los ElementosDiferentes de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarElementosDiferentesColumna (columna: number): number {
    let esDiferente;
    let count = 1;
    for (let i = 1; i < this.#rowLength; i++) {
      esDiferente = true;
      for (let j = 0; j < i; j++) {
        if (this.#matriz[i][columna] === this.#matriz[j][columna]) {
          esDiferente = false;
          break;
        }
      }
      if (esDiferente) {
        count++;
      }
    }
    return count;
  }

  /**
   * Cuenta los elementos unicos de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarElementosUnicosColumna (columna: number): number {
    let count = 0;
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      if (this.frecuenciaColumna(columna, this.#matriz[f1][columna]) === 1) {
        count++;
      }
    }
    return count;
  }

  /**
   * Retorna la frecuencia de la columna
   * @param {number} columna columna real de 0 - columna
   * @param {number} num numero
   * @returns {number}
   */
  frecuenciaColumna (columna: number, num: number): number {
    let frec = 0;
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      if (this.#matriz[f1][columna] === num) {
        frec++;
      }
    }
    return frec;
  }

  #mayorFrecuenciaColumna (columna: number): number {
    let dato1, frec1, dato2, frec2;

    dato1 = this.#matriz[0][columna];
    frec1 = this.frecuenciaColumna(columna, dato1);
    for (let i = 0; i < this.#rowLength; i++) {
      dato2 = this.#matriz[i][columna];
      frec2 = this.frecuenciaColumna(columna, dato2);
      if (frec1 < frec2) {
        dato1 = dato2;
        frec1 = frec2;
      }
    }
    return dato1;
  }

  #menorFrecuenciaColumna (columna: number): number {
    let dato1, frec1, dato2, frec2;

    dato1 = this.#matriz[0][columna];
    frec1 = this.frecuenciaColumna(columna, dato1);
    for (let i = 0; i < this.#rowLength; i++) {
      dato2 = this.#matriz[i][columna];
      frec2 = this.frecuenciaColumna(columna, dato2);
      if (frec1 > frec2) {
        dato1 = dato2;
        frec1 = frec2;
      }
    }
    return dato1;
  }

  // parte 1
  añadirColumnaMayorFrecuenciaYFrecuencia (): void {
    this.#matriz[this.#columnLength] ??= [];
    this.#matriz[this.#columnLength + 1] ??= [];

    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      this.#matriz[f1][this.#columnLength] = this.#mayorFrecuenciaFila(f1);
      this.#matriz[f1][this.#columnLength + 1] = this.frecuenciaFila(
        f1,
        this.#matriz[f1][this.#columnLength]
      );
    }
    this.#columnLength++;
    this.#columnLength++;
  }

  añadirColumnaMenorFrecuenciaYFrecuencia (): void {
    this.#matriz[this.#columnLength] ??= [];
    this.#matriz[this.#columnLength + 1] ??= [];

    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      this.#matriz[f1][this.#columnLength] = this.#menorFrecuenciaFila(f1);
      this.#matriz[f1][this.#columnLength + 1] = this.frecuenciaFila(
        f1,
        this.#matriz[f1][this.#columnLength]
      );
    }
    this.#columnLength++;
    this.#columnLength++;
  }

  añadirColumnaSuma (): void {
    this.#añadirColumna(this.sumaFila.bind(this)); // bind(this) se asegura que sea el metodo correcto
  }

  añadirColumnaMultiplacion (): void {
    this.#añadirColumna(this.multiplicacionFila.bind(this));
  }

  añadirColumnaPares (): void {
    this.#añadirColumna(this.contarParesFila.bind(this));
  }

  añadirColumnaNoPares (): void {
    this.#añadirColumna(this.contarNoParesFila.bind(this));
  }

  añadirColumnaPrimos (): void {
    this.#añadirColumna(this.contarPrimosFila.bind(this));
  }

  añadirColumnaNoPrimos (): void {
    this.#añadirColumna(this.contarNoPrimosFila.bind(this));
  }

  añadirColumnaCapicuas (): void {
    this.#añadirColumna(this.contarCapicuasFila.bind(this));
  }

  añadirColumnaNoCapicuas (): void {
    this.#añadirColumna(this.contarNoCapicuasFila.bind(this));
  }

  añadirColumnaFibonaccis (): void {
    this.#añadirColumna(this.contarFibonaccisFila.bind(this));
  }

  añadirColumnaNoFibonaccis (): void {
    this.#añadirColumna(this.contarNoFibonaccisFila.bind(this));
  }

  añadirColumnaElementosDiferentes (): void {
    this.#añadirColumna(this.contarElementosDiferentesFila.bind(this));
  }

  añadirColumnaElementosUnicos (): void {
    this.#añadirColumna(this.contarElementosUnicosFila.bind(this));
  }

  // parte 2
  añadirFilaMayorFrecuenciaYFrecuencia (): void {
    this.#matriz[this.#rowLength] ??= [];
    this.#matriz[this.#rowLength + 1] ??= [];

    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      this.#matriz[this.#rowLength][c1] = this.#mayorFrecuenciaColumna(c1);
      this.#matriz[this.#rowLength + 1][c1] = this.frecuenciaColumna(
        c1,
        this.#matriz[this.#rowLength][c1]
      );
    }
    this.#rowLength++;
    this.#rowLength++;
  }

  añadirFilaMenorFrecuenciaYFrecuencia (): void {
    this.#matriz[this.#rowLength] ??= [];
    this.#matriz[this.#rowLength + 1] ??= [];

    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      this.#matriz[this.#rowLength][c1] = this.#menorFrecuenciaColumna(c1);
      this.#matriz[this.#rowLength + 1][c1] = this.frecuenciaColumna(
        c1,
        this.#matriz[this.#rowLength][c1]
      );
    }
    this.#rowLength++;
    this.#rowLength++;
  }

  añadirFilaSuma (): void {
    this.#añadirFila(this.sumaColumna.bind(this)); // bind(this) se asegura que sea el metodo correcto
  }

  añadirFilaMultiplacion (): void {
    this.#añadirFila(this.multiplicacionColumna.bind(this));
  }

  añadirFilaPares (): void {
    this.#añadirFila(this.contarParesColumna.bind(this));
  }

  añadirFilaNoPares (): void {
    this.#añadirFila(this.contarNoParesColumna.bind(this));
  }

  añadirFilaPrimos (): void {
    this.#añadirFila(this.contarPrimosColumna.bind(this));
  }

  añadirFilaNoPrimos (): void {
    this.#añadirFila(this.contarNoPrimosColumna.bind(this));
  }

  añadirFilaCapicuas (): void {
    this.#añadirFila(this.contarCapicuasColumna.bind(this));
  }

  añadirFilaNoCapicuas (): void {
    this.#añadirFila(this.contarNoCapicuasColumna.bind(this));
  }

  añadirFilaFibonaccis (): void {
    this.#añadirFila(this.contarFibonaccisColumna.bind(this));
  }

  añadirFilaNoFibonaccis (): void {
    this.#añadirFila(this.contarNoFibonaccisColumna.bind(this));
  }

  añadirFilaElementosDiferentes (): void {
    this.#añadirFila(this.contarElementosDiferentesColumna.bind(this));
  }

  añadirFilaElementosUnicos (): void {
    this.#añadirFila(this.contarElementosUnicosColumna.bind(this));
  }

  // Op.Matrices Cuadradas
  ordenarDiagonalPrincipal (): void {
    if (this.#columnLength !== this.#rowLength) { throw new Error('Las Matriz no es cuadrada'); }

    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < this.#columnLength; c1++) {
        for (let f2 = f1; f2 < this.#rowLength; f2++) {
          for (let c2 = c1; c2 < this.#columnLength; c2++) {
            if (c1 === f1 && c2 === f2 && this.#matriz[f1][c1] > this.#matriz[f2][c2]) {
              this.intercambiar(f1, c1, f2, c2);
            }
          }
        }
      }
    }
  }

  ordenarDiagonalSecundaria (): void {
    if (this.#columnLength !== this.#rowLength) { throw new Error('La Matriz no es Cuadrada'); }

    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let c1 = this.#columnLength - 1; c1 >= 0; c1--) {
        for (let f2 = f1; f2 < this.#rowLength; f2++) {
          for (let c2 = c1; c2 >= 0; c2--) {
            if (
              c1 === this.#columnLength - f1 - 1 &&
              c2 === this.#columnLength - f2 - 1 &&
              this.#matriz[f1][c1] > this.#matriz[f2][c2]
            ) {
              this.intercambiar(f1, c1, f2, c2);
            }
          }
        }
      }
    }
  }

  // #segmentar
  /**
   * Segmentar la triangular de acuerdo al metodo que le pasemos
   * @param {MethodsOfNumero} method metodo de la instancia Numero
   * @throws {Error} Si la matriz no es cuadrada
   * @returns {void}
   */
  segmentarTriangularInferiorIzquierda (method: MethodsOfNumero): void {
    this.#checarMethodsOfNumero(method);
    if (this.#columnLength !== this.#rowLength) { throw new Error('Las Matriz no es cuadrada'); }

    let inc;

    const n1 = new Numero();
    const n2 = new Numero();

    for (let f1 = 1; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < f1; c1++) {
        for (let f2 = f1; f2 < this.#rowLength; f2++) {
          if (f1 === f2) {
            inc = c1 + 1;
          } else {
            inc = 0;
          }
          for (let c2 = inc; c2 < f2; c2++) {
            n1.cargar(this.#matriz[f2][c2]);
            n2.cargar(this.#matriz[f1][c1]);
            if (
              (n1[method]() && !n2[method]()) ||
              (n1[method]() &&
                n2[method]() &&
                this.#matriz[f2][c2] < this.#matriz[f1][c1]) ||
              (!n1[method]() &&
                !n2[method]() &&
                this.#matriz[f2][c2] < this.#matriz[f1][c1])
            ) {
              this.intercambiar(f2, c2, f1, c1);
            }
          }
        }
      }
    }
  }

  /**
   * Segmentar la triangular de acuerdo al metodo que le pasemos
   * @param { MethodsOfNumero} method metodo de la instancia Numero
   * @throws {Error} Si la matriz no es cuadrada
   * @returns {void}
   */
  segmentarTriangularInferiorDerecha (method: MethodsOfNumero): void {
    this.#checarMethodsOfNumero(method);
    if (this.#columnLength !== this.#rowLength) { throw new Error('Las Matriz no es cuadrada'); }

    let inc;

    const n1 = new Numero();
    const n2 = new Numero();

    for (let f1 = 1; f1 < this.#rowLength; f1++) {
      for (let c1 = this.#columnLength - f1; c1 < this.#columnLength; c1++) {
        for (let f2 = f1; f2 < this.#rowLength; f2++) {
          if (f1 === f2) {
            inc = c1 + 1;
          } else {
            inc = this.#columnLength - f2;
          }
          for (let c2 = inc; c2 < this.#columnLength; c2++) {
            n1.cargar(this.#matriz[f2][c2]);
            n2.cargar(this.#matriz[f1][c1]);
            if (
              (n1[method]() && !n2[method]()) ||
              (n1[method]() &&
                n2[method]() &&
                this.#matriz[f2][c2] < this.#matriz[f1][c1]) ||
              (!n1[method]() &&
                !n2[method]() &&
                this.#matriz[f2][c2] < this.#matriz[f1][c1])
            ) {
              this.intercambiar(f2, c2, f1, c1);
            }
          }
        }
      }
    }
  }

  /**
   * Segmentar la triangular de acuerdo al metodo que le pasemos
   * @param {MethodsOfNumero} method metodo de la instancia Numero
   * @throws {Error} Si la matriz no es cuadrada
   * @returns {void}
   */
  segmentarTriangularSuperiorIzquierda (method: MethodsOfNumero): void {
    this.#checarMethodsOfNumero(method);
    if (this.#columnLength !== this.#rowLength) { throw new Error('Las Matriz no es cuadrada'); }
    let inc;

    const n1 = new Numero();
    const n2 = new Numero();

    for (let f1 = 0; f1 < this.#rowLength - 1; f1++) {
      for (let c1 = 0; c1 < this.#columnLength - f1 - 1; c1++) {
        for (let f2 = f1; f2 < this.#rowLength - 1; f2++) {
          if (f1 === f2) {
            inc = c1 + 1;
          } else {
            inc = 0;
          }
          for (let c2 = inc; c2 < this.#columnLength - f2 - 1; c2++) {
            n1.cargar(this.#matriz[f2][c2]);
            n2.cargar(this.#matriz[f1][c1]);
            if (
              (n1[method]() && !n2[method]()) ||
              (n1[method]() &&
                n2[method]() &&
                this.#matriz[f2][c2] < this.#matriz[f1][c1]) ||
              (!n1[method]() &&
                !n2[method]() &&
                this.#matriz[f2][c2] < this.#matriz[f1][c1])
            ) {
              this.intercambiar(f2, c2, f1, c1);
            }
          }
        }
      }
    }
  }

  /**
   * Segmentar la triangular de acuerdo al metodo que le pasemos
   * @param {MethodsOfNumero} method metodo de la instancia Numero
   * @throws {Error} Si la matriz no es cuadrada
   * @returns {void}
   */
  segmentarTriangularSuperiorDerecha (method: MethodsOfNumero): void {
    this.#checarMethodsOfNumero(method);
    if (this.#columnLength !== this.#rowLength) { throw new Error('Las Matriz no es cuadrada'); }
    let inc;

    const n1 = new Numero();
    const n2 = new Numero();

    for (let f1 = 0; f1 < this.#rowLength - 1; f1++) {
      for (let c1 = f1 + 1; c1 < this.#columnLength; c1++) {
        for (let f2 = f1; f2 < this.#rowLength - 1; f2++) {
          if (f1 === f2) {
            inc = c1 + 1;
          } else {
            inc = f2 + 1;
          }
          for (let c2 = inc; c2 < this.#columnLength; c2++) {
            n1.cargar(this.#matriz[f2][c2]);
            n2.cargar(this.#matriz[f1][c1]);
            if (
              (n1[method]() && !n2[method]()) ||
              (n1[method]() &&
                n2[method]() &&
                this.#matriz[f2][c2] < this.#matriz[f1][c1]) ||
              (!n1[method]() &&
                !n2[method]() &&
                this.#matriz[f2][c2] < this.#matriz[f1][c1])
            ) {
              this.intercambiar(f2, c2, f1, c1);
            }
          }
        }
      }
    }
  }

  // #intercalar
  /**
   * Intercala la triangular de acuerdo al metodo que le pasemos
   * @param {MethodsOfNumero} method metodo de la instancia Numero
   * @throws {Error} Si la matriz no es cuadrada
   * @returns {void}
   */
  intercalarTriangularInferiorIzquierda (method: MethodsOfNumero): void {
    this.#checarMethodsOfNumero(method);
    if (this.#columnLength !== this.#rowLength) { throw new Error('Las Matriz no es cuadrada'); }

    let inc;
    let bool = true;

    const n1 = new Numero();
    const n2 = new Numero();

    for (let f1 = 1; f1 < this.#rowLength; f1++) {
      for (let c1 = 0; c1 < f1; c1++) {
        if (bool) {
          for (let f2 = f1; f2 < this.#rowLength; f2++) {
            if (f1 === f2) {
              inc = c1 + 1;
            } else {
              inc = 0;
            }
            for (let c2 = inc; c2 < f2; c2++) {
              n1.cargar(this.#matriz[f2][c2]);
              n2.cargar(this.#matriz[f1][c1]);
              if (
                (n1[method]() && !n2[method]()) ||
                (n1[method]() &&
                  n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1]) ||
                (!n1[method]() &&
                  !n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1);
              }
            }
          }
        } else {
          for (let f2 = f1; f2 < this.#rowLength; f2++) {
            if (f1 === f2) {
              inc = c1 + 1;
            } else {
              inc = 0;
            }
            for (let c2 = inc; c2 < f2; c2++) {
              n1.cargar(this.#matriz[f2][c2]);
              n2.cargar(this.#matriz[f1][c1]);
              if (
                (!n1[method]() && n2[method]()) ||
                (!n1[method]() &&
                  !n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1]) ||
                (n1[method]() &&
                  n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1);
              }
            }
          }
          bool = !bool;
        }
      }
    }
  }

  /**
   * Intercala la triangular de acuerdo al metodo que le pasemos
   * @param {MethodsOfNumero} method metodo de la instancia Numero
   * @throws {Error} Si la matriz no es cuadrada
   * @returns {void}
   */
  intercalarTriangularInferiorDerecha (method: MethodsOfNumero): void {
    this.#checarMethodsOfNumero(method);
    if (this.#columnLength !== this.#rowLength) { throw new Error('Las Matriz no es cuadrada'); }

    let inc;
    let bool = true;

    const n1 = new Numero();
    const n2 = new Numero();

    for (let f1 = 1; f1 < this.#rowLength; f1++) {
      for (let c1 = this.#columnLength - f1; c1 < this.#columnLength; c1++) {
        if (bool) {
          for (let f2 = f1; f2 < this.#rowLength; f2++) {
            if (f1 === f2) {
              inc = c1 + 1;
            } else {
              inc = this.#columnLength - f2;
            }
            for (let c2 = inc; c2 < this.#columnLength; c2++) {
              n1.cargar(this.#matriz[f2][c2]);
              n2.cargar(this.#matriz[f1][c1]);
              if (
                (n1[method]() && !n2[method]()) ||
                (n1[method]() &&
                  n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1]) ||
                (!n1[method]() &&
                  !n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1);
              }
            }
          }
        } else {
          for (let f2 = f1; f2 < this.#rowLength; f2++) {
            if (f1 === f2) {
              inc = c1 + 1;
            } else {
              inc = this.#columnLength - f2;
            }
            for (let c2 = inc; c2 < this.#columnLength; c2++) {
              n1.cargar(this.#matriz[f2][c2]);
              n2.cargar(this.#matriz[f1][c1]);
              if (
                (!n1[method]() && n2[method]()) ||
                (!n1[method]() &&
                  !n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1]) ||
                (n1[method]() &&
                  n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1);
              }
            }
          }
        }
        bool = !bool;
      }
    }
  }

  /**
   * Intercala la triangular de acuerdo al metodo que le pasemos
   * @param {MethodsOfNumero} method metodo de la instancia Numero
   * @throws {Error} Si la matriz no es cuadrada
   * @returns {void}
   */
  intercalarTriangularSuperiorIzquierda (method: MethodsOfNumero): void {
    this.#checarMethodsOfNumero(method);
    if (this.#columnLength !== this.#rowLength) { throw new Error('Las Matriz no es cuadrada'); }

    let inc;
    let bool = true;

    const n1 = new Numero();
    const n2 = new Numero();

    for (let f1 = 0; f1 < this.#rowLength - 1; f1++) {
      for (let c1 = 0; c1 < this.#columnLength - f1 - 1; c1++) {
        if (bool) {
          for (let f2 = f1; f2 < this.#rowLength - 1; f2++) {
            if (f1 === f2) {
              inc = c1 + 1;
            } else {
              inc = 0;
            }
            for (let c2 = inc; c2 < this.#columnLength - f2 - 1; c2++) {
              n1.cargar(this.#matriz[f2][c2]);
              n2.cargar(this.#matriz[f1][c1]);
              if (
                (n1[method]() && !n2[method]()) ||
                (n1[method]() &&
                  n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1]) ||
                (!n1[method]() &&
                  !n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1);
              }
            }
          }
        } else {
          for (let f2 = f1; f2 < this.#rowLength - 1; f2++) {
            if (f1 === f2) {
              inc = c1 + 1;
            } else {
              inc = 0;
            }
            for (let c2 = inc; c2 < this.#columnLength - f2 - 1; c2++) {
              n1.cargar(this.#matriz[f2][c2]);
              n2.cargar(this.#matriz[f1][c1]);
              if (
                (!n1[method]() && n2[method]()) ||
                (!n1[method]() &&
                  !n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1]) ||
                (n1[method]() &&
                  n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1);
              }
            }
          }
        }
        bool = !bool;
      }
    }
  }

  /**
   * Intercala la triangular de acuerdo al metodo que le pasemos
   * @param {MethodsOfNumero} method metodo de la instancia Numero
   * @throws {Error} Si la matriz no es cuadrada
   * @returns {void}
   */
  intercalarTriangularSuperiorDerecha (method: MethodsOfNumero): void {
    this.#checarMethodsOfNumero(method);
    if (this.#columnLength !== this.#rowLength) { throw new Error('Las Matriz no es cuadrada'); }

    let inc;
    let bool = true;

    const n1 = new Numero();
    const n2 = new Numero();

    for (let f1 = 0; f1 < this.#rowLength - 1; f1++) {
      for (let c1 = f1 + 1; c1 < this.#columnLength; c1++) {
        if (bool) {
          for (let f2 = f1; f2 < this.#rowLength - 1; f2++) {
            if (f1 === f2) {
              inc = c1 + 1;
            } else {
              inc = f2 + 1;
            }
            for (let c2 = inc; c2 < this.#columnLength; c2++) {
              n1.cargar(this.#matriz[f2][c2]);
              n2.cargar(this.#matriz[f1][c1]);
              if (
                (n1[method]() && !n2[method]()) ||
                (n1[method]() &&
                  n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1]) ||
                (!n1[method]() &&
                  !n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1);
              }
            }
          }
        } else {
          for (let f2 = f1; f2 < this.#rowLength - 1; f2++) {
            if (f1 === f2) {
              inc = c1 + 1;
            } else {
              inc = f2 + 1;
            }
            for (let c2 = inc; c2 < this.#columnLength; c2++) {
              n1.cargar(this.#matriz[f2][c2]);
              n2.cargar(this.#matriz[f1][c1]);
              if (
                (!n1[method]() && n2[method]()) ||
                (!n1[method]() &&
                  !n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1]) ||
                (n1[method]() &&
                  n2[method]() &&
                  this.#matriz[f2][c2] < this.#matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1);
              }
            }
          }
        }
        bool = !bool;
      }
    }
  }

  // Ordenar por ultima columna
  /**
   * Intercambia dos filas reales
   * @param {number} f1 fila real 0 - fila
   * @param {number} f2 fila real 0 - fila
   * @returns {void}
   */
  intercambiarFilas (f1: number, f2: number): void {
    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      this.intercambiar(f1, c1, f2, c1);
    }
  }

  /**
   * 0rdena las filas tomando como referencia la ultima columna
   * @returns {void}
   */
  ordenarFilasPorUltimaColumna (): void {
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      for (let p = 0; p < this.#rowLength - 1; p++) {
        if (
          this.#matriz[p][this.#columnLength - 1] >
          this.#matriz[p + 1][this.#columnLength - 1]
        ) {
          this.intercambiarFilas(p, p + 1);
        }
      }
    }
  }

  // Ordenar por ultima fila
  /**
   * Intercambia dos columnas reales
   * @param {number} c1 columnas real 0 - columna
   * @param {number} c2 columnas real 0 - columna
   * @returns {void}
   */
  intercambiarColumnas (c1: number, c2: number): void {
    for (let f1 = 0; f1 < this.#rowLength; f1++) {
      this.intercambiar(f1, c1, f1, c2);
    }
  }

  /**
   * 0rdena las columnas tomando como referencia la ultima fila
   * @returns {void}
   */
  ordenarColumnasPorUltimaFila (): void {
    for (let c1 = 0; c1 < this.#columnLength; c1++) {
      for (let p = 0; p < this.#columnLength - 1; p++) {
        if (
          this.#matriz[this.#rowLength - 1][p] > this.#matriz[this.#rowLength - 1][p + 1]
        ) {
          this.intercambiarColumnas(p, p + 1);
        }
      }
    }
  }

  // #recursividad

  /**
   * Calcula el determinante de la matriz
   * @returns {number} El determinante de la matriz
   */
  determinante (): number {
    const main = (matrix: number[][]): number => {
      let det: number;
      const rows = matrix.length;
      const cols = matrix[0].length;
      if (rows === 1) {
        det = matrix[0][0];
      } else {
        det = 0;
        // Expandir por la primera fila (o cualquier fila/ columna)
        for (let j = 0; j < cols; j++) {
          // Calcular el cofactor matrix[0][j]
          const cofactor = matrix[0][j] * cofactorSign(0, j) * main(cofactorMatrix(matrix, 0, j));
          det += cofactor;
        }
      }
      return det;
    };

    // Función para calcular el signo del cofactor
    const cofactorSign = (row: number, col: number): number => {
      return Math.pow(-1, row + col);
    };

    // Función para obtener la matriz de cofactores eliminando la fila y columna específicas
    const cofactorMatrix = (matrix: number[][], row: number, col: number): number[][] => {
      const subMatrix: number[][] = [];
      const n = matrix.length;
      for (let i = 0; i < n; i++) {
        if (i !== row) {
          const newRow: number[] = [];
          for (let j = 0; j < n; j++) {
            if (j !== col) {
              newRow.push(matrix[i][j]);
            }
          }
          subMatrix.push(newRow);
        }
      }
      return subMatrix;
    };

    if (this.#rowLength !== this.#columnLength) {
      throw new Error('La matriz no es cuadrada');
    }

    return main(structuredClone(this.#matriz));
  }

  /**
   * Carga la matriz con la matriz de L's invertidas
   * @param numeroDeFilasYColumnas Es el numero de filas y columnas
   * @example
   * cargarL(5);
   *
   * 1  2  3  4  5
   * 2  2  3  4  5
   * 3  3  3  4  5
   * 4  4  4  4  5
   * 5  5  5  5  5
   */
  cargarL (numeroDeFilasYColumnas: number): void {
    const llenarL = (f: number, n: number): void => {
      if (n === 0) {
        // nada
      } else {
        this.#matriz[f] ??= [];
        this.#matriz[n - 1] ??= [];

        this.#matriz[f][n - 1] = f + 1;
        this.#matriz[n - 1][f] = f + 1;
        llenarL(f, n - 1);
      }
    };

    const cargar = (m: number): void => {
      if (m === 0) {
        // nada
      } else {
        cargar(m - 1);
        llenarL(m - 1, m);
      }
    };
    cargar(numeroDeFilasYColumnas);
    this.#rowLength = numeroDeFilasYColumnas;
    this.#columnLength = numeroDeFilasYColumnas;
  }

  /**
   * Carga la matriz Diana
   * @param numeroDeFilasYColumnas Es el numero de filas y columnas
   * @example
   * cargarDiana(5);
   *
   * 3  3  3  3  3
   * 3  2  2  2  3
   * 3  2  1  2  3
   * 3  2  2  2  3
   * 3  3  3  3  3
   */
  cargarDiana (numeroDeFilasYColumnas: number): void {
    const llenarAro = (fa: number, fb: number, a: number, n: number, z: number): void => {
      if (n === 0) {
        // nada
      } else {
        llenarAro(fa, fb, a, n - 1, z);
        this.#matriz[fb] ??= [];
        this.#matriz[n + a - 1] ??= [];
        this.#matriz[fa] ??= [];

        this.#matriz[fb][n + a - 1] = z;
        this.#matriz[n + a - 1][fb] = z;
        this.#matriz[fa][n + a - 1] = z;
        this.#matriz[n + a - 1][fa] = z;
      }
    };

    const cargar = (fa: number, fb: number): void => {
      const m = fb - fa + 1;
      if (m === 0) {
        // nada
      } else if (m === 1) {
        this.#matriz[fb] ??= [];

        this.#matriz[fb][fb] = 1;
      } else {
        cargar(fa + 1, fb - 1);
        llenarAro(fa, fb, fa, m, Math.floor((m + 1) / 2));
      }
    };
    cargar(0, numeroDeFilasYColumnas - 1);

    this.#rowLength = numeroDeFilasYColumnas;
    this.#columnLength = numeroDeFilasYColumnas;
  }

  /**
   * Carga cuadrado magico
   * @param numeroDeFilasYColumnas Es el numero de filas y columnas
   * @example
   * cargarCuadradoMagico(5);
   *
   * 17   24    1    8   15
   * 23    5    7   14   16
   *  4    6   13   20   22
   * 10   12   19   21   3
   * 11   18   25    2   9
   */
  cargarCuadradoMagico (numeroDeFilasYColumnas: number): void {
    let f: number, c: number;
    const cargar = (m: number, z: number): void => {
      if (z === 1) {
        f = 0;
        c = Math.floor(m / 2);
        this.#matriz[f] ??= [];

        this.#matriz[f][c] = 1;
      } else {
        cargar(m, z - 1);
        if ((z - 1) % m === 0) {
          // r2
          f++;
        } else {
          // r1
          c = (c + 1) % m;
          if (f === 0) {
            f = m - 1;
          } else {
            f--;
          }
        }
        this.#matriz[f] ??= [];
        this.#matriz[f][c] = z;
      }
    };
    if (numeroDeFilasYColumnas % 2 && (numeroDeFilasYColumnas ** 2) % 2 === 0) {
      throw new Error('La fila y la columna tienen que ser impares');
    }
    cargar(numeroDeFilasYColumnas, numeroDeFilasYColumnas * numeroDeFilasYColumnas);
    this.#rowLength = numeroDeFilasYColumnas;
    this.#columnLength = numeroDeFilasYColumnas;
  }

  /**
   * Carga matriz caracol
   * @param numeroDeFilasYColumnas Es el numero de filas y columnas
   * @example
   * cargarCaracol(5);
   *
   *  1   2   3   4  5
   * 16  17  18  19  6
   * 15  24  25  20  7
   * 14  23  22  21  8
   * 13  12  11  10  9
   */
  cargarCaracol (numeroDeFilasYColumnas: number): void {
    const arriba = (f: number, ca: number, cb: number): void => {
      if (ca < cb) {
        this.#matriz[f - 1] ??= [];

        this.#matriz[f - 1][ca - 1] = r;
        r++;
        arriba(f, ca + 1, cb);
      }
    };

    const derecha = (fa: number, fb: number, c: number): void => {
      if (fa < fb) {
        this.#matriz[fb - 1] ??= [];

        this.#matriz[fb - 1][c - 1] = r;
        r++;
        derecha(fa, fb - 1, c);
      }
    };

    const abajo = (f: number, ca: number, cb: number): void => {
      if (ca < cb) {
        this.#matriz[f - 1] ??= [];

        this.#matriz[f - 1][cb - 1] = r;
        r++;
        abajo(f, ca, cb - 1);
      }
    };

    const izquierda = (fa: number, fb: number, c: number): void => {
      if (fa < fb) {
        this.#matriz[fa - 1] ??= [];

        this.#matriz[fa - 1][c - 1] = r;
        r++;
        izquierda(fa + 1, fb, c);
      }
    };

    const cargar = (fa: number, fb: number, ca: number, cb: number): void => {
      if (fa <= fb && ca <= cb) {
        if (fa === fb && ca === cb) {
          this.#matriz[ca - 1] ??= [];

          this.#matriz[ca - 1][fa - 1] = r;
        } else {
          arriba(fa, ca, cb);
          izquierda(fa, fb, cb);
          abajo(fb, ca, cb);
          derecha(fa, fb, ca);
        }
        cargar(fa + 1, fb - 1, ca + 1, cb - 1);
      }
    };
    let r: number = 1;
    cargar(1, numeroDeFilasYColumnas, 1, numeroDeFilasYColumnas);
    this.#rowLength = numeroDeFilasYColumnas;
    this.#columnLength = numeroDeFilasYColumnas;
  }

  /**
   * Carga matriz Diagonales Secundarias
   * @param numeroDeFilasYColumnas Es el numero de filas y columnas
   * @example
   * cargarDiagonalesSecundarias(5);
   *
   *  1  2  3  4  5
   *  2  3  4  5  6
   *  3  4  5  6  7
   *  4  5  6  7  8
   *  5  6  7  8  9
   */
  cargarDiagonalesSecundarias (numeroDeFilasYColumnas: number): void {
    const llenarDiagonales = (ca: number, cb: number, f: number, r: number): void => {
      const n = cb - ca + 1;
      if (n === 0) {
        // nada
      } else if (ca === 0) {
        this.#matriz[f] ??= [];

        this.#matriz[f][ca] = r;
        llenarDiagonales(ca + 1, cb, f, r);
      } else {
        this.#matriz[f] ??= [];

        this.#matriz[f][ca] = this.#matriz[f][ca - 1] + 1;
        llenarDiagonales(ca + 1, cb, f, r);
      }
    };

    const cargar = (fa: number, fb: number): void => {
      const n = fb - fa + 1;
      if (n === 0) {
        // nada
      } else {
        llenarDiagonales(0, numeroDeFilasYColumnas - 1, fa, r);
        r++;
        cargar(fa + 1, fb);
      }
    };
    let r = 1;
    cargar(0, numeroDeFilasYColumnas - 1);
    this.#rowLength = numeroDeFilasYColumnas;
    this.#columnLength = numeroDeFilasYColumnas;
  }

  /**
   * Carga matriz DiagonalesUpBottomUp
   * @param numeroDeFilasYColumnas Es el numero de filas y columnas
   * @example
   * cargarDiagonalesSecundariasUpBottomUp(5);
   *
   *   1   3   6  10  15
   *   2   5   9  14  19
   *   4   8  13  18  22
   *   7  12  17  21  24
   *  11  16  20  23  25
   *
   * m = numeroDeFilasYColumnas
   * k = (m + 1) * m
   */
  cargarDiagonalesSecundariasUpBottomUp (numeroDeFilasYColumnas: number): void {
    const cargar = (m: number, k: number): void => {
      if (k === 1) {
        f = 0;
        c = 0;
      } else {
        cargar(m, k - 1);
        if (c === m - 1) {
          c = f + 1;
          f = m - 1;
        } else {
          if (f === 0) {
            f = c + 1;
            c = 0;
          } else {
            c++;
            f--;
          }
        }
      }
      this.#matriz[f] ??= [];

      this.#matriz[f][c] = k;
    };
    const m = numeroDeFilasYColumnas;
    const k = (m + 1) * m;
    let f: number, c: number;
    cargar(numeroDeFilasYColumnas, k);
    this.#rowLength = numeroDeFilasYColumnas;
    this.#columnLength = numeroDeFilasYColumnas;
  }

  /**
   * Carga matriz DiagonalesUpBottomUp
   * @param numeroDeFilasYColumnas Es el numero de filas y columnas
   * @example
   * cargarDiagonalesPrincipalesTriangularInferiorIzquierda(5);
   *
   *  1
   *  6   2
   * 10   7   3
   * 13  11   8  4
   * 15  14  12  9  5
   *
   * m = numeroDeFilasYColumnas
   * k = (m + 1) * m / 2
   */
  cargarDiagonalesPrincipalesTriangularInferiorIzquierda (
    numeroDeFilasYColumnas: number
  ): void {
    const cargar = (m: number, k: number): void => {
      if (k === 1) {
        f = 0;
        c = 0;
      } else {
        cargar(m, k - 1);
        if (f === m - 1) {
          f = m - c;
          c = 0;
        } else {
          f++;
          c++;
        }
      }
      this.#matriz[f] ??= [];
      this.#matriz[f][c] = k;
    };
    const m = numeroDeFilasYColumnas;
    const k = Math.floor(((m + 1) * m) / 2);
    let f: number, c: number;
    cargar(numeroDeFilasYColumnas, k);
    this.#rowLength = numeroDeFilasYColumnas;
    this.#columnLength = numeroDeFilasYColumnas;
  }
}

/**
 * Pending
 * ------
 * cargar diagonales principales ❌ (no tengo ejemplo)
 */
