/**
 * @module Cadena
 */

/**
 * Clase que representa un vector y proporciona diversas operaciones y manipulaciones.
 */
export default class Cadena {
  #cadena: string = ''
  /**
   *
   * @param {string} cadena - Cadena a cargar
   */
  cargar (cadena: string): void {
    this.#cadena = cadena
  }

  /**
   * Retorna la cadena
   * @returns {string}
   */
  descargar (): string {
    return this.#cadena
  }

  /**
   * Retorna la cadena
   * @returns {string}
   */
  cadena (): string {
    return this.#cadena
  }

  #checarRango (posicion: number): never | void {
    if (posicion < 0 || posicion > this.#cadena.length) { throw new Error('El parametro esta fuera de los límites') }
  }

  /**
   * Verifica si un caracter es una Vocal
   * @param {char} char caracter
   * @returns {boolean}
   */
  static esVocal (char: string): boolean {
    const vocales = 'aeiouáéíóúäëïöüAEIOUÁÉÍÓÚÄËÏÖÜ' // Todas las vocales
    return vocales.includes(char)
  }

  /**
   * Verifica si un caracter es una letra
   * @param {char} char caracter
   * @returns {boolean}
   */
  static esLetra (char: string): boolean {
    const letras =
      'qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNMáéíóúÁÉÍÓÚäëïöüÄËÏÖÜ' // todas las letras
    return letras.includes(char)
  }

  static esEspacio (char: string): boolean {
    return char === ' '
  }

  /**
   * Verifica si un caracter es digito
   * @param {char} char caracter
   * @returns {boolean}
   */
  static esDigito (char: string): boolean {
    return Boolean(Number(char))
  }

  /**
   * Verifica si una cadena es palindromo
   * @returns { boolean}
   */
  esPalindromo (): boolean {
    const inv = this.#cadena.split('').reverse().join('')
    return inv === this.#cadena
  }

