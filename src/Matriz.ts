import Numero, { type MethodsOfNumero } from './Numero'
/**
 * @module Matriz
 */
/**
 * Clase Matriz para trabajar con matrices
 */
export default class Matriz {
  rowLength: number = 0
  columnLength: number = 0
  matriz: number[][] = []
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
      throw new Error('Ingrese los parametros en cargar')
    }

    this.rowLength = nf
    this.columnLength = nc

    for (let f1 = 0; f1 < this.rowLength; f1++) {
      if (!this.matriz[f1]) {
        this.matriz[f1] = []
      }
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        this.matriz[f1][c1] = Math.floor(Math.random() * (b - a + 1) + a)
      }
    }
  }

  /**
   * Metodo que retorna la matriz en formato especial de cadena
   * @returns {string}
   */
  descargar (): string {
    let s = ''
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        s = s + this.matriz[f1][c1] + '\t'
      }
      s = s + '\n'
    }
    return s
  }

  /**
   * retorna un objeto con la fila y la columna
   * @returns {object}
   */
  retornarDimension (): object {
    return {
      fila: this.rowLength,
      columna: this.columnLength
    }
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
      throw new Error('Ingrese los parametros en cargar')
    }

    this.rowLength = nf
    this.columnLength = nc

    let n = 1
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      if (!this.matriz[f1]) {
        this.matriz[f1] = []
      }
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        this.matriz[f1][c1] = a1 + (n - 1) * r
        n++
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
      throw new Error('Ingrese los parametros en cargar')
    }

    this.rowLength = nf
    this.columnLength = nc

    let n = 1

    for (let f1 = 0; f1 < this.rowLength; f1++) {
      if (!this.matriz[f1]) {
        this.matriz[f1] = []
      }
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        this.matriz[f1][c1] = a1 * Math.round(Math.pow(r, n - 1))
        n++
      }
    }
  }

  /**
   * Busca si un número pertenece a la Matriz
   * @param {number} num numero a buscar
   * @returns {boolean}
   */
  pertenencia (num: number): boolean {
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        if (this.matriz[f1][c1] === num) {
          return true
        }
      }
    }
    return false
  }

  /**
   * Verifica si un número es mayor a los elementos de la matriz
   * @param {number} num numero a comparar
   * @returns {boolean}
   */
  verificarMayorA (num: number): boolean {
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        if (this.matriz[f1][c1] < num) {
          return false
        }
      }
    }
    return true
  }

  /**
   * Verifica si un número es menor a los elementos de la matriz
   * @param {number} num numero a comparar
   * @returns {boolean}
   */
  verificarMenorA (num: number): boolean {
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        if (this.matriz[f1][c1] > num) {
          return false
        }
      }
    }
    return true
  }

  /**
   * Verifica si la matriz esta ordenada
   * @returns {boolean}
   */
  verificarOrdenado (): boolean {
    let control = this.matriz[0][0]

    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        if (this.matriz[f1][c1] < control) {
          return false
        }
        control = this.matriz[f1][c1]
      }
    }
    return true
  }

  /**
   * Verifica si la matriz esta ordenada respecto a una razón
   * @param {number} r la razón
   * @returns {boolean}
   */
  verificarOrdenadoRazon (r: number): boolean {
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < this.columnLength - 1; c1++) {
        if (this.matriz[f1][c1] + r !== this.matriz[f1][c1 + 1]) {
          return false
        }
      }
    }
    return true
  }

  /**
   * Verifica si todos los elementos de la matriz son iguales
   * @returns {boolean}
   */
  verificarTodosIguales (): boolean {
    const first: number = this.matriz[0][0]
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        if (first !== this.matriz[f1][c1]) {
          return false
        }
      }
    }
    return true
  }

  /**
   * Verifica si todos los elementos de la matriz son diferentes
   * @returns {boolean}
   */
  verificarTodosDiferentes (): boolean {
    const set = new Set()
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        const numero = this.matriz[f1][c1]

        if (set.has(numero)) {
          return false
        }
        set.add(numero)
      }
    }
    return true
  }

  /**
   * Suma dos matrices
   * @param {Matriz} m1 objeto de la clase matriz
   * @param {Matriz} m2 objeto de la clase matriz
   * @returns {void}
   */
  suma (m1: Matriz, m2: Matriz): void {
    if (m1.rowLength !== m2.rowLength || m1.columnLength !== m2.columnLength) {
      throw new Error('No se pueden sumar matrices de dimensiones diferentes')
    }
    this.rowLength = m1.rowLength
    this.columnLength = m1.columnLength

    for (let f1 = 0; f1 < this.rowLength; f1++) {
      if (!this.matriz[f1]) {
        this.matriz[f1] = []
      }
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        this.matriz[f1][c1] = m1.matriz[f1][c1] + m2.matriz[f1][c1]
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
    if (m1.rowLength !== m2.rowLength || m1.columnLength !== m2.columnLength) {
      throw new Error('No se pueden sumar matrices de dimensiones diferentes')
    }
    this.rowLength = m1.rowLength
    this.columnLength = m1.columnLength

    for (let f1 = 0; f1 < this.rowLength; f1++) {
      if (!this.matriz[f1]) {
        this.matriz[f1] = []
      }
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        this.matriz[f1][c1] = m1.matriz[f1][c1] - m2.matriz[f1][c1]
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
    if (m1.columnLength !== m2.rowLength) {
      throw new Error(
        'La columna de la primera matriz debe ser igual que la fila de la segunda matriz'
      )
    }

    this.rowLength = m1.rowLength
    this.columnLength = m2.columnLength

    let suma
    const n = m1.columnLength

    for (let f1 = 0; f1 < this.rowLength; f1++) {
      if (!this.matriz[f1]) {
        this.matriz[f1] = []
      }
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        suma = 0
        for (let k = 0; k < n; k++) {
          suma = suma + m1.matriz[f1][k] * m2.matriz[k][c1]
        }
        this.matriz[f1][c1] = suma
      }
    }
  }

  /**
   * Multiplica la matriz por un escalar
   * @param {number} escalar número real
   * @returns {void}
   */
  multiplicacionPorEscalar (escalar: number): void {
    if (this.rowLength === 0 || this.columnLength === 0) return

    for (let f1 = 1; f1 < this.rowLength; f1++) {
      if (!this.matriz[f1]) {
        this.matriz[f1] = []
      }
      for (let c1 = 1; c1 < this.columnLength; c1++) {
        this.matriz[f1][c1] = escalar * this.matriz[f1][c1]
      }
    }
  }

  /**
   *  Trasnposicion de matrices
   */
  transposicion (): void {
    const m1 = new Matriz()
    for (let f1 = 0; f1 < this.columnLength; f1++) {
      if (!m1.matriz[f1]) {
        m1.matriz[f1] = []
      }
      for (let c1 = 0; c1 < this.rowLength; c1++) {
        m1.matriz[f1][c1] = this.matriz[c1][f1]
      }
    }
    const temp = this.rowLength
    this.rowLength = this.columnLength
    this.columnLength = temp
    this.matriz = m1.matriz // Actualizar la matriz original con la transpuesta
  }

  /**
   * Intercambia dos elementos de la matriz
   * @param {number} f1 fila 1
   * @param {number} c1 columna 1
   * @param {number} f2 fila 2
   * @param {number} c2 columna 2
   */
  intercambiar (f1: number, c1: number, f2: number, c2: number): void {
    const temp = this.matriz[f1][c1]
    this.matriz[f1][c1] = this.matriz[f2][c2]
    this.matriz[f2][c2] = temp
  }

  /**
   * Retorna el número mayor de la matriz
   * @returns {number}
   */
  devolverMayor (): number {
    let mayor = this.matriz[1][1]
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        if (mayor < this.matriz[f1][c1]) {
          mayor = this.matriz[f1][c1]
        }
      }
    }
    return mayor
  }

  /**
   * Retorna el número menor de la matriz
   * @returns {number}
   */
  devolverMenor (): number {
    let menor = this.matriz[1][1]
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        if (menor > this.matriz[f1][c1]) {
          menor = this.matriz[f1][c1]
        }
      }
    }
    return menor
  }

  /**
   * Busca un elemento y devuelve sus posiciones
   * @param {number} num numero a buscar
   * @returns {number[]}
   */
  busquedaSecuencial (num: number): number[] | null[] {
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        if (this.matriz[f1][c1] === num) {
          return [f1 + 1, c1 + 1]
        }
      }
    }
    return [null, null]
  }

  /**
   * Retorna la frecuencia de un número
   * @param {number} num número
   * @returns {number}
   */
  frecuencia (num: number): number {
    let frec = 0
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        if (num === this.matriz[f1][c1]) {
          frec++
        }
      }
    }
    return frec
  }

  /**
   * Ordena la matriz
   */
  ordenar (): void {
    let inc
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        for (let f2 = f1; f2 < this.rowLength; f2++) {
          if (f1 === f2) {
            inc = c1
          } else {
            inc = 0
          }
          for (let c2 = inc; c2 < this.columnLength; c2++) {
            if (this.matriz[f1][c1] > this.matriz[f2][c2]) {
              this.intercambiar(f1, c1, f2, c2)
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
    if (!method) throw new Error('El metodo esta vacio')
    let inc
    const n1 = new Numero()
    const n2 = new Numero()

    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        for (let f2 = f1; f2 < this.rowLength; f2++) {
          if (f1 === f2) {
            inc = c1
          } else {
            inc = 0
          }
          for (let c2 = inc; c2 < this.columnLength; c2++) {
            n1.cargar(this.matriz[f2][c2])
            n2.cargar(this.matriz[f1][c1])
            if (
              (n1[method]() && !n2[method]()) ||
              (n1[method]() && n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1]) ||
              (!n1[method]() && !n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1])
            ) {
              this.intercambiar(f2, c2, f1, c1)
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
    if (!method) throw new Error('El metodo esta vacio')

    let inc
    let bool = true

    const n1 = new Numero()
    const n2 = new Numero()

    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        if (bool) {
          for (let f2 = f1; f2 < this.rowLength; f2++) {
            if (f1 === f2) {
              inc = c1
            } else {
              inc = 0
            }
            for (let c2 = inc; c2 < this.columnLength; c2++) {
              n1.cargar(this.matriz[f2][c2])
              n2.cargar(this.matriz[f1][c1])
              if (
                (n1[method]() && !n2[method]()) ||
                (n1[method]() && n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1]) ||
                (!n1[method]() && !n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1)
              }
            }
          }
        } else {
          for (let f2 = f1; f2 < this.rowLength; f2++) {
            if (f1 === f2) {
              inc = c1
            } else {
              inc = 0
            }
            for (let c2 = inc; c2 < this.columnLength; c2++) {
              n1.cargar(this.matriz[f2][c2])
              n2.cargar(this.matriz[f1][c1])
              if (
                (!n1[method]() && n2[method]()) ||
                (!n1[method]() && !n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1]) ||
                (n1[method]() && n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1)
              }
            }
          }
        }
        bool = !bool
      }
    }
  }

  // extensiones 1 (Añadir Columna)
  /**
   * Se debe ingresar un metodo de la clase Numero
   * @param {Function} method metodo de la clase Numero
   */
  #añadirColumna (method: Function): void {
    if (!this.matriz[this.columnLength]) {
      this.matriz[this.columnLength] = []
    }
    if (!this.matriz[this.columnLength + 1]) {
      this.matriz[this.columnLength + 1] = []
    }

    for (let f1 = 0; f1 < this.rowLength; f1++) {
      this.matriz[f1][this.columnLength] = method(f1)
    }
    this.columnLength++
  }

  /**
   * Retorna la suma de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  sumaFila (fila: number): number {
    let suma = 0

    for (let c1 = 0; c1 < this.columnLength; c1++) {
      suma = suma + this.matriz[fila][c1]
    }
    return suma
  }

  /**
   * Retorna la Mutiplicación de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  multiplicacionFila (fila: number): number {
    let producto = 1
    for (let c1 = 0; c1 < this.columnLength; c1++) {
      producto = producto * this.matriz[fila][c1]
    }
    return producto
  }

  /**
   * Cuenta los pares de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarParesFila (fila: number): number {
    let count = 0
    const n1 = new Numero()
    for (let c1 = 0; c1 < this.columnLength; c1++) {
      n1.cargar(this.matriz[fila][c1])
      if (n1.verificarPar()) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los no pares de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarNoParesFila (fila: number): number {
    let count = 0
    const n1 = new Numero()
    for (let c1 = 0; c1 < this.columnLength; c1++) {
      n1.cargar(this.matriz[fila][c1])
      if (!n1.verificarPar()) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los Primos de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarPrimosFila (fila: number): number {
    let count = 0
    const n1 = new Numero()
    for (let c1 = 0; c1 < this.columnLength; c1++) {
      n1.cargar(this.matriz[fila][c1])
      if (n1.verificarPrimo()) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los no primos de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarNoPrimosFila (fila: number): number {
    let count = 0
    const n1 = new Numero()
    for (let c1 = 0; c1 < this.columnLength; c1++) {
      n1.cargar(this.matriz[fila][c1])
      if (!n1.verificarPrimo()) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los Capicuas de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarCapicuasFila (fila: number): number {
    let count = 0
    const n1 = new Numero()
    for (let c1 = 0; c1 < this.columnLength; c1++) {
      n1.cargar(this.matriz[fila][c1])
      if (n1.verificarCapicua()) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los no Capicuas de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarNoCapicuasFila (fila: number): number {
    let count = 0
    const n1 = new Numero()
    for (let c1 = 0; c1 < this.columnLength; c1++) {
      n1.cargar(this.matriz[fila][c1])
      if (!n1.verificarCapicua()) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los fibonaccis de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarFibonaccisFila (fila: number): number {
    let count = 0
    const n1 = new Numero()
    for (let c1 = 0; c1 < this.columnLength; c1++) {
      n1.cargar(this.matriz[fila][c1])
      if (n1.verificarFibonacci()) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los no fibonaccis de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarNoFibonaccisFila (fila: number): number {
    let count = 0
    const n1 = new Numero()
    for (let c1 = 0; c1 < this.columnLength; c1++) {
      n1.cargar(this.matriz[fila][c1])
      if (!n1.verificarFibonacci()) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los elementos diferentes de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarElementosDiferentesFila (fila: number): number {
    let esDiferente
    let count = 1
    for (let i = 1; i < this.columnLength; i++) {
      esDiferente = true
      for (let j = 0; j < i; j++) {
        if (this.matriz[fila][i] === this.matriz[fila][j]) {
          esDiferente = false
          break
        }
      }
      if (esDiferente) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los elementos unicos de la fila real
   * @param {number} fila fila real de 0 - fila
   * @returns {number}
   */
  contarElementosUnicosFila (fila: number): number {
    let count = 0
    for (let c1 = 0; c1 < this.columnLength; c1++) {
      if (this.frecuenciaFila(fila, this.matriz[fila][c1]) === 1) {
        count++
      }
    }
    return count
  }

  /**
   * Retorna la frecuencia de un número en la fila
   * @param {number} fila fila real de 0 - fila
   * @param {number} num numero
   * @returns {number}
   */
  frecuenciaFila (fila: number, num: number): number {
    let frec = 0
    for (let c1 = 0; c1 < this.columnLength; c1++) {
      if (this.matriz[fila][c1] === num) {
        frec++
      }
    }
    return frec
  }

  #mayorFrecuenciaFila (fila: number): number {
    let dato1, frec1, dato2, frec2

    dato1 = this.matriz[fila][0]
    frec1 = this.frecuenciaFila(fila, dato1)
    for (let i = 0; i < this.columnLength; i++) {
      dato2 = this.matriz[fila][i]
      frec2 = this.frecuenciaFila(fila, dato2)
      if (frec1 < frec2) {
        dato1 = dato2
        frec1 = frec2
      }
    }
    return dato1
  }

  #menorFrecuenciaFila (fila: number): number {
    let dato1, frec1, dato2, frec2

    dato1 = this.matriz[fila][0]
    frec1 = this.frecuenciaFila(fila, dato1)
    for (let i = 0; i < this.columnLength; i++) {
      dato2 = this.matriz[fila][i]
      frec2 = this.frecuenciaFila(fila, dato2)
      if (frec1 > frec2) {
        dato1 = dato2
        frec1 = frec2
      }
    }
    return dato1
  }

  // extensiones 2 (Añadir Fila)
  #añadirFila (method: (arg0: number) => number): void {
    if (!this.matriz[this.rowLength]) {
      this.matriz[this.rowLength] = []
    }
    if (!this.matriz[this.rowLength + 1]) {
      this.matriz[this.rowLength + 1] = []
    }

    for (let c1 = 0; c1 < this.columnLength; c1++) {
      this.matriz[this.rowLength][c1] = method(c1)
    }
    this.rowLength++
  }

  /**
   * Retorna la suma de la columna real
   * @param {number} columna real de 0 - columna
   * @returns {number}
   */
  sumaColumna (columna: number): number {
    let suma = 0

    for (let f1 = 0; f1 < this.rowLength; f1++) {
      suma = suma + this.matriz[f1][columna]
    }
    return suma
  }

  /**
   * Retorna la multiplicacion de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  multiplicacionColumna (columna: number): number {
    let producto = 1

    for (let f1 = 0; f1 < this.rowLength; f1++) {
      producto = producto + this.matriz[f1][columna]
    }
    return producto
  }

  /**
   * Cuenta los pares de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarParesColumna (columna: number): number {
    let count = 0
    const n1 = new Numero()
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      n1.cargar(this.matriz[f1][columna])
      if (n1.verificarPar()) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los no pares de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarNoParesColumna (columna: number): number {
    let count = 0
    const n1 = new Numero()
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      n1.cargar(this.matriz[f1][columna])
      if (!n1.verificarPar()) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los primos de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarPrimosColumna (columna: number): number {
    let count = 0
    const n1 = new Numero()
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      n1.cargar(this.matriz[f1][columna])
      if (n1.verificarPrimo()) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los no primos de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarNoPrimosColumna (columna: number): number {
    let count = 0
    const n1 = new Numero()
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      n1.cargar(this.matriz[f1][columna])
      if (!n1.verificarPrimo()) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los capicuas de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarCapicuasColumna (columna: number): number {
    let count = 0
    const n1 = new Numero()
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      n1.cargar(this.matriz[f1][columna])
      if (n1.verificarCapicua()) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los no capicuas de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarNoCapicuasColumna (columna: number): number {
    let count = 0
    const n1 = new Numero()
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      n1.cargar(this.matriz[f1][columna])
      if (!n1.verificarCapicua()) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los fibonaccis de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarFibonaccisColumna (columna: number): number {
    let count = 0
    const n1 = new Numero()
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      n1.cargar(this.matriz[f1][columna])
      if (n1.verificarFibonacci()) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los no fibonaccis de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarNoFibonaccisColumna (columna: number): number {
    let count = 0
    const n1 = new Numero()
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      n1.cargar(this.matriz[f1][columna])
      if (n1.verificarFibonacci()) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los ElementosDiferentes de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarElementosDiferentesColumna (columna: number): number {
    let esDiferente
    let count = 1
    for (let i = 1; i < this.rowLength; i++) {
      esDiferente = true
      for (let j = 0; j < i; j++) {
        if (this.matriz[i][columna] === this.matriz[j][columna]) {
          esDiferente = false
          break
        }
      }
      if (esDiferente) {
        count++
      }
    }
    return count
  }

  /**
   * Cuenta los elementos unicos de la columna real
   * @param {number} columna columna real de 0 - columna
   * @returns {number}
   */
  contarElementosUnicosColumna (columna: number): number {
    let count = 0
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      if (this.frecuenciaColumna(columna, this.matriz[f1][columna]) === 1) {
        count++
      }
    }
    return count
  }

  /**
   * Retorna la frecuencia de la columna
   * @param {number} columna columna real de 0 - columna
   * @param {number} num numero
   * @returns {number}
   */
  frecuenciaColumna (columna: number, num: number): number {
    let frec = 0
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      if (this.matriz[f1][columna] === num) {
        frec++
      }
    }
    return frec
  }

  #mayorFrecuenciaColumna (columna: number): number {
    let dato1, frec1, dato2, frec2

    dato1 = this.matriz[0][columna]
    frec1 = this.frecuenciaColumna(columna, dato1)
    for (let i = 0; i < this.rowLength; i++) {
      dato2 = this.matriz[i][columna]
      frec2 = this.frecuenciaColumna(columna, dato2)
      if (frec1 < frec2) {
        dato1 = dato2
        frec1 = frec2
      }
    }
    return dato1
  }

  #menorFrecuenciaColumna (columna: number): number {
    let dato1, frec1, dato2, frec2

    dato1 = this.matriz[0][columna]
    frec1 = this.frecuenciaColumna(columna, dato1)
    for (let i = 0; i < this.rowLength; i++) {
      dato2 = this.matriz[i][columna]
      frec2 = this.frecuenciaColumna(columna, dato2)
      if (frec1 > frec2) {
        dato1 = dato2
        frec1 = frec2
      }
    }
    return dato1
  }

  // parte 1
  añadirColumnaMayorFrecuenciaYFrecuencia (): void {
    // Asegúrate de que haya espacio suficiente para dos nuevas filas
    if (!this.matriz[this.columnLength]) {
      this.matriz[this.columnLength] = []
    }
    if (!this.matriz[this.columnLength + 1]) {
      this.matriz[this.columnLength + 1] = []
    }
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      this.matriz[f1][this.columnLength] = this.#mayorFrecuenciaFila(f1)
      this.matriz[f1][this.columnLength + 1] = this.frecuenciaFila(f1, this.matriz[f1][this.columnLength])
    }
    this.columnLength++
    this.columnLength++
  }

  añadirColumnaMenorFrecuenciaYFrecuencia (): void {
    // Asegúrate de que haya espacio suficiente para dos nuevas filas
    if (!this.matriz[this.columnLength]) {
      this.matriz[this.columnLength] = []
    }
    if (!this.matriz[this.columnLength + 1]) {
      this.matriz[this.columnLength + 1] = []
    }
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      this.matriz[f1][this.columnLength] = this.#menorFrecuenciaFila(f1)
      this.matriz[f1][this.columnLength + 1] = this.frecuenciaFila(f1, this.matriz[f1][this.columnLength])
    }
    this.columnLength++
    this.columnLength++
  }

  añadirColumnaSuma (): void {
    this.#añadirColumna(this.sumaFila.bind(this)) // bind(this) se asegura que sea el metodo correcto
  }

  añadirColumnaMultiplacion (): void {
    this.#añadirColumna(this.multiplicacionFila.bind(this))
  }

  añadirColumnaPares (): void {
    this.#añadirColumna(this.contarParesFila.bind(this))
  }

  añadirColumnaNoPares (): void {
    this.#añadirColumna(this.contarNoParesFila.bind(this))
  }

  añadirColumnaPrimos (): void {
    this.#añadirColumna(this.contarPrimosFila.bind(this))
  }

  añadirColumnaNoPrimos (): void {
    this.#añadirColumna(this.contarNoPrimosFila.bind(this))
  }

  añadirColumnaCapicuas (): void {
    this.#añadirColumna(this.contarCapicuasFila.bind(this))
  }

  añadirColumnaNoCapicuas (): void {
    this.#añadirColumna(this.contarNoCapicuasFila.bind(this))
  }

  añadirColumnaFibonaccis (): void {
    this.#añadirColumna(this.contarFibonaccisFila.bind(this))
  }

  añadirColumnaNoFibonaccis (): void {
    this.#añadirColumna(this.contarNoFibonaccisFila.bind(this))
  }

  añadirColumnaElementosDiferentes (): void {
    this.#añadirColumna(this.contarElementosDiferentesFila.bind(this))
  }

  añadirColumnaElementosUnicos (): void {
    this.#añadirColumna(this.contarElementosUnicosFila.bind(this))
  }

  // parte 2
  añadirFilaMayorFrecuenciaYFrecuencia (): void {
    // Asegúrate de que haya espacio suficiente para dos nuevas filas
    if (!this.matriz[this.rowLength]) {
      this.matriz[this.rowLength] = []
    }
    if (!this.matriz[this.rowLength + 1]) {
      this.matriz[this.rowLength + 1] = []
    }
    for (let c1 = 0; c1 < this.columnLength; c1++) {
      this.matriz[this.rowLength][c1] = this.#mayorFrecuenciaColumna(c1) // <-- El problema esta aca :  Cannot set properties of undefined (setting '0')
      this.matriz[this.rowLength + 1][c1] = this.frecuenciaColumna(c1, this.matriz[this.rowLength][c1])
    }
    this.rowLength++
    this.rowLength++
  }

  añadirFilaMenorFrecuenciaYFrecuencia (): void {
    // Asegúrate de que haya espacio suficiente para dos nuevas filas
    if (!this.matriz[this.rowLength]) {
      this.matriz[this.rowLength] = []
    }
    if (!this.matriz[this.rowLength + 1]) {
      this.matriz[this.rowLength + 1] = []
    }
    for (let c1 = 0; c1 < this.columnLength; c1++) {
      this.matriz[this.rowLength][c1] = this.#menorFrecuenciaColumna(c1) // <-- El problema esta aca :  Cannot set properties of undefined (setting '0')
      this.matriz[this.rowLength + 1][c1] = this.frecuenciaColumna(c1, this.matriz[this.rowLength][c1])
    }
    this.rowLength++
    this.rowLength++
  }

  añadirFilaSuma (): void {
    this.#añadirFila(this.sumaColumna.bind(this)) // bind(this) se asegura que sea el metodo correcto
  }

  añadirFilaMultiplacion (): void {
    this.#añadirFila(this.multiplicacionColumna.bind(this))
  }

  añadirFilaPares (): void {
    this.#añadirFila(this.contarParesColumna.bind(this))
  }

  añadirFilaNoPares (): void {
    this.#añadirFila(this.contarNoParesColumna.bind(this))
  }

  añadirFilaPrimos (): void {
    this.#añadirFila(this.contarPrimosColumna.bind(this))
  }

  añadirFilaNoPrimos (): void {
    this.#añadirFila(this.contarNoPrimosColumna.bind(this))
  }

  añadirFilaCapicuas (): void {
    this.#añadirFila(this.contarCapicuasColumna.bind(this))
  }

  añadirFilaNoCapicuas (): void {
    this.#añadirFila(this.contarNoCapicuasColumna.bind(this))
  }

  añadirFilaFibonaccis (): void {
    this.#añadirFila(this.contarFibonaccisColumna.bind(this))
  }

  añadirFilaNoFibonaccis (): void {
    this.#añadirFila(this.contarNoFibonaccisColumna.bind(this))
  }

  añadirFilaElementosDiferentes (): void {
    this.#añadirFila(this.contarElementosDiferentesColumna.bind(this))
  }

  añadirFilaElementosUnicos (): void {
    this.#añadirFila(this.contarElementosUnicosColumna.bind(this))
  }

  // Op.Matrices Cuadradas
  ordenarDiagonalPrincipal (): void {
    if (this.columnLength !== this.rowLength) throw new Error('Las Matriz no es cuadrada')

    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < this.columnLength; c1++) {
        for (let f2 = f1; f2 < this.rowLength; f2++) {
          for (let c2 = c1; c2 < this.columnLength; c2++) {
            if (c1 === f1 && c2 === f2 && this.matriz[f1][c1] > this.matriz[f2][c2]) {
              this.intercambiar(f1, c1, f2, c2)
            }
          }
        }
      }
    }
  }

  ordenarDiagonalSecundaria (): void {
    if (this.columnLength !== this.rowLength) throw new Error('La Matriz no es Cuadrada')

    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let c1 = this.columnLength - 1; c1 >= 0; c1--) {
        for (let f2 = f1; f2 < this.rowLength; f2++) {
          for (let c2 = c1; c2 >= 0; c2--) {
            if (
              c1 === this.columnLength - f1 - 1 &&
              c2 === this.columnLength - f2 - 1 &&
              this.matriz[f1][c1] > this.matriz[f2][c2]
            ) {
              this.intercambiar(f1, c1, f2, c2)
            }
          }
        }
      }
    }
  }

  // segmentar
  /**
   * Segmentar la triangular de acuerdo al metodo que le pasemos
   * @param {MethodsOfNumero} method metodo de la instancia Numero
   * @throws {Error} Si el metodo esta vacio
   * @throws {Error} Si la matriz no es cuadrada
   * @returns {void}
   */
  segmentarTriangularInferiorIzquierda (method: MethodsOfNumero): void {
    if (!method) throw new Error('El metodo esta vacio')
    if (this.columnLength !== this.rowLength) throw new Error('Las Matriz no es cuadrada')

    let inc

    const n1 = new Numero()
    const n2 = new Numero()

    for (let f1 = 1; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < f1; c1++) {
        for (let f2 = f1; f2 < this.rowLength; f2++) {
          if (f1 === f2) {
            inc = c1
          } else {
            inc = 0
          }
          for (let c2 = inc; c2 < f2; c2++) {
            n1.cargar(this.matriz[f2][c2])
            n2.cargar(this.matriz[f1][c1])
            if (
              (n1[method]() && !n2[method]()) ||
              (n1[method]() && n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1]) ||
              (!n1[method]() && !n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1])
            ) {
              this.intercambiar(f2, c2, f1, c1)
            }
          }
        }
      }
    }
  }

  /**
   * Segmentar la triangular de acuerdo al metodo que le pasemos
   * @param { MethodsOfNumero} method metodo de la instancia Numero
   * @throws {Error} Si el metodo esta vacio
   * @throws {Error} Si la matriz no es cuadrada
   * @returns {void}
   */
  segmentarTriangularInferiorDerecha (method: MethodsOfNumero): void {
    if (!method) throw new Error('El metodo esta vacio')
    if (this.columnLength !== this.rowLength) throw new Error('Las Matriz no es cuadrada')

    let inc

    const n1 = new Numero()
    const n2 = new Numero()

    for (let f1 = 1; f1 < this.rowLength; f1++) {
      for (let c1 = this.columnLength - f1; c1 < this.columnLength; c1++) {
        for (let f2 = f1; f2 < this.rowLength; f2++) {
          if (f1 === f2) {
            inc = c1
          } else {
            inc = this.columnLength - f2
          }
          for (let c2 = inc; c2 < this.columnLength; c2++) {
            n1.cargar(this.matriz[f2][c2])
            n2.cargar(this.matriz[f1][c1])
            if (
              (n1[method]() && !n2[method]()) ||
              (n1[method]() && n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1]) ||
              (!n1[method]() && !n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1])
            ) {
              this.intercambiar(f2, c2, f1, c1)
            }
          }
        }
      }
    }
  }

  /**
   * Segmentar la triangular de acuerdo al metodo que le pasemos
   * @param {MethodsOfNumero} method metodo de la instancia Numero
   * @throws {Error} Si el metodo esta vacio
   * @throws {Error} Si la matriz no es cuadrada
   * @returns {void}
   */
  segmentarTriangularSuperiorIzquierda (method: MethodsOfNumero): void {
    if (!method) throw new Error('El metodo esta vacio')
    if (this.columnLength !== this.rowLength) throw new Error('Las Matriz no es cuadrada')
    let inc

    const n1 = new Numero()
    const n2 = new Numero()

    for (let f1 = 0; f1 < this.rowLength - 1; f1++) {
      for (let c1 = 0; c1 < this.columnLength - f1 - 1; c1++) {
        for (let f2 = f1; f2 < this.rowLength - 1; f2++) {
          if (f1 === f2) {
            inc = c1
          } else {
            inc = 0
          }
          for (let c2 = inc; c2 < this.columnLength - f2 - 1; c2++) {
            n1.cargar(this.matriz[f2][c2])
            n2.cargar(this.matriz[f1][c1])
            if (
              (n1[method]() && !n2[method]()) ||
              (n1[method]() && n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1]) ||
              (!n1[method]() && !n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1])
            ) {
              this.intercambiar(f2, c2, f1, c1)
            }
          }
        }
      }
    }
  }

  /**
   * Segmentar la triangular de acuerdo al metodo que le pasemos
   * @param {MethodsOfNumero} method metodo de la instancia Numero
   * @throws {Error} Si el metodo esta vacio
   * @throws {Error} Si la matriz no es cuadrada
   * @returns {void}
   */
  segmentarTriangularSuperiorDerecha (method: MethodsOfNumero): void {
    if (!method) throw new Error('El metodo esta vacio')
    if (this.columnLength !== this.rowLength) throw new Error('Las Matriz no es cuadrada')
    let inc

    const n1 = new Numero()
    const n2 = new Numero()

    for (let f1 = 0; f1 < this.rowLength - 1; f1++) {
      for (let c1 = f1 + 1; c1 < this.columnLength; c1++) {
        for (let f2 = f1; f2 < this.rowLength - 1; f2++) {
          if (f1 === f2) {
            inc = c1
          } else {
            inc = f2 + 1
          }
          for (let c2 = inc; c2 < this.columnLength; c2++) {
            n1.cargar(this.matriz[f2][c2])
            n2.cargar(this.matriz[f1][c1])
            if (
              (n1[method]() && !n2[method]()) ||
              (n1[method]() && n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1]) ||
              (!n1[method]() && !n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1])
            ) {
              this.intercambiar(f2, c2, f1, c1)
            }
          }
        }
      }
    }
  }

  // Intercalar
  /**
   * Intercala la triangular de acuerdo al metodo que le pasemos
   * @param {MethodsOfNumero} method metodo de la instancia Numero
   * @throws {Error} Si el metodo esta vacio
   * @throws {Error} Si la matriz no es cuadrada
   * @returns {void}
   */
  intercalarTriangularInferiorIzquierda (method: MethodsOfNumero): void {
    if (!method) throw new Error('El metodo esta vacio')
    if (this.columnLength !== this.rowLength) throw new Error('Las Matriz no es cuadrada')

    let inc
    let bool = true

    const n1 = new Numero()
    const n2 = new Numero()

    for (let f1 = 1; f1 < this.rowLength; f1++) {
      for (let c1 = 0; c1 < f1; c1++) {
        if (bool) {
          for (let f2 = f1; f2 < this.rowLength; f2++) {
            if (f1 === f2) {
              inc = c1
            } else {
              inc = 0
            }
            for (let c2 = inc; c2 < f2; c2++) {
              n1.cargar(this.matriz[f2][c2])
              n2.cargar(this.matriz[f1][c1])
              if (
                (n1[method]() && !n2[method]()) ||
                (n1[method]() && n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1]) ||
                (!n1[method]() && !n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1)
              }
            }
          }
        } else {
          for (let f2 = f1; f2 < this.rowLength; f2++) {
            if (f1 === f2) {
              inc = c1
            } else {
              inc = 0
            }
            for (let c2 = inc; c2 < f2; c2++) {
              n1.cargar(this.matriz[f2][c2])
              n2.cargar(this.matriz[f1][c1])
              if (
                (!n1[method]() && n2[method]()) ||
                (!n1[method]() && !n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1]) ||
                (n1[method]() && n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1)
              }
            }
          }
          bool = !bool
        }
      }
    }
  }

  /**
   * Intercala la triangular de acuerdo al metodo que le pasemos
   * @param {MethodsOfNumero} method metodo de la instancia Numero
   * @throws {Error} Si el metodo esta vacio
   * @throws {Error} Si la matriz no es cuadrada
   * @returns {void}
   */
  intercalarTriangularInferiorDerecha (method: MethodsOfNumero): void {
    if (!method) throw new Error('El metodo esta vacio')
    if (this.columnLength !== this.rowLength) throw new Error('Las Matriz no es cuadrada')

    let inc
    let bool = true

    const n1 = new Numero()
    const n2 = new Numero()

    for (let f1 = 1; f1 < this.rowLength; f1++) {
      for (let c1 = this.columnLength - f1; c1 < this.columnLength; c1++) {
        if (bool) {
          for (let f2 = f1; f2 < this.rowLength; f2++) {
            if (f1 === f2) {
              inc = c1
            } else {
              inc = this.columnLength - f2
            }
            for (let c2 = inc; c2 < this.columnLength; c2++) {
              n1.cargar(this.matriz[f2][c2])
              n2.cargar(this.matriz[f1][c1])
              if (
                (n1[method]() && !n2[method]()) ||
                (n1[method]() && n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1]) ||
                (!n1[method]() && !n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1)
              }
            }
          }
        } else {
          for (let f2 = f1; f2 < this.rowLength; f2++) {
            if (f1 === f2) {
              inc = c1
            } else {
              inc = this.columnLength - f2
            }
            for (let c2 = inc; c2 < this.columnLength; c2++) {
              n1.cargar(this.matriz[f2][c2])
              n2.cargar(this.matriz[f1][c1])
              if (
                (!n1[method]() && n2[method]()) ||
                (!n1[method]() && !n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1]) ||
                (n1[method]() && n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1)
              }
            }
          }
        }
        bool = !bool
      }
    }
  }

  /**
   * Intercala la triangular de acuerdo al metodo que le pasemos
   * @param {MethodsOfNumero} method metodo de la instancia Numero
   * @throws {Error} Si el metodo esta vacio
   * @throws {Error} Si la matriz no es cuadrada
   * @returns {void}
   */
  intercalarTriangularSuperiorIzquierda (method: MethodsOfNumero): void {
    if (!method) throw new Error('El metodo esta vacio')
    if (this.columnLength !== this.rowLength) throw new Error('Las Matriz no es cuadrada')

    let inc
    let bool = true

    const n1 = new Numero()
    const n2 = new Numero()

    for (let f1 = 0; f1 < this.rowLength - 1; f1++) {
      for (let c1 = 0; c1 < this.columnLength - f1 - 1; c1++) {
        if (bool) {
          for (let f2 = f1; f2 < this.rowLength - 1; f2++) {
            if (f1 === f2) {
              inc = c1
            } else {
              inc = 0
            }
            for (let c2 = inc; c2 < this.columnLength - f2 - 1; c2++) {
              n1.cargar(this.matriz[f2][c2])
              n2.cargar(this.matriz[f1][c1])
              if (
                (n1[method]() && !n2[method]()) ||
                (n1[method]() && n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1]) ||
                (!n1[method]() && !n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1)
              }
            }
          }
        } else {
          for (let f2 = f1; f2 < this.rowLength - 1; f2++) {
            if (f1 === f2) {
              inc = c1
            } else {
              inc = 0
            }
            for (let c2 = inc; c2 < this.columnLength - f2 - 1; c2++) {
              n1.cargar(this.matriz[f2][c2])
              n2.cargar(this.matriz[f1][c1])
              if (
                (!n1[method]() && n2[method]()) ||
                (!n1[method]() && !n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1]) ||
                (n1[method]() && n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1)
              }
            }
          }
        }
        bool = !bool
      }
    }
  }

  /**
   * Intercala la triangular de acuerdo al metodo que le pasemos
   * @param {MethodsOfNumero} method metodo de la instancia Numero
   * @throws {Error} Si el metodo esta vacio
   * @throws {Error} Si la matriz no es cuadrada
   * @returns {void}
   */
  intercalarTriangularSuperiorDerecha (method: MethodsOfNumero): void {
    if (!method) throw new Error('El metodo esta vacio')
    if (this.columnLength !== this.rowLength) throw new Error('Las Matriz no es cuadrada')

    let inc
    let bool = true

    const n1 = new Numero()
    const n2 = new Numero()

    for (let f1 = 0; f1 < this.rowLength - 1; f1++) {
      for (let c1 = f1 + 1; c1 < this.columnLength; c1++) {
        if (bool) {
          for (let f2 = f1; f2 < this.rowLength - 1; f2++) {
            if (f1 === f2) {
              inc = c1
            } else {
              inc = f2 + 1
            }
            for (let c2 = inc; c2 < this.columnLength; c2++) {
              n1.cargar(this.matriz[f2][c2])
              n2.cargar(this.matriz[f1][c1])
              if (
                (n1[method]() && !n2[method]()) ||
                (n1[method]() && n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1]) ||
                (!n1[method]() && !n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1)
              }
            }
          }
        } else {
          for (let f2 = f1; f2 < this.rowLength - 1; f2++) {
            if (f1 === f2) {
              inc = c1
            } else {
              inc = f2 + 1
            }
            for (let c2 = inc; c2 < this.columnLength; c2++) {
              n1.cargar(this.matriz[f2][c2])
              n2.cargar(this.matriz[f1][c1])
              if (
                (!n1[method]() && n2[method]()) ||
                (!n1[method]() && !n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1]) ||
                (n1[method]() && n2[method]() && this.matriz[f2][c2] < this.matriz[f1][c1])
              ) {
                this.intercambiar(f2, c2, f1, c1)
              }
            }
          }
        }
        bool = !bool
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
    for (let c1 = 0; c1 < this.columnLength; c1++) {
      this.intercambiar(f1, c1, f2, c1)
    }
  }

  /**
   * 0rdena las filas tomando como referencia la ultima columna
   * @returns {void}
   */
  ordenarFilasPorUltimaColumna (): void {
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      for (let p = 0; p < this.rowLength - 1; p++) {
        if (this.matriz[p][this.columnLength - 1] > this.matriz[p + 1][this.columnLength - 1]) {
          this.intercambiarFilas(p, p + 1)
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
    for (let f1 = 0; f1 < this.rowLength; f1++) {
      this.intercambiar(f1, c1, f1, c2)
    }
  }

  /**
   * 0rdena las columnas tomando como referencia la ultima fila
   * @returns {void}
   */
  ordenarColumnasPorUltimaFila (): void {
    for (let c1 = 0; c1 < this.columnLength; c1++) {
      for (let p = 0; p < this.columnLength - 1; p++) {
        if (this.matriz[this.rowLength - 1][p] > this.matriz[this.rowLength - 1][p + 1]) {
          this.intercambiarColumnas(p, p + 1)
        }
      }
    }
  }
}
