import Numero, { methodsOfNumero, type MethodsOfNumero } from './Numero'
/**
 * @module Tensor
 */
/**
 * Clase Tensor para trabajar con tensores
 */
export default class Tensor {
  filas = 0
  columnas = 0
  capas = 0

  tensor: number[][][] = []
  /**
   * Metodo que carga la matriz con valores randoms de un rango
   * @param {number} filas número de filas
   * @param {number} columnas número de columnas
   * @param {number} capas número de capas
   * @param {number} a rango a
   * @param {number} b rango b
   * @returns {void}
   */
  cargar (filas: number, columnas: number, capas: number, a: number, b: number): void {
    this.filas = filas
    this.columnas = columnas
    this.capas = capas

    for (let z = 0; z < this.capas; z++) {
      if (!this.tensor[z]) {
        this.tensor[z] = []
      }
      for (let x = 0; x < this.filas; x++) {
        if (!this.tensor[z][x]) {
          this.tensor[z][x] = []
        }
        for (let y = 0; y < this.columnas; y++) {
          this.tensor[z][x][y] = Math.floor(Math.random() * (b - a + 1) + a)
        }
      }
    }
  }

  /**
   * Metodo que carga serie Aritmetica
   * @param {number} filas numero de filas
   * @param {number} columnas numero de columnas
   * @param {number} capas numero de capas
   * @param {number} a1 valor inicial
   * @param {number} r la razón
   * @returns {void}
   */
  cargarSerieAritmetica (filas: number, columnas: number, capas: number, a1: number, r: number): void {
    this.filas = filas
    this.columnas = columnas
    this.capas = capas

    let n = 1

    for (let z = 0; z < this.capas; z++) {
      if (!this.tensor[z]) {
        this.tensor[z] = []
      }
      for (let x = 0; x < this.filas; x++) {
        if (!this.tensor[z][x]) {
          this.tensor[z][x] = []
        }
        for (let y = 0; y < this.columnas; y++) {
          this.tensor[z][x][y] = a1 + (n - 1) * r
          n++
        }
      }
    }
  }

  /**
   * Metodo que carga serie Geometrica
   * @param {number} filas numero de filas
   * @param {number} columnas numero de columnas
   * @param {number} capas numero de capas
   * @param {number} a1 valor inicial
   * @param {number} r la razón
   * @returns {void}
   */
  cargarSerieGeometrica (filas: number, columnas: number, capas: number, a1: number, r: number): void {
    this.filas = filas
    this.columnas = columnas
    this.capas = capas

    let n = 1

    for (let z = 0; z < this.capas; z++) {
      if (!this.tensor[z]) {
        this.tensor[z] = []
      }
      for (let x = 0; x < this.filas; x++) {
        if (!this.tensor[z][x]) {
          this.tensor[z][x] = []
        }
        for (let y = 0; y < this.columnas; y++) {
          this.tensor[z][x][y] = a1 * Math.round(Math.pow(r, n - 1))
          n++
        }
      }
    }
  }

  /**
   * Busca si un número pertenece al tensor
   * @param {number} num numero a buscar
   * @returns {boolean}
   */
  pertenencia (num: number): boolean {
    for (let z = 0; z < this.capas; z++) {
      for (let x = 0; x < this.filas; x++) {
        for (let y = 0; y < this.columnas; y++) {
          if (this.tensor[z][x][y] === num) {
            return true
          }
        }
      }
    }
    return false
  }

  /**
   * Verifica si un número es mayor a todos los números del tensor
   * @param {number} num numero a comparar
   * @returns {boolean}
   */
  verificarMayor (num: number): boolean {
    for (let z = 0; z < this.capas; z++) {
      for (let x = 0; x < this.filas; x++) {
        for (let y = 0; y < this.columnas; y++) {
          if (this.tensor[z][x][y] > num) {
            return false
          }
        }
      }
    }
    return true
  }

  /**
   * Verifica si un número es mayor a todos los números del tensor
   * @param {number} num numero a comparar
   * @returns {boolean}
   */
  verificarMenor (num: number): boolean {
    for (let z = 0; z < this.capas; z++) {
      for (let x = 0; x < this.filas; x++) {
        for (let y = 0; y < this.columnas; y++) {
          if (this.tensor[z][x][y] < num) {
            return false
          }
        }
      }
    }
    return true
  }

