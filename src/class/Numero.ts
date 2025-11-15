import { type MethodsOfNumero } from '../types/types';
import { methodsOfNumero } from '../types/methodsOfNumero';
/**
 * Clase que representa un número entero y proporciona métodos para manipularlo.
 */
export default class Numero {
  #numero = 0;
  /**
   * Carga un número en la instancia.
   * @param {number} number - número que se carga en la instancia.
   */
  cargar (number: number): void {
    this.#numero = number;
  }

  /**
   * Retorna el número en string
   * @returns {string}
   */
  descargar (): string {
    return this.#numero.toString();
  }

  /**
   * Retorna el número en string
   * @returns {string}
   */
  numero (): number {
    return this.#numero;
  }

  #checarDireccion (direccion: string): never | void {
    if (direccion !== 'asc' && direccion !== 'desc') { throw new Error("La dirección tiene que ser 'asc' o 'desc'"); }
  }

  #checarMethodsOfNumero (method: MethodsOfNumero): never | void {
    const index = methodsOfNumero.indexOf(method);
    if (index === -1) {
      throw new Error('El metodo no corresponse a una funcion de la clase Número');
    }
  }

  /**
   * invierte el número almacenado.
   */
  invertir (): void {
    let digito;
    let resultado = 0;
    let numero = this.#numero;
    while (numero > 0) {
      digito = numero % 10;
      resultado = resultado * 10 + digito;
      numero = Math.floor(numero / 10);
    }
    this.#numero = resultado;
  }

  /**
   * Retorna la longitud del número
   * @returns {number}
   */
  length (): number {
    return this.#numero.toString().length;
  }

  /**
   * Ordena el número
   * @param {'asc' | 'desc'}  direccion Direccion del ordenamiento
   * @returns {void | never}
   */
  ordenar (direccion: 'asc' | 'desc' = 'asc'): void {
    this.#checarDireccion(direccion);

    let aux;
    let response = 0;
    if (direccion === 'asc') {
      for (let count = 0; count < 10; count++) {
        aux = this.#numero;
        while (aux > 0) {
          const digit = aux % 10;
          if (digit === count) {
            response = response * 10 + digit;
          }
          aux = Math.floor(aux / 10);
        }
      }
    } else {
      for (let count = 9; count > 0; count--) {
        aux = this.#numero;
        while (aux > 0) {
          const digit = aux % 10;
          if (digit === count) {
            response = response * 10 + digit;
          }
          aux = Math.floor(aux / 10);
        }
      }
    }
    this.#numero = response;
  }

  /**
   * Verifica si el número es par
   * @returns {boolean}
   */
  esPar (): boolean {
    return this.#numero % 2 === 0;
  }

  /**
   * Verifica si el número es primo
   * @returns {boolean}
   */
  esPrimo (): boolean {
    for (let i = 2; i < this.#numero; i++) {
      if (this.#numero % i === 0) {
        return false;
      }
    }
    return this.#numero > 1;
  }

  /**
   * genera un número random entre un intervalo
   * @param MIN_VALUE MIN VALUE
   * @param MAX_VALUE MAX VALUE
   * @returns number random
   */
  static random (MIN_VALUE: number, MAX_VALUE: number): number {
    return Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;
  }

  /**
   * Verifica si el número es capicua
   * @returns {boolean}
   */
  esCapicua (): boolean {
    const copia = this.#numero;
    this.invertir();
    return copia === this.#numero;
  }

  /**
   * Verifica si el número es cuadrado perfecto
   * @returns {boolean}
   */
  esCuadradoPerfecto (): boolean {
    const raizCuadrada = Math.floor(Math.sqrt(this.#numero));
    return raizCuadrada * raizCuadrada === this.#numero;
  }

  /**
   * Verifica si el número es fibonacci
   * @returns {boolean}
   */
  esFibonacci (): boolean {
    const copia1 = new Numero();
    const copia2 = new Numero();
    copia1.cargar(5 * this.#numero * this.#numero + 4);
    copia2.cargar(5 * this.#numero * this.#numero - 4);
    return copia1.esCuadradoPerfecto() || copia2.esCuadradoPerfecto();
  }

  /**
   * Retorna la cuenta regresiva de un número
   * @returns {number} El número de forma regresiva
   * @example
   * n1.retornarCuentaRegresiva(5) // 54321
   */
  cuentaRegresiva (): number {
    let numero = this.#numero;
    let resultado = 0;
    while (numero > 0) {
      resultado = resultado * 10 + numero;
      numero = numero - 1;
    }
    return resultado;
  }

  /**
   * Repite los digitos de un número la cantidad de veces que vale el número
   * @example
   * 524 -> 55555224444
   */
  repetirDigitos (): void {
    const repetirDigito = (x: number): number => {
      let copia = x;
      let resultado = 0;
      while (copia > 0) {
        resultado = resultado * 10 + x;
        copia = copia - 1;
      }
      return resultado;
    };
    let copia = this.#numero;
    let resultado = '';
    while (copia > 0) {
      const digit = copia % 10;
      resultado = repetirDigito(digit) + resultado;
      copia = Math.floor(copia / 10);
    }
    this.#numero = Number(resultado);
  }

  /**
   * Calcula el factorial de un número
   * @returns {number} El factorial del número
   */
  factorial (): number {
    if (this.#numero < 0) throw new Error('No existe el factorial de números negativos');
    let resultado = 1;
    if (this.#numero === 0 || this.#numero === 1) {
      return resultado;
    }
    for (let i = 2; i <= this.#numero; i++) {
      resultado = i * resultado;
    }
    return resultado;
  }

  /**
   * Elimina los digitos que le indiques de acuerdo a un metodo
   * @param {MethodsOfNumero} method metodo de la clase número
   * @param {boolean} is valor booleano
   */
  eliminarDigitosMetodos (method: MethodsOfNumero, is: boolean = true): void {
    this.#checarMethodsOfNumero(method);
    const n1 = new Numero();
    let resultado = 0;
    while (this.#numero > 0) {
      const digit = this.#numero % 10;
      this.#numero = Math.floor(this.#numero / 10);
      n1.cargar(digit);
      if (is ? n1[method]() : !n1[method]()) {
        resultado = resultado * 10 + digit;
      }
    }

    this.#numero = Number(resultado.toString().split('').reverse().join(''));
  }

  /**
   * Encuentra el mayor y menor digito.
   * @return {{mayor: number, menor: number}}
   */
  encontrarMayorYMenorDigito (): { mayor: number, menor: number } {
    const resultado = {
      mayor: this.#numero % 10,
      menor: this.#numero % 10
    };
    let copia = this.#numero;
    while (copia > 0) {
      const ultimoDigito = copia % 10;
      if (resultado.menor > ultimoDigito) {
        resultado.menor = ultimoDigito;
      }
      if (resultado.mayor < ultimoDigito) {
        resultado.mayor = ultimoDigito;
      }
      copia = Math.floor(copia / 10);
    }
    return resultado;
  }

  static readonly #digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  /**
   * Convierte el decimal a base N
   * @param {number} numero numero en decimal
   * @param {number} base base N a convertir
   * @return {string}
   */
  static decimalABaseN (numero: number, base: number): string {
    if (base < 1 || base > this.#digits.length) throw new Error(`La base tiene que estar entre 1 y ${this.#digits.length}`);
    else if (base === 1) {
      let resultado = '';
      while (numero > 0) {
        resultado = resultado + base;
        numero--;
      }
      return resultado;
    } else if (numero === 0) return '0';
    else {
      const result: string [] = [];
      while (numero > 0) {
        result.push(this.#digits[numero % base]);
        numero = Math.floor(numero / base);
      }
      return result.reverse().join('');
    }
  }

  /**
   * Convierte el numero en base N a decimal
   * @param {number} numero numero en decimal
   * @param {number} base base N a convertir
   * @return {string}
   */
  static baseNADecimal (numero: string, base: number): number {
    if (base < 1 || base > this.#digits.length) throw new Error(`La base tiene que estar entre 1 y ${this.#digits.length}`);
    else if (base === 1) {
      return numero.length;
    } else {
      numero = numero.toUpperCase();
      let decimal = 0;

      for (let i = 0; i < numero.length; i++) {
        const digit = numero[i];
        const digitValue = this.#digits.indexOf(digit);
        decimal = decimal * base + digitValue;
      }
      return decimal;
    }
  }
}

// pending
// ------------
// insertarDigitoPorPosicion
// remplazarDigitoPorPosicion
