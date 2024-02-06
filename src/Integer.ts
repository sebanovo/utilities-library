/**
 * @module Integer
 */

/**
 * Clase que representa un número entero y proporciona métodos para manipularlo.
 */
export default class Integer {
  #number = 0
  /**
   * Carga un número en la instancia.
   * @param {number} numero - número que se carga en la instancia.
   */
  cargar (numero: number): void {
    this.#number = numero
  }

  /**
   * Retorna el número
   * @returns {number}
   */
  descargar (): number {
    return this.#number
  }

  /**
   * invierte el número almacenado.
   */
  invertir (): void {
    let digito
    let resultado = 0
    let numero = this.#number
    while (numero > 0) {
      digito = numero % 10
      resultado = resultado * 10 + digito
      numero = Math.floor(numero / 10)
    }
    this.#number = resultado
  }

  /**
   * Retorna la longitud del número
   * @returns {number}
   */
  retornarLongitud (): number {
    return this.#number.toString().length
  }

  /**
   * Verifica si el número es par
   * @returns {boolean}
   */
  verificarPar (): boolean {
    return this.#number % 2 === 0
  }

  /**
   * Verifica si el número es primo
   * @returns {boolean}
   */
  verificarPrimo (): boolean {
    for (let i = 2; i < this.#number; i++) {
      if (this.#number % i === 0) {
        return false
      }
    }
    return this.#number > 1
  }

  /**
   * Verifica si el número es capicua
   * @returns {boolean}
   */
  verificarCapicua (): boolean {
    const copia = this.#number
    this.invertir()
    return copia === this.#number
  }

  /**
   * Verifica si el número es cuadrado perfecto
   * @returns {boolean}
   */
  verificarCuadradoPerfecto (num: number): boolean {
    const raizCua = Math.floor(Math.sqrt(num))
    return raizCua * raizCua === num
  }

  /**
   * Verifica si el número es fibonacci
   * @returns {boolean}
   */
  verificarFibonacci (): boolean {
    return (
      this.verificarCuadradoPerfecto(5 * this.#number * this.#number + 4) ||
      this.verificarCuadradoPerfecto(5 * this.#number * this.#number - 4)
    )
  }
}
