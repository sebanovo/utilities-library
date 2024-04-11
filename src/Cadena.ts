/**
 * @module Cadena
 */

/**
 * Clase que representa un vector y proporciona diversas operaciones y manipulaciones.
 */
export default class Cadena extends String {
  cadena: string = ''
  /**
   *
   * @param {string} cadena - Cadena a cargar
   */
  cargar (cadena: string): void {
    this.cadena = cadena
  }

  descargar (): this {
    return this
  }

  esVocal (): boolean {
    const vocales = 'aeiouáéíóúäëïöüAEIOUÁÉÍÓÚÄËÏÖÜ' // Todas las vocales
    return vocales.includes(this.cadena)
  }

  esLetra (): boolean {
    const letras =
    'qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNMáéíóúÁÉÍÓÚäëïöüÄËÏÖÜ' // todas las letras
    return letras.includes(this.cadena)
  }

  contarEspacios (): number {
    // nose
    let count = 0
    for (let i = 0; i < this.cadena.length; i++) {
      if (this.cadena[i] === ' ') {
        count++
      }
    }
    return count
  }

  contarVocales (): number {
    let count = 0
    const n1 = new Cadena()
    for (let i = 0; i < this.cadena.length; i++) {
      n1.cargar(this.cadena[i])
      if (n1.esVocal()) {
        count++
      }
    }
    return count
  }

  contarLetras (): number {
    let count = 0
    const n1 = new Cadena()
    for (let i = 0; i < this.cadena.length; i++) {
      n1.cargar(this.cadena[i])
      if (n1.esLetra()) {
        count++
      }
    }
    return count
  }

  invertir (): void {
    const arr = this.cadena.split('')
    let final = this.cadena.length
    let inicio = 0
    while (inicio < final) {
      const temp = arr[inicio]
      arr[inicio] = arr[final]
      arr[final] = temp
      inicio++
      final--
    }
    this.cadena = arr.join('')
  }
}