  /**
 * Verifica si el tensor está ordenado respecto a una razón en todas sus dimensiones
 * @param {number} r - La razón
 * @returns {boolean}
 */
  verificarOrdenadoRazon (r: number): boolean {
    for (let z = 0; z < this.capas; z++) {
      for (let x = 0; x < this.filas; x++) {
        for (let y = 0; y < this.columnas; y++) {
          if (y < this.columnas - 1 && this.tensor[z][x][y] + r !== this.tensor[z][x][y + 1]) {
            return false
          }
          if (x < this.filas - 1 && y === this.columnas - 1 && this.tensor[z][x][y] + r !== this.tensor[z][x + 1][0]) {
            return false
          }
          if (z < this.capas - 1 && x === this.filas - 1 && y === this.columnas - 1 && this.tensor[z][x][y] + r !== this.tensor[z + 1][0][0]) {
            return false
          }
        }
      }
    }

    return true
  }

  /**
   * Verifica si todos los elementos del tensor son iguales
   * @returns {boolean}
   */
  verificarTodosIguales (): boolean {
    const first = this.tensor[0][0][0]
    for (let z = 0; z < this.capas; z++) {
      for (let x = 0; x < this.filas; x++) {
        for (let y = 0; y < this.columnas; y++) {
          if (this.tensor[z][x][y] !== first) {
            return false
          }
        }
      }
    }
    return true
  }

  /**
   * Verifica si todos los elementos del tensor son unicos osea diferentes
   * @returns {boolean}
   */
  verificarTodosUnicos (): boolean {
    const elementosUnicos = new Set<number>()

    for (let z = 0; z < this.capas; z++) {
      for (let x = 0; x < this.filas; x++) {
        for (let y = 0; y < this.columnas; y++) {
          const valor = this.tensor[z][x][y]
          if (elementosUnicos.has(valor)) {
            return false
          }
          elementosUnicos.add(valor)
        }
      }
    }

    return true
  }

  /**
   * Suma dos matrices
   * @param {Tensor} t1 objeto de la clase tensor
   * @param {Tensor} t2 objeto de la clase tensor
   * @returns {void}
   */
  suma (t1: Tensor, t2: Tensor): void {
    if (t1.filas !== t2.filas || t1.columnas !== t2.columnas || t1.capas !== t2.capas) {
      throw new Error('No se pueden sumar tensores de dimensiones diferentes')
    }
    this.filas = t1.filas
    this.columnas = t1.columnas
    this.capas = t1.capas

    for (let z = 0; z < this.capas; z++) {
      if (!this.tensor[z]) {
        this.tensor[z] = []
      }
      for (let x = 0; x < this.filas; x++) {
        if (!this.tensor[z][x]) {
          this.tensor[z][x] = []
        }
        for (let y = 0; y < this.columnas; y++) {
          this.tensor[z][x][y] = t1.tensor[z][x][y] + t2.tensor[z][x][y]
        }
      }
    }
  }

  /**
   * Suma dos tensores
   * @param {Tensor} t1 objeto de la clase tensor
   * @param {Tensor} t2 objeto de la clase tensor
   * @returns {void}
   */
  resta (t1: Tensor, t2: Tensor): void {
    if (t1.filas !== t2.filas || t1.columnas !== t2.columnas || t1.capas !== t2.capas) {
      throw new Error('No se pueden sumar tensores de dimensiones diferentes')
    }
    this.filas = t1.filas
    this.columnas = t1.columnas
    this.capas = t1.capas

    for (let z = 0; z < this.capas; z++) {
      if (!this.tensor[z]) {
        this.tensor[z] = []
      }
      for (let x = 0; x < this.filas; x++) {
        if (!this.tensor[z][x]) {
          this.tensor[z][x] = []
        }
        for (let y = 0; y < this.columnas; y++) {
          this.tensor[z][x][y] = t1.tensor[z][x][y] - t2.tensor[z][x][y]
        }
      }
    }
  }

  // /**
  //  * Multiplica dos tensores
  //  * @param {Tensor} t1 objeto de la clase tensor
  //  * @param {Tensor} t2 objeto de la clase tensor
  //  * @returns {void}
  //  */
  // multiplicacion (t1: Tensor, t2: Tensor): void {
  //   // pending
  // }

  /**
   * Multiplica el tensor por un escalar
   * @param {number} escalar número real
   * @returns {void}
   */
  multiplicacionPorEscalar (escalar: number): void {
    for (let z = 0; z < this.capas; z++) {
      if (!this.tensor[z]) {
        this.tensor[z] = []
      }
      for (let x = 0; x < this.filas; x++) {
        if (!this.tensor[z][x]) {
          this.tensor[z][x] = []
        }
        for (let y = 0; y < this.columnas; y++) {
          this.tensor[z][x][y] = escalar * this.tensor[z][x][y]
        }
      }
    }
  }

  /**
   * Transpone el tensor
   */
  transposicion (): void {
    const transposed = new Tensor()
    transposed.cargar(this.filas, this.columnas, this.capas, 0, 0)

    for (let z = 0; z < this.capas; z++) {
      for (let x = 0; x < this.filas; x++) {
        for (let y = 0; y < this.columnas; y++) {
          transposed.tensor[y][x][z] = this.tensor[z][x][y]
        }
      }
    }

    this.tensor = transposed.tensor
    this.filas = transposed.filas
    this.columnas = transposed.columnas
    this.capas = transposed.capas
  }

