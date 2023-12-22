/**
 * @module Vector
 */

import Integer from './Integer'
/**
 * Clase que representa un vector y proporciona diversas operaciones y manipulaciones.
 */
export default class Vector {
  v: number[] = []
  n = 0
  /**
   *
   * Carga el vector con números aleatorios en un rango específico.
   * @param {number} numeroDeElementos - Número de elementos a cargar.
   * @param {number} valorInicial - Valor mínimo del rango.
   * @param {number} valorFinal - Valor máximo del rango.
   */
  cargar(numeroDeElementos: number, valorInicial: number, valorFinal: number) {
    this.n = numeroDeElementos
    for (let i = 0; i < this.n; i++) {
      const numeroAleatorio =
        Math.floor(Math.random() * valorFinal) + valorInicial
      this.v[i] = numeroAleatorio
    }
  }
  /**
   * Carga un elemento en el vector.
   * @param {number} numero - Elemento a cargar.
   */
  cargarElementoXElemento(numero: number) {
    this.v[this.n] = numero
    this.n++
  }
  /**
   * Descarga el vector en formato de cadena.
   * @returns {string} - Cadena que representa el vector.
   */
  descargar(): string {
    return '{' + this.v.toString() + '}'
  }
  /**
   * Carga el vector con una serie aritmética.
   * @param {number} numeroDeElementos - Número de elementos a cargar.
   * @param {number} valorInicial - Primer término de la serie.
   * @param {number} razon - Razón de la serie.
   */
  cargarSerieAritmetica(
    numeroDeElementos: number,
    valorInicial: number,
    razon: number
  ) {
    this.n = numeroDeElementos
    for (let i = 0; i < this.n; i++) {
      this.v[i] = valorInicial + i * razon
    }
  }
  /**
   * Carga el vector con una serie de Fibonacci.
   * @param {number} numeroDeElementos - Número de elementos a cargar.
   */
  cargarSerieFibonacci(numeroDeElementos: number) {
    this.n = numeroDeElementos
    this.v[0] = 0
    this.v[1] = 1

    if (this.n < 0) return

    if (this.n === 1) return

    for (let i = 2; i < this.n; i++) {
      this.v[i] = this.v[i - 1] + this.v[i - 2]
    }
  }
  /**
   * Selecciona elementos del vector por posición en un intervalo específico.
   * @param {number} intervalo - Intervalo de selección.
   * @param {Vector} v2 - Vector donde se cargarán los elementos seleccionados.
   */
  seleccionarPorPosicion(intervalo: number, v2: Vector) {
    const numeroDePosiciones = this.n / intervalo
    for (let i = 0; i < numeroDePosiciones; i++) {
      v2.cargarElementoXElemento(this.v[i * intervalo])
    }
  }
  /**
   * Selecciona los números primos del vector y los carga en otro vector.
   * @param {Vector} v2 - Vector donde se cargarán los números primos.
   */
  seleccionarPrimos(v2: Vector) {
    const n1 = new Integer()
    for (let i = 0; i < this.n; i++) {
      n1.cargar(this.v[i])
      if (n1.verificarPrimo()) {
        v2.cargarElementoXElemento(this.v[i])
      }
    }
  }
  /**
   * Selecciona los números no primos del vector y los carga en otro vector.
   * @param {Vector} v3 - Vector donde se cargarán los números no primos.
   */
  seleccionarNoPrimos(v3: Vector) {
    const n1 = new Integer()
    for (let i = 0; i < this.n; i++) {
      n1.cargar(this.v[i])
      if (!n1.verificarPrimo()) {
        v3.cargarElementoXElemento(this.v[i])
      }
    }
  }
  /**
   * Selecciona los números mayores que la media más la desviación estándar y los carga en otro vector.
   * @param {Vector} v2 - Vector donde se cargarán los números seleccionados.
   */
  seleccionarBuenos(v2: Vector) {
    const media = this.promedio()
    const estandar = this.desviacionEstandar()
    const rango = media + estandar

    for (let i = 0; i < this.n; i++) {
      if (this.v[i] > rango) {
        v2.cargarElementoXElemento(this.v[i])
      }
    }
  }
  /**
   * Encuentra y devuelve el valor máximo en el vector.
   * @returns {number} - Valor máximo en el vector.
   */
  maximo(): number {
    let dr = this.v[0]
    for (let i = 1; i < this.n; i++) {
      if (this.v[i] > dr) {
        dr = this.v[i]
      }
    }
    return dr
  }
  /**
   * Calcula y devuelve la frecuencia de un elemento en el vector.
   * @param {number} elemento - Elemento cuya frecuencia se desea calcular.
   * @returns {number} - Frecuencia del elemento en el vector.
   */
  frecuencia(elemento: number): number {
    let c = 0
    for (let i = this.n - 1; i >= 0; i--) {
      if (this.v[i] === elemento) {
        c++
      }
    }
    return c
  }
  /**
   * Calcula y asigna el valor máximo y su frecuencia a un objeto dado.
   * @param {object} objetoMaxYFrec - Objeto que almacenará el máximo y su frecuencia.
   * @property {number} objetoMaxYFrec.maximo - Valor máximo en el vector.
   * @property {number} objetoMaxYFrec.frecuencia - Frecuencia del valor máximo.
   */
  maximoYfrecuencia(objetoMaxYFrec: object) {
    //@ts-ignore
    objetoMaxYFrec.maximo = this.maximo()
    //@ts-ignore
    objetoMaxYFrec.frecuencia = this.frecuencia(objetoMaxYFrec.maximo)
  }
  /**
   * Calcula y devuelve el promedio de los elementos en el vector.
   * @returns {number} - Promedio de los elementos en el vector.
   */
  promedio(): number {
    let suma = 0
    for (let i = 0; i < this.n; i++) {
      suma += this.v[i]
    }
    return suma / this.n
  }
  /**
   * Calcula y devuelve la desviación media de los elementos en el vector.
   * @returns {number} - Desviación media de los elementos en el vector.
   */
  desviacionMedia(): number {
    const media = this.promedio()
    let suma = 0
    for (let i = 0; i < this.n; i++) {
      suma += Math.abs(this.v[i] - media)
    }
    return suma / this.n
  }
  /**
   * Calcula y devuelve la desviación estándar de los elementos en el vector.
   * @returns {number} - Desviación estándar de los elementos en el vector.
   */
  desviacionEstandar(): number {
    const media = this.promedio()
    let suma = 0
    for (let i = 0; i < this.n; i++) {
      suma += Math.pow(this.v[i] - media, 2)
    }
    return Math.sqrt(suma / this.n)
  }
  /**
   * Realiza una búsqueda binaria en el vector para encontrar un valor específico.
   * @param {number} valorBuscado - Valor a buscar en el vector.
   * @returns {boolean} - `true` si se encuentra el valor, `false` de lo contrario.
   */
  busquedaBinaria(valorBuscado: number): boolean {
    this.ordenamientoBurbujaAscendente()
    let izquierda = 0
    let derecha = this.n - 1

    while (izquierda <= derecha) {
      const medio = izquierda + Math.floor((derecha - izquierda) / 2)

      if (this.v[medio] === valorBuscado) {
        return true
      }

      if (this.v[medio] > valorBuscado) {
        derecha = medio - 1
      } else {
        izquierda = medio + 1
      }
    }
    return false
  }
  /**
   * Realiza una búsqueda secuencial en el vector para encontrar un valor específico.
   * @param {number} valorBuscado - Valor a buscar en el vector.
   * @returns {boolean} - `true` si se encuentra el valor, `false` de lo contrario.
   */
  busquedaSecuencial(valorBuscado: number): boolean {
    for (let i = 0; i < this.n; i++) {
      if (valorBuscado === this.v[i]) {
        return true
      }
    }

    return false
  }
  /**
   * Retorna la dimensión del vector (número de elementos).
   * @returns {number} - Número de elementos en el vector.
   */
  retornarDimension(): number {
    return this.n
  }
  /**
   * Retorna el elemento en una posición específica del vector.
   * @param {number} elemento - Posición del elemento a retornar.
   * @returns {number} - Elemento en la posición especificada.
   */
  retornarElemento(elemento: number): number {
    return this.v[elemento]
  }
  /**
   * Retorna el vector completo.
   * @returns {number[]} - Vector completo.
   */
  retornarVector(): number[] {
    return this.v
  }
  /**
   * Elimina los elementos duplicados del vector.
   */
  eliminarDuplicados() {
    this.v = Array.from(new Set(this.v))
    this.n = this.v.length
  }

