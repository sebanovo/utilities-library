/**
 * @module Cadena
 */

/**
 * Clase que representa un vector y proporciona diversas operaciones y manipulaciones.
 */
export default class Cadena {
  s: string = ''
  /**
   *
   * @param {string} cadena - Cadena a cargar
   */
  cargar (cadena: string): void {
    this.s = cadena
  }

  esVocal (): boolean {
    const vocales = 'aeiouáéíóúäëïöüAEIOUÁÉÍÓÚÄËÏÖÜ' // Todas las vocales
    return vocales.includes(this.s)
  }

  esLetra (): boolean {
    const letras =
    'qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNMáéíóúÁÉÍÓÚäëïöüÄËÏÖÜ' // todas las letras
    return letras.includes(this.s)
  }

  contarEspacios (): number {
    // nose
    let count = 0
    for (let i = 0; i < this.s.length; i++) {
      if (this.s[i] === ' ') {
        count++
      }
    }
    return count
  }

  contarVocales (): number {
    let count = 0
    const n1 = new Cadena()
    for (let i = 0; i < this.s.length; i++) {
      n1.cargar(this.s[i])
      if (n1.esVocal()) {
        count++
      }
    }
    return count
  }

  contarLetras (): number {
    let count = 0
    const n1 = new Cadena()
    for (let i = 0; i < this.s.length; i++) {
      n1.cargar(this.s[i])
      if (n1.esLetra()) {
        count++
      }
    }
    return count
  }

  invertir (): void {
    const arr = this.s.split('')
    let final = this.s.length
    let inicio = 0
    while (inicio < final) {
      const temp = arr[inicio]
      arr[inicio] = arr[final]
      arr[final] = temp
      inicio++
      final--
    }
    this.s = arr.join('')
  }
}