  /**
   * Intercambia dos elementos del tensor
   * @param {number} z1 capa 1
   * @param {number} x1 fila 1
   * @param {number} y1 columna 1
   * @param {number} z2 capa 1
   * @param {number} x2 fila 1
   * @param {number} y2 columna 1
   * @returns {void}
   */
  intercambiar (z1: number, x1: number, y1: number, z2: number, x2: number, y2: number): void {
    ;[this.tensor[z1][x1][y1], this.tensor[z2][x2][y2]] = [
      this.tensor[z2][x2][y2],
      this.tensor[z1][x1][y1]
    ]
  }

  /**
   * Retorna el número mayor del tensor
   * @returns {number}
   */
  devolverMayor (): number {
    if (this.filas === 0 || this.columnas === 0 || this.capas === 0) {
      throw new Error('La matriz está vacía.')
    }

    let mayor = this.tensor[0][0][0]

    for (let z = 0; z < this.capas; z++) {
      for (let x = 0; x < this.filas; x++) {
        for (let y = 0; y < this.columnas; y++) {
          if (mayor < this.tensor[z][x][y]) {
            mayor = this.tensor[z][x][y]
          }
        }
      }
    }
    return mayor
  }

  /**
   * Retorna el número menor del tensor
   * @returns {number}
   */
  devolverMenor (): number {
    let menor = this.tensor[0][0][0]

    for (let z = 0; z < this.capas; z++) {
      for (let x = 0; x < this.filas; x++) {
        for (let y = 0; y < this.columnas; y++) {
          if (menor > this.tensor[z][x][y]) {
            menor = this.tensor[z][x][y]
          }
        }
      }
    }

    return menor
  }

  /**
   * Ordena el tensor
   * @param {'asc' | 'desc'} direccion direccion de ordenamiento
   */
  ordenar (direccion: 'asc' | 'desc' = 'asc'): void {
    this.#checarDireccion(direccion)
    let inf, inc

    for (let z1 = 0; z1 < this.capas; z1++) {
      for (let x1 = 0; x1 < this.filas; x1++) {
        for (let y1 = 0; y1 < this.columnas; y1++) {
          for (let z2 = z1; z2 < this.capas; z2++) {
            if (z1 === z2) {
              inf = x1
            } else {
              inf = 0
            }
            for (let x2 = inf; x2 < this.filas; x2++) {
              if (z1 === z2 && x1 === x2) {
                inc = y1
              } else {
                inc = 0
              }
              for (let y2 = inc; y2 < this.columnas; y2++) {
                if (
                  direccion === 'asc'
                    ? this.tensor[z2][x2][y2] < this.tensor[z1][x1][y1]
                    : this.tensor[z2][x2][y2] > this.tensor[z1][x1][y1]
                ) {
                  this.intercambiar(z1, x1, y1, z2, x2, y2)
                }
              }
            }
          }
        }
      }
    }
  }

  /**
   * Segmenta el tensor pasandole una funcion de un objeto de la instancia Numero
   * @param {MethodsOfNumero} method metodo del objeto Numero
   */
  segmentar (method: MethodsOfNumero): void {
    this.#checarMethodsOfNumero(method)
    let inf
    let inc

    const n1 = new Numero()
    const n2 = new Numero()

    for (let z1 = 0; z1 < this.capas; z1++) {
      for (let x1 = 0; x1 < this.filas; x1++) {
        for (let y1 = 0; y1 < this.columnas; y1++) {
          for (let z2 = z1; z2 < this.capas; z2++) {
            if (z1 === z2) {
              inf = x1
            } else {
              inf = 0
            }
            for (let x2 = inf; x2 < this.filas; x2++) {
              if (z1 === z2 && x1 === x2) {
                inc = y1 + 1
              } else {
                inc = 0
              }
              for (let y2 = inc; y2 < this.columnas; y2++) {
                n1.cargar(this.tensor[z2][x2][y2])
                n2.cargar(this.tensor[z1][x1][y1])
                const b1 = n1[method]()
                const b2 = n2[method]()

                if (
                  (b1 && !b2) ||
                  (b1 && b2 && this.tensor[z2][x2][y2] < this.tensor[z1][x1][y1]) ||
                  (!b1 && !b2 && this.tensor[z2][x2][y2] < this.tensor[z1][x1][y1])
                ) {
                  this.intercambiar(z2, x2, y2, z1, x1, y1)
                }
              }
            }
          }
        }
      }
    }
  }