  /**
   * Intercambia dos elementos en posiciones específicas del vector.
   * @param {number} a - Posición del primer elemento.
   * @param {number} b - Posición del segundo elemento.
   */
  intercambiarElementos(a: number, b: number) {
    const variableAuxiliar = this.v[a]
    this.v[a] = this.v[b]
    this.v[b] = variableAuxiliar
  }
  /**
   * Realiza el ordenamiento por intercambio de manera ascendente.
   */
  ordenamientoPorIntercambioAscendente() {
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (j !== this.n - 1) {
          if (this.v[j] > this.v[j + 1]) {
            this.intercambiarElementos(j, j + 1)
          }
        }
      }
    }
  }
  /**
   * Realiza el ordenamiento por intercambio de manera descendente.
   */
  ordenamientoPorIntercambioDescendente() {
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (j !== this.n - 1) {
          if (this.v[j] < this.v[j + 1]) {
            this.intercambiarElementos(j, j + 1)
          }
        }
      }
    }
  }
  /**
   * Realiza el ordenamiento por selección de manera ascendente.
   */
  ordenamientoPorSeleccionAscendente() {
    for (let i = 0; i < this.n; i++) {
      let indiceMinimo = i
      for (let j = i + 1; j < this.n; j++) {
        if (this.v[j] < this.v[indiceMinimo]) {
          indiceMinimo = j
        }
      }
      const temp = this.v[i]
      this.v[i] = this.v[indiceMinimo]
      this.v[indiceMinimo] = temp
    }
  }
  /**
   * Realiza el ordenamiento por selección de manera descendente.
   */
  ordenamientoPorSeleccionDescendente() {
    for (let i = 0; i < this.n; i++) {
      let indicemaximo = i
      for (let j = i + 1; j < this.n; j++) {
        if (this.v[j] > this.v[indicemaximo]) {
          indicemaximo = j
        }
      }
      const temp = this.v[i]
      this.v[i] = this.v[indicemaximo]
      this.v[indicemaximo] = temp
    }
  }
  /**
   * Ordena los elementos del vector mediante el algoritmo de burbuja de manera ascendente.
   */
  ordenamientoBurbujaAscendente() {
    let intercambio
    do {
      intercambio = false
      for (let i = 0; i < this.n - 1; i++) {
        if (this.v[i] > this.v[i + 1]) {
          const temp = this.v[i]
          this.v[i] = this.v[i + 1]
          this.v[i + 1] = temp
          intercambio = true
        }
      }
    } while (intercambio)
  }
  /**
   * Ordena los elementos del vector mediante el algoritmo de burbuja de manera descendente.
   */
  ordenamientoBurbujaDescendente() {
    let intercambio
    do {
      intercambio = false
      for (let i = 0; i < this.n - 1; i++) {
        if (this.v[i] < this.v[i + 1]) {
          const temp = this.v[i]
          this.v[i] = this.v[i + 1]
          this.v[i + 1] = temp
          intercambio = true
        }
      }
    } while (intercambio)
  }
  /**
   * Verifica si un número pertenece al vector.
   * @param {number} numero - Número a verificar.
   * @returns {boolean} - `true` si el número pertenece al vector, `false` de lo contrario.
   */
  pertenencia(numero: number): boolean {
    let pertenece = false
    for (let i = 0; i < this.n; i++) {
      if (this.v[i] === numero) {
        pertenece = true
        break
      }
    }
    return pertenece
  }

  /**
   * Obtiene la intersección de dos conjuntos y carga el resultado en el vector actual.
   * @param {Vector} v1 - Primer conjunto.
   * @param {Vector} v2 - Segundo conjunto.
   */
  interseccionDeConjuntos(v1: Vector, v2: Vector) {
    const longitudV1 = v1.retornarDimension()
    const longitudV2 = v2.retornarDimension()
    const vector1 = v1.retornarVector()
    const vector2 = v2.retornarVector()

    for (let i = 0; i < longitudV1; i++) {
      for (let j = 0; j < longitudV2; j++) {
        if (vector1[i] === vector2[j]) {
          this.cargarElementoXElemento(vector1[i])
          break
        }
      }
    }
    this.eliminarDuplicados()
  }
  /**
   * Obtiene la unión de dos conjuntos y carga el resultado en el vector actual.
   * @param {Vector} v1 - Primer conjunto.
   * @param {Vector} v2 - Segundo conjunto.
   */
  unionDeConjuntos(v1: Vector, v2: Vector) {
    const longitudV1 = v1.retornarDimension()
    const longitudV2 = v2.retornarDimension()
    const vector1 = v1.retornarVector()
    const vector2 = v2.retornarVector()

    for (let i = 0; i < longitudV1; i++) {
      this.cargarElementoXElemento(vector1[i])
    }

    for (let j = 0; j < longitudV2; j++) {
      this.cargarElementoXElemento(vector2[j])
    }

    this.eliminarDuplicados()
  }
  /**
   * Obtiene la diferencia A - B de dos conjuntos y carga el resultado en el vector actual.
   * @param {Vector} v1 - Conjunto A.
   * @param {Vector} v2 - Conjunto B.
   */
  diferenciaDeConjuntosAB(v1: Vector, v2: Vector) {
    const longitudV1 = v1.retornarDimension()
    const vector1 = v1.retornarVector()

    for (let i = 0; i < longitudV1; i++) {
      if (!v2.pertenencia(vector1[i])) {
        this.cargarElementoXElemento(vector1[i])
      }
    }

    this.eliminarDuplicados()
  }
  /**
   * Obtiene la diferencia B - A de dos conjuntos y carga el resultado en el vector actual.
   * @param {Vector} v1 - Conjunto A.
   * @param {Vector} v2 - Conjunto B.
   */
  diferenciaDeConjuntosBA(v1: Vector, v2: Vector) {
    const longitudV2 = v2.retornarDimension()
    const vector2 = v2.retornarVector()

    for (let i = 0; i < longitudV2; i++) {
      if (!v1.pertenencia(vector2[i])) {
        this.cargarElementoXElemento(vector2[i])
      }
    }

    this.eliminarDuplicados()
  }
  /**
   * Segmenta el vector separando los números pares de los impares.
   */
  segmentarParYNoPar() {
    const n1 = new Integer()
    const n2 = new Integer()
    for (let p = 0; p < this.n - 1; p++) {
      for (let d = p + 1; d < this.n; d++) {
        n1.cargar(this.v[d])
        n2.cargar(this.v[p])
        if (
          (n1.verificarPar() && !n2.verificarPar()) ||
          (n1.verificarPar() && n2.verificarPar() && this.v[d] < this.v[p]) ||
          (!n1.verificarPar() && !n2.verificarPar() && this.v[d] < this.v[p])
        ) {
          this.intercambiarElementos(d, p)
        }
      }
    }
  }
  /**
   * Segmenta el vector separando los números primos de los no primos.
   */
  segmentarPrimoYNoPrimo() {
    const n1 = new Integer()
    const n2 = new Integer()
    for (let p = 0; p < this.n - 1; p++) {
      for (let d = p + 1; d < this.n; d++) {
        n1.cargar(this.v[d])
        n2.cargar(this.v[p])
        if (
          (n1.verificarPrimo() && !n2.verificarPrimo()) ||
          (n1.verificarPrimo() &&
            n2.verificarPrimo() &&
            this.v[d] < this.v[p]) ||
          (!n1.verificarPrimo() &&
            !n2.verificarPrimo() &&
            this.v[d] < this.v[p])
        ) {
          this.intercambiarElementos(d, p)
        }
      }
    }
  }
  /**
   * Intercala los números pares e impares del vector.
   */
  intercalarParYNoPar() {
    let b = true
    const n1 = new Integer()
    const n2 = new Integer()

    for (let p = 0; p < this.n - 1; p++) {
      if (b) {
        for (let d = p + 1; d < this.n; d++) {
          n1.cargar(this.v[d])
          n2.cargar(this.v[p])

          if (
            (n1.verificarPar() && !n2.verificarPar()) ||
            (n1.verificarPar() && n2.verificarPar() && this.v[d] < this.v[p]) ||
            (!n1.verificarPar() && !n2.verificarPar() && this.v[d] < this.v[p])
          ) {
            this.intercambiarElementos(d, p)
          }
        }
      } else {
        for (let d = p + 1; d < this.n; d++) {
          n1.cargar(this.v[d])
          n2.cargar(this.v[p])

          if (
            (!n1.verificarPar() && n2.verificarPar()) ||
            (!n1.verificarPar() &&
              !n2.verificarPar() &&
              this.v[d] < this.v[p]) ||
            (n1.verificarPar() && n2.verificarPar() && this.v[d] < this.v[p])
          ) {
            this.intercambiarElementos(d, p)
          }
        }
      }
      b = !b
    }
  }
  /**
   * Intercala los números primos y no primos del vector.
   */
  intercalarPrimoYNoPrimo() {
    let b = true
    const n1 = new Integer()
    const n2 = new Integer()

    for (let p = 0; p < this.n - 1; p++) {
      if (b) {
        for (let d = p + 1; d < this.n; d++) {
          n1.cargar(this.v[d])
          n2.cargar(this.v[p])

          if (
            (n1.verificarPrimo() && !n2.verificarPrimo()) ||
            (n1.verificarPrimo() &&
              n2.verificarPrimo() &&
              this.v[d] < this.v[p]) ||
            (!n1.verificarPrimo() &&
              !n2.verificarPrimo() &&
              this.v[d] < this.v[p])
          ) {
            this.intercambiarElementos(d, p)
          }
        }
      } else {
        for (let d = p + 1; d < this.n; d++) {
          n1.cargar(this.v[d])
          n2.cargar(this.v[p])
          n2.verificarPrimo()

          if (
            (!n1.verificarPrimo() && n2.verificarPrimo()) ||
            (!n1.verificarPrimo() &&
              !n2.verificarPrimo() &&
              this.v[d] < this.v[p]) ||
            (n1.verificarPrimo() &&
              n2.verificarPrimo() &&
              this.v[d] < this.v[p])
          ) {
            this.intercambiarElementos(d, p)
          }
        }
      }
      b = !b
    }
  }
  /**
   * Invierte el orden de los elementos del vector.
   */
  invertir() {
    let inicio = 0
    let fin = this.n - 1
    while (inicio < fin) {
      this.intercambiarElementos(inicio, fin)
      inicio++
      fin--
    }
  }
  /**
   * Cuenta los submúltiplos en el vector.
   * @returns {number} - Número de submúltiplos.
   */
  contarSubmultiplos(): number {
    let contador = 0

    for (let i = 0; i < this.n; i++) {
      if (this.v[i] % (i + 1) === 0) {
        contador++
      }
    }
    return contador
  }
  /**
   * Busca y devuelve el elemento mayor en el vector en posiciones múltiplos del índice dado.
   * @param {number} indice - Índice para determinar las posiciones a considerar.
   * @returns {number} - Elemento mayor.
   */
  buscarElementoMayor(indice: number): number {
    let mayor = 0
    for (let i = 0; i < this.n; i++) {
      if (i % indice === 0 && mayor < this.v[i]) {
        mayor = this.v[i]
      }
    }
    return mayor
  }
  /**
   * Calcula y devuelve la media de los elementos del vector en posiciones múltiplos del índice dado.
   * @param {number} indice - Índice para determinar las posiciones a considerar.
   * @returns {number} - Media de los elementos.
   */
  buscarMedia(indice: number): number {
    let suma = 0
    let contador = 0
    for (let i = 0; i < this.n; i++) {
      if (i % indice === 0) {
        suma += this.v[i]
        contador++
      }
    }
    return suma / contador
  }
  /**
   * Verifica si todos los elementos del vector son iguales.
   * @returns {boolean} - Indica si todos los elementos son iguales.
   */
  verificarElementosIguales(): boolean {
    const inicial = this.v[0]
    for (let i = 0; i < this.n; i++) {
      if (inicial !== this.v[i]) {
        return false
      }
    }
    return true
  }
  /**
   * Verifica si un segmento del vector está ordenado de manera ascendente.
   * @param {number} a - Índice de inicio del segmento.
   * @param {number} b - Índice de fin del segmento.
   * @returns {boolean} - Indica si el segmento está ordenado.
   */
  verificarSegmentoOrdenado(a: number, b: number): boolean {
    for (let i = a; i < b; i++) {
      if (this.v[i] > this.v[i + 1]) {
        return false
      }
    }
    return true
  }
  /**
   * Inserta un vector en otro en una posición específica.
   * @param {Vector} v1 - Vector a insertar.
   * @param {Vector} v2 - Vector que contiene los elementos a insertar.
   * @param {number} posicion - Posición en la que se insertará el vector.
   */
  insertarVectorPorPosicion(v1: Vector, v2: Vector, posicion: number) {
    const n1 = v1.retornarDimension()
    const n2 = v2.retornarDimension()
    const vector1 = v1.retornarVector()
    const vector2 = v2.retornarVector()

    for (let i = 0; i < posicion; i++) {
      this.cargarElementoXElemento(vector1[i])
    }

    for (let i = 0; i < n2; i++) {
      this.cargarElementoXElemento(vector2[i])
    }

    for (let i = posicion; i < n1; i++) {
      this.cargarElementoXElemento(vector1[i])
    }
  }
  /**
   * Elimina los elementos de un vector indicando dos posiciones (rango).
   * @param {number} a - Índice de inicio del rango.
   * @param {number} b - Índice de fin del rango.
   */
  eliminarElementosDelVectorIndicandoLasPosiciones(a: number, b: number) {
    const copia = new Vector()

    for (let i = 0; i < this.n; i++) {
      if (i < a || i > b) {
        copia.cargarElementoXElemento(this.v[i])
      }
    }

    this.v = copia.v
    this.n = copia.n
  }
  /**
   * Duplica los elementos del vector.
   */
  duplicarElementos() {
    const copia = new Vector()

    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < 2; j++) {
        copia.cargarElementoXElemento(this.v[i])
      }
    }

    this.v = copia.v
    this.n = copia.n
  }
  /**
   * Concatena dos vectores al final del vector actual.
   * @param {Vector} v1 - Vector a concatenar.
   */
  concatenar(v1: Vector) {
    const n1 = v1.n
    for (let i = 0; i < n1; i++) {
      this.cargarElementoXElemento(v1.v[i])
    }
  }
  /**
   * Ordena los elementos de un segmento del vector usando el método de burbuja.
   * @param {number} a - Índice de inicio del segmento.
   * @param {number} b - Índice de fin del segmento.
   */
  ordenarElementosDeUnSegmento(a: number, b: number) {
    const vector1 = new Vector()
    const vector2 = new Vector()
    const vector3 = new Vector()

    for (let i = 0; i < a; i++) {
      vector1.cargarElementoXElemento(this.v[i])
    }

    for (let i = a; i <= b; i++) {
      vector2.cargarElementoXElemento(this.v[i])
    }

    for (let i = b + 1; i < this.n; i++) {
      vector3.cargarElementoXElemento(this.v[i])
    }

    vector2.ordenamientoBurbujaAscendente()

    vector1.concatenar(vector2)
    vector1.concatenar(vector3)

    this.v = vector1.v
    this.n = vector1.n
  }
  /**
   * Busca el elemento menos repetido en el vector.
   * @returns {number} - Elemento menos repetido.
   */
  buscarElementoMenosRepetido(): number {
    let leastFrequentNumber = 0
    let minCount = this.n + 1

    const vector = [...this.v]

    for (let i = 0; i < this.n; i++) {
      let count = 0
      const currentNumber = vector[i]

      if (currentNumber === Number.MIN_VALUE) {
        continue
      }

      for (let j = i; j < this.n; j++) {
        if (vector[j] === currentNumber) {
          count++
          vector[j] = Number.MIN_VALUE
        }
      }

      if (count < minCount) {
        minCount = count
        leastFrequentNumber = currentNumber
      }
    }

    return leastFrequentNumber
  }
  /**
   * Encuentra el elemento menos repetido entre un segmento del vector.
   * @param {number} a - Índice de inicio del segmento.
   * @param {number} b - Índice de fin del segmento.
   * @returns {number} - Elemento menos repetido en el segmento.
   */
  encontrarElementoMenosRepetidoEntreUnSegmento(a: number, b: number): number {
    const vector1 = new Vector()

    for (let i = a; i <= b; i++) {
      vector1.cargarElementoXElemento(this.v[i])
    }

    const menosRepetido = vector1.buscarElementoMenosRepetido()

    return menosRepetido
  }
  /**
   * Carga en un vector la frecuencia de cómo aparece cada número del vector actual en otro vector.
   * @param {Vector} v3 - Vector donde se carga la frecuencia.
   * @param {Vector} v2 - Vector con los elementos cuya frecuencia se va a calcular.
   */
  cargarFrecuencia(v3: Vector, v2: Vector) {
    for (let i = 0; i < v2.n; i++) {
      v3.cargarElementoXElemento(this.frecuencia(v2.v[i]))
    }
  }
  /**
   * Encuentra la frecuencia de distribución de un segmento
   * @param {number} a primer Intervalo
   * @param {number} b segundo Intervalo
   * @param {Vector} v2 objeto de la clase vector
   * @param {Vector} v3 objeto de la clase vector
   */
  encontrarLaFrecuenciaDeDistribucioIntegerreUnSegmento(
    a: number,
    b: number,
    v2: Vector,
    v3: Vector
  ) {
    const v1 = new Vector()

    for (let i = a; i <= b; i++) {
      v1.cargarElementoXElemento(this.v[i])
    }

    v1.ordenamientoBurbujaAscendente()

    for (let i = 0; i < v1.n; i++) {
      v2.cargarElementoXElemento(v1.v[i])
    }

    v2.eliminarDuplicados()

    v1.cargarFrecuencia(v3, v2)
  }
  /**
   * Cuenta la cantidad de números si capicúas en el vector.
   * @returns {number} - Número de elementos no capicúas en el vector.
   */
  contarCapicuas(): number {
    let contarCapicuas = 0
    const n1 = new Integer()

    for (let i = 0; i < this.n; i++) {
      n1.cargar(this.v[i])
      if (!n1.verificarCapicua()) {
        break
      }

      contarCapicuas++
    }
    return contarCapicuas
  }
  /**
   * Cuenta la cantidad de números no capicúas en el vector.
   * @returns {number} - Número de elementos no capicúas en el vector.
   */
  contarNoCapicuas(): number {
    let contarNoCapicuas = 0
    const n1 = new Integer()

    for (let i = 0; i < this.n; i++) {
      n1.cargar(this.v[i])
      if (n1.verificarCapicua()) {
        break
      }

      contarNoCapicuas++
    }
    return contarNoCapicuas
  }
  /**
   * Segmenta los capicuas y los no capicuas
   */
  segmentarCapicuaYNoCapicua() {
    const n1 = new Integer()
    const n2 = new Integer()
    for (let p = 0; p < this.n - 1; p++) {
      for (let d = p + 1; d < this.n; d++) {
        n1.cargar(this.v[d])
        n2.cargar(this.v[p])
        if (
          (n1.verificarCapicua() && !n2.verificarCapicua()) ||
          (n1.verificarCapicua() &&
            n2.verificarCapicua() &&
            this.v[d] < this.v[p]) ||
          (!n1.verificarCapicua() &&
            !n2.verificarCapicua() &&
            this.v[d] < this.v[p])
        ) {
          this.intercambiarElementos(d, p)
        }
      }
    }
  }
  /**
   * Intercala primos y no primos de un segmento.
   */
  intercalarPrimoYNoPrimoDeUnSegmento(a: number, b: number) {
    const vector1 = new Vector()
    const vector2 = new Vector()
    const vector3 = new Vector()

    for (let i = 0; i < a; i++) {
      vector1.cargarElementoXElemento(this.v[i])
    }

    for (let i = a; i <= b; i++) {
      vector2.cargarElementoXElemento(this.v[i])
    }

    for (let i = b + 1; i < this.n; i++) {
      vector3.cargarElementoXElemento(this.v[i])
    }

    vector2.ordenamientoBurbujaAscendente()
    vector2.intercalarPrimoYNoPrimo()

    vector1.concatenar(vector2)
    vector1.concatenar(vector3)

    this.v = vector1.v
    this.n = vector1.n
  }
}
