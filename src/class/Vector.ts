import { methodsOfNumero, type MethodsOfNumero, type objetoMaxYFrec } from '../@types/types';
import Numero from './Numero';
/**
 * Clase que representa un vector y proporciona diversas operaciones y manipulaciones.
 */
export default class Vector {
  #vector: number[] = [];
  #length = 0;
  /**
   *
   * Carga el vector con números aleatorios en un rango específico.
   * @param {number} numeroDeElementos - Número de elementos a cargar.
   * @param {number} valorInicial - Valor mínimo del rango.
   * @param {number} valorFinal - Valor máximo del rango.
   */
  cargar (numeroDeElementos: number, valorInicial: number, valorFinal: number): void {
    this.#length = numeroDeElementos;
    for (let i = 0; i < this.#length; i++) {
      const numeroAleatorio = Math.floor(Math.random() * valorFinal) + valorInicial;
      this.#vector[i] = numeroAleatorio;
    }
  }

  /**
   * El Vector
   * @returns {number[]}
   */
  vector (): number[] {
    return structuredClone(this.#vector);
  }

  length (): number {
    return this.#length;
  }

  /**
   * Carga un elemento en el vector.
   * @param {number} numero - Elemento a cargar.
   */
  cargarElementoXElemento (numero: number): void {
    this.#vector[this.#length] = numero;
    this.#length++;
  }

  /**
   * Descarga el vector en formato de cadena.
   * @returns {string} - Cadena que representa el vector.
   */
  descargar (): string {
    let s = '';
    for (let i = 0; i < this.#length; i++) {
      s = s + this.#vector[i] + '|';
    }
    return s;
  }

  /**
   * Carga el vector con una serie aritmética.
   * @param {number} numeroDeElementos - Número de elementos a cargar.
   * @param {number} valorInicial - Primer término de la serie.
   * @param {number} razon - Razón de la serie.
   */
  cargarSerieAritmetica (
    numeroDeElementos: number,
    valorInicial: number,
    razon: number
  ): void {
    this.#length = numeroDeElementos;
    for (let i = 0; i < this.#length; i++) {
      this.#vector[i] = valorInicial + i * razon;
    }
  }

  /**
   * Metodo que carga serie Geometrica
   * @param {number} numeroDeElementos - Número de elementos a cargar.
   * @param {number} valorInicial - Primer término de la serie.
   * @param {number} razon - Razón de la serie.
   * @returns {void}
   */
  cargarSerieGeometrica (numeroDeElementos: number, valorInicial: number, razon: number): void {
    this.#length = numeroDeElementos;
    let n = 1;

    for (let i = 0; i < this.#length; i++, n++) {
      this.#vector[i] = valorInicial * Math.round(Math.pow(razon, n - 1));
    }
  }

  /**
   * Carga el vector con una serie de Fibonacci.
   * @param {number} numeroDeElementos - Número de elementos a cargar.
   */
  cargarSerieFibonacci (numeroDeElementos: number): void {
    if (numeroDeElementos <= 0) return;
    else if (numeroDeElementos === 1) {
      this.#vector[0] = 0;
      this.#length = 1;
    } else if (numeroDeElementos >= 2) {
      this.#vector[0] = 0;
      this.#vector[1] = 1;
      this.#length = numeroDeElementos;
    }

    for (let i = 2; i < this.#length; i++) {
      this.#vector[i] = this.#vector[i - 1] + this.#vector[i - 2];
    }
  }

  /**
   * Selecciona elementos del vector por posición en un intervalo específico.
   * @param {number} intervalo - Intervalo de selección.
   * @param {Vector} v2 - Vector donde se cargarán los elementos seleccionados.
   */
  seleccionarPorPosicion (intervalo: number, v2: Vector): void {
    const numeroDePosiciones = this.#length / intervalo;
    for (let i = 0; i < numeroDePosiciones; i++) {
      v2.cargarElementoXElemento(this.#vector[i * intervalo]);
    }
  }

  /**
   * Selecciona los números primos del vector y los carga en otro vector.
   * @example
   * const v1 = new Vector();
   * const v2 = new Vector();
   * v1.cargar(10,1,9);
   * v1.seleccionar(v2,'verificarPar', true)
   * console.log(v2.descargar()) // 2, 4, 6, 8
   * v1.seleccionar(v2, 'verificarPar', false)
   * console.log(v2.descargar()) // 1, 3, 5, 7
   * @param {Vector} v2 - Vector donde se cargarán los números primos.
   * @param {MethodsOfNumero} method Metodo de la clase Número
   * @param {Boolean} yesOrNo  Valor Booleano
   */
  seleccionar (v2: Vector, method: MethodsOfNumero, yesOrNo: boolean = true): void {
    this.#checarMethodsOfNumero(method);

    const n1 = new Numero();
    for (let i = 0; i < this.#length; i++) {
      n1.cargar(this.#vector[i]);
      if (n1[method]() === yesOrNo) {
        v2.cargarElementoXElemento(this.#vector[i]);
      }
    }
  }

  /**
   * Selecciona los números mayores que la media más la desviación estándar y los carga en otro vector.
   * @param {Vector} v2 - Vector donde se cargarán los números seleccionados.
   */
  seleccionarBuenos (v2: Vector): void {
    const media = this.promedio();
    const estandar = this.desviacionEstandar();
    const rango = media + estandar;

    for (let i = 0; i < this.#length; i++) {
      if (this.#vector[i] > rango) {
        v2.cargarElementoXElemento(this.#vector[i]);
      }
    }
  }

  #checarParametros (a: number, b: number): never | void {
    if (a < 0 || a > this.#length - 1 || b < 0 || b > this.#length - 1) { throw new Error('Parametros fuera de los limites'); } else if (a > b) {
      throw new Error(`a = ${a} tiene que ser menor o igual que (<=) b = ${b}`);
    }
  }

  #checarDireccion (direccion: string): never | void {
    if (direccion !== 'asc' && direccion !== 'desc') { throw new Error("La dirección tiene que ser 'asc' o 'desc'"); }
  }

  #checarMethodsOfNumero (method: MethodsOfNumero): never | void {
    const index = methodsOfNumero.indexOf(method);
    if (index === -1) { throw new Error('El metodo no corresponse a una funcion de la clase Número'); }
  }

  /**
   * suma los números del vector
   * @param a posicion inicial
   * @param b posicion final
   * @returns la suma
   */
  sumar (a = 0, b = this.#length - 1): number {
    this.#checarParametros(a, b);
    let suma = 0;
    for (let i = a; i <= b; i++) {
      suma = suma + this.#vector[i];
    }
    return suma;
  }

  /**
   * Encuentra y devuelve el valor máximo en el vector.
   * @param {number} a posicion inicial
   * @param {number} b posicion final
   * @returns {number} - Valor máximo en el vector.
   */
  maximo (a: number = 0, b: number = this.#length - 1): number {
    this.#checarParametros(a, b);
    let dr = this.#vector[a];
    for (let i = a; i <= b; i++) {
      if (this.#vector[i] > dr) {
        dr = this.#vector[i];
      }
    }
    return dr;
  }

  /**
   * Calcula y devuelve la frecuencia de un elemento en el vector.
   * @param {number} elemento - Elemento cuya frecuencia se desea calcular.
   * @param {number} a posicion inicial
   * @param {number} b posicion final
   * @returns {number} - Frecuencia del elemento en el vector.
   */
  frecuencia (elemento: number, a: number = 0, b: number = this.#length - 1): number {
    this.#checarParametros(a, b);
    let c = 0;
    for (let i = a; i <= b; i++) {
      if (this.#vector[i] === elemento) {
        c++;
      }
    }
    return c;
  }

  /**
   * Calcula y asigna el valor máximo y su frecuencia a un objeto dado.
   * @param {object} objetoMaxYFrec - Objeto que almacenará el máximo y su frecuencia.
   * @property {number} objetoMaxYFrec.maximo - Valor máximo en el vector.
   * @property {number} objetoMaxYFrec.frecuencia - Frecuencia del valor máximo.
   */
  maximoYfrecuencia (
    objetoMaxYFrec: objetoMaxYFrec,
    a: number = 0,
    b: number = this.#length - 1
  ): void {
    this.#checarParametros(a, b);
    objetoMaxYFrec.maximo = this.maximo(a, b);
    objetoMaxYFrec.frecuencia = this.frecuencia(objetoMaxYFrec.maximo, a, b);
  }

  /**
   * Calcula y devuelve el promedio de los elementos en el vector.
   * @param {number} a posicion inicial
   * @param {number} a posicion final
   * @returns {number} - Promedio de los elementos en el vector.
   */
  promedio (a: number = 0, b: number = this.#length - 1): number {
    this.#checarParametros(a, b);
    return this.sumar(a, b) / b + 1;
  }

  /**
   * Calcula y devuelve la desviación media de los elementos en el vector.
   * @param {number} a posicion inicial
   * @param {number} a posicion final
   * @returns {number} - Desviación media de los elementos en el vector.
   */
  desviacionMedia (a: number = 0, b: number = this.#length - 1): number {
    this.#checarParametros(a, b);
    const media = this.promedio();
    let suma = 0;
    for (let i = a; i <= b; i++) {
      suma += Math.abs(this.#vector[i] - media);
    }
    return suma / this.#length;
  }

  /**
   * Calcula y devuelve la desviación estándar de los elementos en el vector.
   * @param {number} a posicion inicial
   * @param {number} a posicion final
   * @returns {number} - Desviación estándar de los elementos en el vector.
   */
  desviacionEstandar (a: number = 0, b: number = this.#length - 1): number {
    this.#checarParametros(a, b);
    const media = this.promedio();
    let suma = 0;
    for (let i = 0; i < this.#length; i++) {
      suma += Math.pow(this.#vector[i] - media, 2);
    }
    return Math.sqrt(suma / this.#length);
  }

  /**
   * Realiza una búsqueda binaria en el vector para encontrar un valor específico.
   * @param {number} valorBuscado - Valor a buscar en el vector.
   * @param {number} a posicion inic/al
   * @param {number} a posicion final
   * @returns {boolean} - `true` si se encuentra el valor, `false` de lo contrario.
   */
  busquedaBinaria (
    valorBuscado: number,
    a: number = 0,
    b: number = this.#length - 1
  ): boolean {
    this.#checarParametros(a, b);
    this.bubbleSort('asc', a, b);
    let izquierda = a;
    let derecha = b + 1;

    while (izquierda <= derecha) {
      const medio = izquierda + Math.floor((derecha - izquierda) / 2);

      if (this.#vector[medio] === valorBuscado) {
        return true;
      }
      if (this.#vector[medio] > valorBuscado) {
        derecha = medio - 1;
      } else {
        izquierda = medio + 1;
      }
    }
    return false;
  }

  /**
   * Realiza una búsqueda secuencial en el vector para encontrar un valor específico.
   * @param {number} valorBuscado - Valor a buscar en el vector.
   * @param {number} a posicion inicial
   * @param {number} a posicion final
   * @returns {boolean} - `true` si se encuentra el valor, `false` de lo contrario.
   */
  busquedaSecuencial (
    valorBuscado: number,
    a: number = 0,
    b: number = this.#length - 1
  ): boolean {
    this.#checarParametros(a, b);

    for (let i = a; i <= b; i++) {
      if (valorBuscado === this.#vector[i]) {
        return true;
      }
    }

    return false;
  }

  /**
   * Retorna la dimensión del vector (número de elementos).
   * @returns {number} - Número de elementos en el vector.
   */
  retornarDimension (): number {
    return this.#length;
  }

  /**
   * Retorna el elemento en una posición específica del vector.
   * @param {number} elemento - Posición del elemento a retornar.
   * @returns {number} - Elemento en la posición especificada.
   */
  retornarNumero (elemento: number): number {
    return this.#vector[elemento];
  }

  /**
   * Elimina los elementos duplicados del vector.
   */
  eliminarDuplicados (): void {
    this.#vector = Array.from(new Set(this.#vector));
    this.#length = this.#vector.length;
  }

  /**
   * Intercambia dos elementos en posiciones específicas del vector.
   * @param {number} a - Posición del primer elemento.
   * @param {number} b - Posición del segundo elemento.
   */
  intercambiar (a: number, b: number): void {
    ;[this.#vector[a], this.#vector[b]] = [this.#vector[b], this.#vector[a]];
  }

  /**
   * Desordena los elementos del vector
   * @param a posicion inicial
   * @param b posicion final
   */
  desordenar (a: number, b: number): void {
    this.#checarParametros(a, b);
    for (let i = a; i <= b; i++) {
      this.intercambiar(i, Numero.random(a, b));
    }
  }

  /**
   * Ordena los elementos del vector mediante el algoritmo bogo sort.
   * @param {'asc' | 'desc'} direccion direccion del ordenamiento
   * @param {number} a posicion inicial
   * @param {number} b posicion final
   */
  bogoSort (
    direccion: 'asc' | 'desc' = 'asc',
    a: number = 0,
    b: number = this.#length - 1
  ): void {
    this.#checarParametros(a, b);
    this.#checarDireccion(direccion);

    while (!this.verificarOrdenado(direccion, a, b)) {
      this.desordenar(a, b);
    }
  }

  /**
   * Ordena los elementos del vector mediante el algoritmo bubble sort.
   * @param {'asc' | 'desc'} direccion direccion del ordenamiento
   * @param {number} a posicion inicial
   * @param {number} b posicion final
   */
  bubbleSort (
    direccion: 'asc' | 'desc' = 'asc',
    a: number = 0,
    b: number = this.#length - 1
  ): void {
    this.#checarParametros(a, b);
    this.#checarDireccion(direccion);

    const n = b + 1;
    for (let i = 1; i < n; i++) {
      for (let j = a; j < n - 1; j++) {
        if (direccion === 'asc' ? this.#vector[j] > this.#vector[j + 1] : this.#vector[j] < this.#vector[j + 1]) {
          this.intercambiar(j, j + 1);
        }
      }
    }
  }

  /**
   * Ordena los elementos del vector mediante el algoritmo insertion sort.
   * @param {'asc' | 'desc'} direccion direccion del ordenamiento
   * @param {number} a posicion inicial
   * @param {number} b posicion final
   */
  insertionSort (
    direccion: 'asc' | 'desc' = 'asc',
    a: number = 0,
    b: number = this.#length - 1
  ): void {
    this.#checarParametros(a, b);
    this.#checarDireccion(direccion);

    for (let i = a + 1; i < b; i++) {
      let j = i;
      while (j > 0 && direccion === 'asc' ? this.#vector[j - 1] > this.#vector[j] : this.#vector[j - 1] < this.#vector[j]) {
        this.intercambiar(j, j - 1);
        j--;
      }
    }
  }

  /**
   * Ordena los elementos del vector mediante el algoritmo selection sort.
   * @param {'asc' | 'desc'} direccion direccion del ordenamiento
   * @param {number} a posicion inicial
   * @param {number} b posicion final
   */
  selectionSort (
    direccion: 'asc' | 'desc' = 'asc',
    a: number = 0,
    b: number = this.#length - 1
  ): void {
    this.#checarParametros(a, b);
    this.#checarDireccion(direccion);

    for (let i = a; i <= b; i++) {
      let indice = i;
      for (let j = i + 1; j <= b; j++) {
        if (
          direccion === 'asc'
            ? this.#vector[j] < this.#vector[indice]
            : this.#vector[j] > this.#vector[indice]
        ) {
          indice = j;
        }
      }
      this.intercambiar(i, indice);
    }
  }

  /**
   * Ordena los elementos del vector mediante el algoritmo shell sort.
   * @param {'asc' | 'desc'} direccion direccion del ordenamiento
   * @param {number} a posicion inicial
   * @param {number} b posicion final
   */
  shellSort (
    direccion: 'asc' | 'desc' = 'asc',
    a: number = 0,
    b: number = this.#length - 1
  ): void {
    this.#checarParametros(a, b);
    this.#checarDireccion(direccion);

    let intervalo = Math.floor((b - a + 1) / 2);
    while (intervalo >= 1) {
      for (let i = a; i <= b; i++) {
        if (intervalo + i > b) break;
        if (direccion === 'asc' ? this.#vector[i] > this.#vector[intervalo + i] : this.#vector[i] < this.#vector[intervalo + i]) {
          this.intercambiar(i, intervalo + i);
          for (let j = i; j > a; j = j - intervalo) {
            if (j - intervalo < a) break;
            if (direccion === 'asc' ? this.#vector[j - intervalo] > this.#vector[j] : this.#vector[j - intervalo] < this.#vector[j]) {
              this.intercambiar(j - intervalo, j);
            }
          }
        }
      }
      intervalo = Math.floor(intervalo / 2);
    }
  }

  /**
   * Ordena los elementos del vector mediante el algoritmo merge sort.
   * @param {'asc' | 'desc'} direccion direccion del ordenamiento
   * @param {number} a posicion inicial
   * @param {number} b posicion final
   */
  mergeSort (
    direccion: 'asc' | 'desc' = 'asc',
    a: number = 0,
    b: number = this.#length - 1
  ): void {
    this.#checarParametros(a, b);
    this.#checarDireccion(direccion);

    const merge = (a: number, b: number, c: number): void => {
      let i, j, k;
      const n1 = c - a + 1;
      const n2 = b - c;
      const L: number[] = new Array(n1);
      const R: number[] = new Array(n2);
      for (i = 0; i < n1; i++) { L[i] = this.#vector[a + i]; }
      for (j = 0; j < n2; j++) { R[j] = this.#vector[c + j + 1]; }
      i = 0; j = 0; k = a;
      while (i < n1 && j < n2) {
        if (direccion === 'asc' ? L[i] <= R[j] : L[i] >= R[j]) {
          this.#vector[k] = L[i];
          i++;
        } else {
          this.#vector[k] = R[j];
          j++;
        }
        k++;
      }
      while (i < n1) {
        this.#vector[k] = L[i];
        i++; k++;
      }

      while (j < n2) {
        this.#vector[k] = R[j];
        j++; k++;
      }
    };

    const sort = (a: number, b: number): void => {
      const n = b - a + 1;
      if (n > 1) {
        const c = Math.floor((a + b) / 2);
        sort(a, c);
        sort(c + 1, b);
        merge(a, b, c);
      }
    };
    sort(a, b);
  }

  /**
   * Ordena los elementos del vector mediante el algoritmo quick sort.
   * @param {'asc' | 'desc'} direccion direccion del ordenamiento
   * @param {number} a posicion inicial
   * @param {number} b posicion final
   */
  quickSort (
    direccion: 'asc' | 'desc' = 'asc',
    a: number = 0,
    b: number = this.#length - 1
  ): void {
    this.#checarParametros(a, b);
    this.#checarDireccion(direccion);

    const partition = (a: number, b: number): number => {
      let sw = true;
      while (a < b) {
        if (direccion === 'asc' ? this.#vector[a] > this.#vector[b] : this.#vector[a] < this.#vector[b]) {
          this.intercambiar(a, b);
          sw = !sw;
        }
        sw ? a++ : b--;
      }
      return a;
    };
    const sort = (a: number, b: number): void => {
      const n = b - a + 1;
      if (n > 1) {
        const c = partition(a, b);
        sort(a, c - 1);
        sort(c + 1, b);
      }
    };
    sort(a, b);
  }

  /**
   * Ordena los elementos del vector mediante el algoritmo counting sort.
   * @param {'asc' | 'desc'} direccion direccion del ordenamiento
   * @param {number} a posicion inicial
   * @param {number} b posicion final
   */
  countingSort (
    direccion: 'asc' | 'desc' = 'asc',
    a: number = 0,
    b: number = this.#length - 1
  ): void {
    this.#checarParametros(a, b);
    this.#checarDireccion(direccion);

    let min = this.#vector[a];
    let max = this.#vector[a];

    for (let i = a + 1; i <= b; i++) {
      if (this.#vector[i] < min) min = this.#vector[i];
      if (this.#vector[i] > max) max = this.#vector[i];
    }

    const count = new Array(max - min + 1).fill(0);

    for (let i = a; i <= b; i++) {
      count[this.#vector[i] - min]++;
    }

    if (direccion === 'asc') {
      for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
      }
    } else {
      for (let i = count.length - 2; i >= 0; i--) {
        count[i] += count[i + 1];
      }
    }

    const output = new Array(b - a + 1);
    for (let i = b; i >= a; i--) {
      const index = direccion === 'asc' ? count[this.#vector[i] - min] - 1 : count[this.#vector[i] - min] - 1;
      output[index] = this.#vector[i];
      count[this.#vector[i] - min]--;
    }

    for (let i = 0; i < output.length; i++) {
      this.#vector[a + i] = output[i];
    }
  }

  /**
   * Verifica si un número pertenece al vector.
   * @param {number} numero - Número a verificar.
   * @param {number} a posicion inicial
   * @param {number} b posicion final
   * @returns {boolean} - `true` si el número pertenece al vector, `false` de lo contrario.
   */
  pertenencia (numero: number, a: number = 0, b: number = this.#length - 1): boolean {
    this.#checarParametros(a, b);
    let pertenece = false;
    for (let i = a; i <= b; i++) {
      if (this.#vector[i] === numero) {
        pertenece = true;
        return pertenece;
      }
    }
    return pertenece;
  }

  /**
   * Obtiene la intersección de dos cactualonjuntos y carga el resultado en el vector.
   * @param {Vector} v1 - Primer conjunto.
   * @param {Vector} v2 - Segundo conjunto.
   * @return {void} carga el vector actual la interseccion
   */
  interseccionDeConjuntos (v1: Vector, v2: Vector): void {
    const longitudV1 = v1.#length;
    const longitudV2 = v2.#length;
    const vector1 = v1.#vector;
    const vector2 = v2.#vector;

    for (let i = 0; i < longitudV1; i++) {
      for (let j = 0; j < longitudV2; j++) {
        if (vector1[i] === vector2[j]) {
          this.cargarElementoXElemento(vector1[i]);
          break;
        }
      }
    }
    this.eliminarDuplicados();
  }

  /**
   * Obtiene la unión de dos conjuntos y carga el resultado en el vector actual.
   * @param {Vector} v1 - Primer conjunto.
   * @param {Vector} v2 - Segundo conjunto.
   */
  unionDeConjuntos (v1: Vector, v2: Vector): void {
    const longitudV1 = v1.#length;
    const longitudV2 = v2.#length;
    const vector1 = v1.#vector;
    const vector2 = v2.#vector;

    for (let i = 0; i < longitudV1; i++) {
      this.cargarElementoXElemento(vector1[i]);
    }

    for (let j = 0; j < longitudV2; j++) {
      this.cargarElementoXElemento(vector2[j]);
    }

    this.eliminarDuplicados();
  }

  /**
   * Obtiene la diferencia A - B de dos conjuntos y carga el resultado en el vector actual.
   * @param {Vector} v1 - Conjunto A.
   * @param {Vector} v2 - Conjunto B.
   */
  diferenciaDeConjuntosAB (v1: Vector, v2: Vector): void {
    const longitudV1 = v1.#length;
    const vector1 = v1.#vector;

    for (let i = 0; i < longitudV1; i++) {
      if (!v2.pertenencia(vector1[i])) {
        this.cargarElementoXElemento(vector1[i]);
      }
    }

    this.eliminarDuplicados();
  }

  /**
   * Obtiene la diferencia B - A de dos conjuntos y carga el resultado en el vector actual.
   * @param {Vector} v1 - Conjunto A.
   * @param {Vector} v2 - Conjunto B.
   */
  diferenciaDeConjuntosBA (v1: Vector, v2: Vector): void {
    const longitudV2 = v2.#length;
    const vector2 = v2.#vector;

    for (let i = 0; i < longitudV2; i++) {
      if (!v1.pertenencia(vector2[i])) {
        this.cargarElementoXElemento(vector2[i]);
      }
    }

    this.eliminarDuplicados();
  }

  /**
   * Segmenta el vector separando los números pares de los impares.
   * @param {MethodsOfNumero} method  Metodo de la clase Número
   * @param {number} a posicion inicial
   * @param {number} b posicion final
   */
  segmentar (method: MethodsOfNumero, a: number = 0, b: number = this.#length - 1): void {
    this.#checarMethodsOfNumero(method);
    this.#checarParametros(a, b);

    const n1 = new Numero();
    const n2 = new Numero();
    for (let p = a; p < b; p++) {
      for (let d = p + 1; d <= b; d++) {
        n1.cargar(this.#vector[d]);
        n2.cargar(this.#vector[p]);
        if (
          (n1[method]() && !n2[method]()) ||
          (n1[method]() && n2[method]() && this.#vector[d] < this.#vector[p]) ||
          (!n1[method]() && !n2[method]() && this.#vector[d] < this.#vector[p])
        ) {
          this.intercambiar(d, p);
        }
      }
    }
  }



  /**
   * Intercala los números pares e impares del vector.
   * @param {MethodsOfNumero} method  Metodo de la clase Número
   * @param {number} a posicion inicial
   * @param {number} b posicion final
   */
  intercalar (method: MethodsOfNumero, a: number = 0, b: number = this.#length - 1): void {
    this.#checarMethodsOfNumero(method);
    this.#checarParametros(a, b);

    let bool = true;
    const n1 = new Numero();
    const n2 = new Numero();

    for (let p = a; p < b; p++) {
      if (bool) {
        for (let d = p + 1; d <= b; d++) {
          n1.cargar(this.#vector[d]);
          n2.cargar(this.#vector[p]);

          if (
            (n1[method]() && !n2[method]()) ||
            (n1[method]() && n2[method]() && this.#vector[d] < this.#vector[p]) ||
            (!n1[method]() && !n2[method]() && this.#vector[d] < this.#vector[p])
          ) {
            this.intercambiar(d, p);
          }
        }
      } else {
        for (let d = p + 1; d < this.#length; d++) {
          n1.cargar(this.#vector[d]);
          n2.cargar(this.#vector[p]);

          if (
            (!n1[method]() && n2[method]()) ||
            (!n1[method]() && !n2[method]() && this.#vector[d] < this.#vector[p]) ||
            (n1[method]() && n2[method]() && this.#vector[d] < this.#vector[p])
          ) {
            this.intercambiar(d, p);
          }
        }
      }
      bool = !bool;
    }
  }

  /**
   * Invierte el orden de los elementos del vector.
   * @param {number} a posicion inicial
   * @param {number} b posicion final
   */
  invertir (a: number = 0, b: number = this.#length - 1): void {
    this.#checarParametros(a, b);
    let inicio = a;
    let fin = b;
    while (inicio < fin) {
      this.intercambiar(inicio, fin);
      inicio++;
      fin--;
    }
  }

  /**
   * Cuenta los submúltiplos en el vector.
   * @returns {number} - Número de submúltiplos.
   */
  contarSubmultiplos (): number {
    let contador = 0;

    for (let i = 0; i < this.#length; i++) {
      if (this.#vector[i] % (i + 1) === 0) {
        contador++;
      }
    }
    return contador;
  }

  /**
   * Busca y devuelve el elemento mayor en el vector en posiciones múltiplos del índice dado.
   * @param {number} indice - Índice para determinar las posiciones a considerar.
   * @returns {number} - Elemento mayor.
   */
  buscarElementoMayor (indice: number): number {
    let mayor = -Infinity;
    for (let i = 0; i < this.#length; i++) {
      if (i % indice === 0 && mayor < this.#vector[i]) {
        mayor = this.#vector[i];
      }
    }
    return mayor;
  }

  /**
   * Calcula y devuelve la media de los elementos del vector en posiciones múltiplos del índice dado.
   * @param {number} indice - Índice para determinar las posiciones a considerar.
   * @returns {number} - Media de los elementos.
   */
  buscarMedia (indice: number): number {
    let suma = 0;
    let contador = 0;
    for (let i = 0; i < this.#length; i++) {
      if (i % indice === 0) {
        suma += this.#vector[i];
        contador++;
      }
    }
    return suma / contador;
  }

  /**
   * Verifica si todos los elementos del vector son iguales.
   * @param {number} a posicion inicial
   * @param {number} b posicion final
   * @returns {boolean} - Indica si todos los elementos son iguales.
   */
  verificarElementosIguales (a: number = 0, b: number = this.#length - 1): boolean {
    this.#checarParametros(a, b);

    const inicial = this.#vector[a];
    for (let i = a; i <= b; i++) {
      if (inicial !== this.#vector[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Verifica si el Vector esta ordenado
   * @param {'asc' | 'desc'} direccion direccion del ordenamiento
   * @param {number} a - posicion inicial
   * @param {number} b - posicion final
   * @returns {boolean} - Indica si el segmento está ordenado.
   */
  verificarOrdenado (direccion: 'asc' | 'desc' = 'asc', a: number, b: number): boolean {
    this.#checarDireccion(direccion);
    this.#checarParametros(a, b);
    for (let i = a; i < b; i++) {
      if (
        direccion === 'asc'
          ? this.#vector[i] > this.#vector[i + 1]
          : this.#vector[i] < this.#vector[i + 1]
      ) {
        return false;
      }
    }
    return true;
  }

  /**
   * Inserta un vector en otro en una posición específica.
   * @param {Vector} v1 - Vector a insertar.
   * @param {Vector} v2 - Vector que contiene los elementos a insertar.
   * @param {number} posicion - Posición en la que se insertará el vector.
   */
  insertarVectorPorPosicion (v1: Vector, v2: Vector, posicion: number): void {
    const n1 = v1.#length;
    const n2 = v2.#length;
    const vector1 = v1.#vector;
    const vector2 = v2.#vector;

    for (let i = 0; i < posicion; i++) {
      this.cargarElementoXElemento(vector1[i]);
    }

    for (let i = 0; i < n2; i++) {
      this.cargarElementoXElemento(vector2[i]);
    }

    for (let i = posicion; i < n1; i++) {
      this.cargarElementoXElemento(vector1[i]);
    }
  }

  /**
   * Elimina el último elemento del vector
   */
  pop (): void {
    this.#vector.pop();
    this.#length = this.#vector.length;
  }

  /**
   * Elimina los elementos de un vector indicando dos posiciones (rango).
   * @param {number} a - Índice de inicio del rango.
   * @param {number} b - Índice de fin del rango.
   */
  eliminarElementosDelVectorIndicandoLasPosiciones (a: number, b: number): void {
    this.#checarParametros(a, b);
    const n = b - a + 1;

    for (let i = b + 1; i < this.#length; i++) {
      this.#vector[i - n] = this.#vector[i];
    }

    for (let i = 0; i < n; i++) {
      this.pop();
    }
  }

  /**
   * Duplica los elementos del vector.
   */
  duplicarElementos (): void {
    const lengthOriginal = this.#length;
    this.#vector.length = lengthOriginal * 2;
    this.#length = this.#vector.length;
    for (let i = lengthOriginal; i >= 0; i--) {
      this.#vector[i + i] = this.#vector[i];
    }
    for (let i = 0; i < this.#length; i += 2) {
      this.#vector[i + 1] = this.#vector[i];
    }
  }

  /**
   * Concatena dos vectores al final del vector actual.
   * @param {Vector} v1 - Vector a concatenar.
   */
  concatenar (v1: Vector): void {
    const lenght1 = v1.#length;
    for (let i = 0; i < lenght1; i++) {
      this.cargarElementoXElemento(v1.#vector[i]);
    }
  }

  /**
   * Busca el elemento menos repetido en el vector.
   * @returns {number} - Elemento menos repetido.
   */
  buscarElementoMenosRepetido (): number {
    let leastFrequentNumber = 0;
    let minCount = this.#length + 1;

    const vector = [...this.#vector];

    for (let i = 0; i < this.#length; i++) {
      let count = 0;
      const currentNumber = vector[i];

      if (currentNumber === Number.MIN_VALUE) {
        continue;
      }

      for (let j = i; j < this.#length; j++) {
        if (vector[j] === currentNumber) {
          count++;
          vector[j] = Number.MIN_VALUE;
        }
      }

      if (count < minCount) {
        minCount = count;
        leastFrequentNumber = currentNumber;
      }
    }

    return leastFrequentNumber;
  }

  /**
   * Encuentra el elemento menos repetido entre un segmento del vector.
   * @param {number} a - Índice de inicio del segmento.
   * @param {number} b - Índice de fin del segmento.
   * @returns {number} - Elemento menos repetido en el segmento.
   */
  encontrarElementoMenosRepetidoEntreUnSegmento (a: number, b: number): number {
    const vector1 = new Vector();

    for (let i = a; i <= b; i++) {
      vector1.cargarElementoXElemento(this.#vector[i]);
    }

    const menosRepetido = vector1.buscarElementoMenosRepetido();

    return menosRepetido;
  }

  /**
   * Carga en un vector la frecuencia de cómo aparece cada número del vector actual en otro vector.
   * @param {Vector} v3 - Vector donde se carga la frecuencia.
   * @param {Vector} v2 - Vector con los elementos cuya frecuencia se va a calcular.
   */
  cargarFrecuencia (v3: Vector, v2: Vector): void {
    for (let i = 0; i < v2.#length; i++) {
      v3.cargarElementoXElemento(this.frecuencia(v2.#vector[i]));
    }
  }

  /**
   * Encuentra la frecuencia de distribución de un segmento
   * @param {number} a primer Intervalo
   * @param {number} b segundo Intervalo
   * @param {Vector} v2 objeto de la clase vector
   * @param {Vector} v3 objeto de la clase vector
   */
  encontrarLaFrecuenciaDeDistribucionDeUnSegmento (
    a: number,
    b: number,
    v2: Vector,
    v3: Vector
  ): void {
    const v1 = new Vector();

    for (let i = a; i <= b; i++) {
      v1.cargarElementoXElemento(this.#vector[i]);
    }

    v1.bubbleSort();

    for (let i = 0; i < v1.#length; i++) {
      v2.cargarElementoXElemento(v1.#vector[i]);
    }

    v2.eliminarDuplicados();

    v1.cargarFrecuencia(v3, v2);
  }

  /**
   * Cuenta la cantidad de numeros que cumplen con la condición.
   * @param {MethodsOfNumero} method Metodo de la clase Número
   * @param {number } a posicion inicial
   * @param {number } b posicion final
   * @returns {number} - Número de elementos no capicúas en el vector.
   */
  contar (method: MethodsOfNumero, a: number = 0, b: number = this.#length - 1): number {
    this.#checarMethodsOfNumero(method);
    this.#checarParametros(a, b);

    let contador = 0;
    const n1 = new Numero();

    for (let i = 0; i < this.#length; i++) {
      n1.cargar(this.#vector[i]);
      if (!n1[method]()) {
        break;
      }

      contador++;
    }
    return contador;
  }

  /**
   * Elimina un número del vector
   * @param {number} numero numero a eliminar del vector
   */
  eliminarNumero (numero: number): void {
    this.#vector = this.#vector.filter(number => number !== numero);
    this.#length = this.#vector.length;
  }

  /**
   * Carga los digitos de un número en el vector
   * @param numero numero a cargar digitos
   */
  cargarDigitos (numero: number): void {
    this.#length = numero.toString().length;
    for (let i = this.#length; i > 0; i--) {
      const digit = numero % 10;
      this.#vector[i - 1] = digit;
      numero = Math.floor(numero / 10);
    }
  }

  /**
   * Cargar El vector con la siguiente serie
   * @param numeroDeElementos Cantidad de elementos
   * @example
   * const n1 = new Vector()
   * n1.cargarSerie1(5)
   * [1, 21, 321, 4321, 54321]
   */
  cargarSerie1 (numeroDeElementos: number): void {
    const n1 = new Numero();
    this.#length = numeroDeElementos;
    for (let i = 0; i < this.#length; i++) {
      n1.cargar(i + 1);
      this.#vector[i] = n1.cuentaRegresiva();
    }
  }
}

/**
 * Pending
 * -------
 */
/**
 * TODO: Arreglar estos metodos sin usar vector auxiliar
 * --------------------------------------------------------
 * encontrarElementoMenosRepetidoEntreUnSegmento
 * encontrarLaFrecuenciaDeDistribucioNumeroreUnSegmento
 * encontrarLaFrecuenciaDeDistribucionDeUnSegmento (corregir el nombre y arreglar)
 */