  /**
   * Itercala el tensor pasandole una funcion de un objeto de la instancia Numero
   * @param {MethodsOfNumero} method metodo del objeto Numero
   */
  intercalar (method: MethodsOfNumero): void {
    this.#checarMethodsOfNumero(method)
    let inf
    let inc
    let bool = true

    const n1 = new Numero()
    const n2 = new Numero()


    for (let z1 = 0; z1 < this.capas; z1++) {
      for (let x1 = 0; x1 < this.filas; x1++) {
        for (let y1 = 0; y1 < this.columnas; y1++) {
          if (bool) {
            for (let z2 = z1; z2 < this.capas; z2++) {
              if (z1 === z2) {
                inf = x1
              } else {
                inf = 0
              }
              for (let x2 = inf; x2 < this.filas; x2++) {
                if (z1 === z2 && x1 === x2) {
                  inc = y1 + 1
                } else {
                  inc = 0
                }
                for (let y2 = inc; y2 < this.columnas; y2++) {
                  n1.cargar(this.tensor[z2][x2][y2])
                  n2.cargar(this.tensor[z1][x1][y1])
                  const b1 = n1[method]()
                  const b2 = n2[method]()

                  if (
                    (b1 && !b2) ||
                    (b1 && b2 && this.tensor[z2][x2][y2] < this.tensor[z1][x1][y1]) ||
                    (!b1 && !b2 && this.tensor[z2][x2][y2] < this.tensor[z1][x1][y1])
                  ) {
                    this.intercambiar(z2, x2, y2, z1, x1, y1)
                  }
                }
              }
            }
          } else {
            for (let z2 = z1; z2 < this.capas; z2++) {
              if (z1 === z2) {
                inf = x1
              } else {
                inf = 0
              }
              for (let x2 = inf; x2 < this.filas; x2++) {
                if (z1 === z2 && x1 === x2) {
                  inc = y1 + 1
                } else {
                  inc = 0
                }
                for (let y2 = inc; y2 < this.columnas; y2++) {
                  const b1 = this.tensor[z2][x2][y2] % 2 === 0
                  const b2 = this.tensor[z1][x1][y1] % 2 === 0

                  if (
                    (!b1 && b2) ||
                    (!b1 && !b2 && this.tensor[z2][x2][y2] < this.tensor[z1][x1][y1]) ||
                    (b1 && b2 && this.tensor[z2][x2][y2] < this.tensor[z1][x1][y1])
                  ) {
                    this.intercambiar(z2, x2, y2, z1, x1, y1)
                  }
                }
              }
            }
          }
          bool = !bool
        }
      }
    }
  }

  #checarDireccion (direccion: string): never | void {
    if (direccion !== 'asc' && direccion !== 'desc') { throw new Error("La dirección tiene que ser 'asc' o 'desc'") }
  }

  #checarMethodsOfNumero (method: MethodsOfNumero): never | void {
    const index = methodsOfNumero.indexOf(method)
    if (index === -1) { throw new Error('El metodo no corresponse a una funcion de la clase Número') }
  }

  /**
   * Verifica que el tensor este ordenado
   * @param {'asc' | 'desc'} direccion direccion del ordenamiento
   * @returns {boolean}
   */
  verificarOrdenado (direccion: 'asc' | 'desc' = 'asc'): boolean {
    this.#checarDireccion(direccion)
    let control = this.tensor[0][0][0]

    for (let z1 = 0; z1 < this.capas; z1++) {
      for (let x1 = 0; x1 < this.filas; x1++) {
        for (let y1 = 0; y1 < this.columnas; y1++) {
          if (
            direccion === 'asc'
              ? this.tensor[z1][x1][y1] < control
              : this.tensor[z1][x1][y1] > control
          ) {
            return false
          }
          control = this.tensor[z1][x1][y1]
        }
      }
    }
    return true
  }

  /**
   * Busca la posición del número
   * @param {number}num número
   * @returns {number[]} La posición del número en formato [x, y, z], o [null, null, null] si no se encuentra.
   */
  buscarPosicion (num: number): number[] | null[] {
    for (let z = 0; z < this.capas; z++) {
      for (let x = 0; x < this.filas; x++) {
        for (let y = 0; y < this.columnas; y++) {
          if (this.tensor[z][x][y] === num) {
            return [x, y, z]
          }
        }
      }
    }
    return [null, null, null]
  }

  /**
   * Frecuencia de aparicion del número
   * @param {number}num número
   * @returns {number}
   */
  frecuencia (num: number): number {
    let frec = 0
    for (let z = 0; z < this.capas; z++) {
      for (let x = 0; x < this.filas; x++) {
        for (let y = 0; y < this.columnas; y++) {
          if (this.tensor[z][x][y] === num) {
            frec++
          }
        }
      }
    }
    return frec
  }
}


// pendiente:
// multiplicación