  /**
   * Cuenta la cantidad de caracteres en la cadena
   * @param char caracter
   * @returns {number} El número de caracteres
   */
  contarCaracter (char: string): number {
    let count = 0
    for (let i = 0; i < this.#cadena.length; i++) {
      if (this.#cadena[i] === char) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta la cantidad de vocales en la cadena
   * @returns {number}
   */
  contarVocales (): number {
    let count = 0
    for (let i = 0; i < this.#cadena.length; i++) {
      if (Cadena.esVocal(this.#cadena[i])) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta la cantidad de letras en la cadena
   * @returns {number}
   */
  contarLetras (): number {
    let count = 0
    for (let i = 0; i < this.#cadena.length; i++) {
      if (Cadena.esLetra(this.#cadena[i])) {
        count++
      }
    }
    return count
  }

  /**
   * Invierte la cadena
   */
  invertir (): void {
    this.#cadena = this.#cadena.split('').reverse().join('')
  }

  /**
   * Elimina los caracteres de la cadena
   * @param char caracter
   */
  eliminarCaracter (char: string): void {
    let aux = ''
    for (let i = 0; i < this.#cadena.length; i++) {
      if (this.#cadena[i] !== char) {
        aux = aux + this.#cadena[i]
      }
    }
    this.#cadena = aux
  }

  /**
   * Elimina las vocales de la cadena
   */
  eliminarVocales (): void {
    let aux = ''
    for (let i = 0; i < this.#cadena.length; i++) {
      if (!Cadena.esVocal(this.#cadena[i])) {
        aux = aux + this.#cadena[i]
      }
    }
    this.#cadena = aux
  }

  /**
   * Elimina las letras de la cadena
   */
  eliminarLetras (): void {
    let aux = ''
    for (let i = 0; i < this.#cadena.length; i++) {
      if (!Cadena.esLetra(this.#cadena[i])) {
        aux = aux + this.#cadena[i]
      }
    }
    this.#cadena = aux
  }

  /**
   * Elimina los números de la cadena
   */
  eliminarNumeros (): void {
    let aux = ''
    for (let i = 0; i < this.#cadena.length; i++) {
      if (!Cadena.esDigito(this.#cadena[i])) {
        aux = aux + this.#cadena[i]
      }
    }
    this.#cadena = aux
  }

  /**
   * Retorna la primer palabra
   * @returns {string}
   */
  primerPalabra (): string {
    let palabra = ''
    for (let i = 0; i < this.#cadena.length; i++) {
      const anterior = this.#cadena[i]
      const posterior = this.#cadena[i + 1]
      if (!Cadena.esEspacio(anterior) && !Cadena.esEspacio(posterior)) {
        palabra = palabra + anterior
      } else if (!Cadena.esEspacio(anterior) && Cadena.esEspacio(posterior)) {
        palabra = palabra + anterior
        break
      } else if (Cadena.esEspacio(anterior) && !Cadena.esEspacio(posterior)) {
        palabra = palabra + anterior
      } else if (Cadena.esEspacio(anterior) && Cadena.esEspacio(posterior)) {
        // nada
      }
    }

    return palabra.trimStart()
  }

  posicionPrimerPalabra (): { start: number | -1, end: number | -1 } {
    const primerPalabra = this.primerPalabra()
    const posicion = { start: -1, end: -1 }
    for (let i = 0; i < this.#cadena.length; i++) {
      if (!Cadena.esEspacio(this.#cadena[i])) {
        posicion.start = i
        posicion.end = i + primerPalabra.length - 1
        break
      }
    }
    return posicion
  }

  /**
   * Elimina la primer palabra
   */
  eliminarPrimerPalabra (): void {
    const { start, end } = this.posicionPrimerPalabra()
    if (start < 0 || end < 0) return

    let aux = ''
    for (let i = 0; i < this.#cadena.length; i++) {
      if (i < start || i > end) {
        aux = aux + this.#cadena[i]
      }
    }
    this.#cadena = aux
  }

  /**
   *
   * Elimina hasta primer palabra
   * ```js
   *  x = "hola a todos" => " a todos"
   *  x = "123hola a todos" => " a todos"
   * ```
   */
  eliminarHastaPrimerPalabra (): void {
    const { end } = this.posicionPrimerPalabra()
    this.#cadena = this.#cadena.substring(end + 1, this.#cadena.length)
  }

  /**
   * Cuenta la cantidad de palabras
   * @returns {number}
   */
  contarPalabras (): number {
    let count = 0
    for (let i = 0; i < this.#cadena.length; i++) {
      const anterior = this.#cadena[i]
      const posterior = this.#cadena[i + 1]
      if (
        !Cadena.esEspacio(anterior) &&
        (Cadena.esEspacio(posterior) || posterior == null)
      ) {
        count++
      }
    }
    return count
  }

  /**
   * Retorna la palabra más larga
   * @returns {string}
   */
  palabraMasLarga (): string {
    const aux = new Cadena()
    aux.cargar(this.#cadena)
    let masLarga = aux.primerPalabra()
    const totalPalabras = aux.contarPalabras()
    for (let i = 0; i < totalPalabras; i++) {
      const primerPalabra = aux.primerPalabra()
      if (masLarga.length < primerPalabra.length) {
        masLarga = primerPalabra
      }
      aux.eliminarPrimerPalabra()
    }
    return masLarga
  }

  /**
   * Retorna la palabra menos larga
   * @returns {string}
   */
  palabraMenosLarga (): string {
    const aux = new Cadena()
    aux.cargar(this.#cadena)
    let menosLarga = aux.primerPalabra()
    const totalPalabras = aux.contarPalabras()
    for (let i = 0; i < totalPalabras; i++) {
      const primerPalabra = aux.primerPalabra()
      if (menosLarga.length > primerPalabra.length) {
        menosLarga = primerPalabra
      }
      aux.eliminarPrimerPalabra()
    }
    return menosLarga
  }

  /**
   * Elimina la primera letra de cada palabra
   */
  eliminarPrimerLetraDeCadaPalabra (): void {
    let aux = ''
    for (let i = 0; i < this.#cadena.length; i++) {
      const anterior = this.#cadena[i]
      const posterior = this.#cadena[i + 1]
      if (!Cadena.esEspacio(anterior) && !Cadena.esEspacio(posterior)) {
        if (posterior != null) {
          aux = aux + posterior
        }
      } else if (!Cadena.esEspacio(anterior) && Cadena.esEspacio(posterior)) {
        aux = aux + posterior
      } else if (Cadena.esEspacio(anterior) && !Cadena.esEspacio(posterior)) {
        // nada
      } else if (Cadena.esEspacio(anterior) && Cadena.esEspacio(posterior)) {
        aux = aux + posterior
      }
    }
    this.#cadena = aux
  }

  /**
   * Elimina la última letra de cada palabra
   */
  eliminarUltimaLetraDeCadaPalabra (): void {
    let aux = ''
    for (let i = 0; i < this.#cadena.length; i++) {
      const anterior = this.#cadena[i]
      const posterior = this.#cadena[i + 1]
      if (!Cadena.esEspacio(anterior) && !Cadena.esEspacio(posterior)) {
        if (posterior != null) {
          aux = aux + anterior
        }
      } else if (!Cadena.esEspacio(anterior) && Cadena.esEspacio(posterior)) {
        // nada
      } else if (Cadena.esEspacio(anterior) && !Cadena.esEspacio(posterior)) {
        aux = aux + anterior
      } else if (Cadena.esEspacio(anterior) && Cadena.esEspacio(posterior)) {
        aux = aux + anterior
      }
    }
    this.#cadena = aux
  }

  eliminarPrimeraYUltimaLetraDeCadaPalabra (): void {
    this.eliminarPrimerLetraDeCadaPalabra()
    this.eliminarUltimaLetraDeCadaPalabra()
  }

  /**
   * Elimina la cadena
   * @param {number} inicio valor inicial
   * @param {number} arrastre valor de arrastre
   */
  eliminar (inicio: number = 0, arrastre: number = this.#cadena.length - 1): void {
    if (inicio < 0 || inicio >= this.#cadena.length) { throw new Error('El inicio tiene que ser mayor a 0') }
    if (arrastre < 1) throw new Error('El arrastre no tiene que ser mayor que 0')
    if (inicio + arrastre > this.#cadena.length) {
      arrastre = this.#cadena.length - 1
    }
    let aux = ''
    for (let i = 0; i < this.#cadena.length; i++) {
      if (i < inicio || i >= inicio + arrastre) {
        aux = aux + this.#cadena[i]
      }
    }
    this.#cadena = aux
  }

  /**
   * Inserta una cadena en una posicion
   * @param {string} cadena cadena a insertar
   * @param {number} posicion posicion a insertar
   */
  insertar (cadena: string, posicion: number): void {
    this.#checarRango(posicion)
    const copy = this.#cadena.split('')
    const length = copy.length
    for (let i = length - 1; i > -1; i--) {
      if (i >= posicion) {
        copy[i + 1] = copy[i]
      } else {
        break
      }
    }
    copy[posicion] = cadena
    this.#cadena = copy.join('')
  }

  /**
   * Remplaza un caracter por una cadena en una posicion
   * @param {string} cadena cadena a insertar
   * @param {number} posicion posicion a insertar
   */
  remplazar (cadena: string, posicion: number): void {
    this.#checarRango(posicion)
    const copy = this.#cadena.split('')
    const length = copy.length
    for (let i = 0; i < length; i++) {
      if (i === posicion) {
        copy[i] = cadena
      }
    }
    this.#cadena = copy.join('')
  }

  invertirCadaPalabra (): void {
    const copy = this.#cadena.split(' ')
    const n1 = new Cadena()
    for (let i = 0; i < copy.length; i++) {
      n1.cargar(copy[i])
      n1.invertir()
      copy[i] = n1.descargar()
    }
    this.#cadena = copy.join(' ')
  }

  invertirFrase (): void {
    this.#cadena = this.#cadena.split(' ').reverse().join(' ')
  }
}

/**
 * Pending
 * --------
 * Eliminar Desde primer palabra ❌ (ni idea men)
 */
