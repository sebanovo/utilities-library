/**
 * @module Numero
 */

/**
 * Clase que representa un número entero y proporciona métodos para manipularlo.
 */
export default class Numero {
  numero = 0
  /**
   * Carga un número en la instancia.
   * @param {number} numero - número que se carga en la instancia.
   */
  cargar (number: number): void {
    this.numero = number
  }

  /**
   * Retorna el número
   * @returns {number}
   */
  descargar (): number {
    return this.numero
  }

  /**
   * invierte el número almacenado.
   */
  invertir (): void {
    let digito
    let resultado = 0
    let numero = this.numero
    while (numero > 0) {
      digito = numero % 10
      resultado = resultado * 10 + digito
      numero = Math.floor(numero / 10)
    }
    this.numero = resultado
  }

  /**
   * Retorna la longitud del número
   * @returns {number}
   */
  length (): number {
    return this.numero.toString().length
  }

  /**
   * Ordena el número
   * @param {'asc' | 'desc'}  direcction Direccion del ordenamiento
   * @returns {void | never}
   */
  ordenar (direcction: 'asc' | 'desc' = 'asc'): void {
    if (direcction !== 'asc' && direcction !== 'desc') throw new Error("La direccion tiene que ser 'asc' o 'desc'")
    let aux
    let response = 0
    if (direcction === 'asc') {
      for (let count = 0; count < 10; count++) {
        aux = this.numero
        while (aux > 0) {
          const digit = aux % 10
          if (digit === count) {
            response = (response * 10) + digit
          }
          aux = Math.floor(aux / 10)
        }
      }
    } else {
      for (let count = 9; count > 0; count--) {
        aux = this.numero
        while (aux > 0) {
          const digit = aux % 10
          if (digit === count) {
            response = (response * 10) + digit
          }
          aux = Math.floor(aux / 10)
        }
      }
    }
    this.numero = response
  }

  /**
   * Verifica si el número es par
   * @returns {boolean}
   */
  esPar (): boolean {
    return this.numero % 2 === 0
  }

  /**
   * Verifica si el número es primo
   * @returns {boolean}
   */
  esPrimo (): boolean {
    for (let i = 2; i < this.numero; i++) {
      if (this.numero % i === 0) {
        return false
      }
    }
    return this.numero > 1
  }

  /**
   * Verifica si el número es capicua
   * @returns {boolean}
   */
  esCapicua (): boolean {
    const copia = this.numero
    this.invertir()
    return copia === this.numero
  }

  /**
   * Verifica si el número es cuadrado perfecto
   * @returns {boolean}
   */
  esCuadradoPerfecto (): boolean {
    const raizCuadrada = Math.floor(Math.sqrt(this.numero))
    return raizCuadrada * raizCuadrada === this.numero
  }

  /**
   * Verifica si el número es fibonacci
   * @returns {boolean}
   */
  esFibonacci (): boolean {
    const copia1 = new Numero()
    const copia2 = new Numero()
    copia1.cargar(5 * this.numero * this.numero + 4)
    copia2.cargar(5 * this.numero * this.numero - 4)
    return copia1.esCuadradoPerfecto() || copia2.esCuadradoPerfecto()
  }
}

export type MethodsOfNumero = 'esPar' | 'esPrimo' | 'esCapicua' | 'esCuadradoPerfecto' | 'esFibonacci'

export const methodsOfNumero: MethodsOfNumero[] = ['esPar', 'esPrimo', 'esCapicua', 'esCuadradoPerfecto', 'esFibonacci']
