export type MethodsOfNumero =
  | 'esPar'
  | 'esPrimo'
  | 'esCapicua'
  | 'esCuadradoPerfecto'
  | 'esFibonacci';

export interface objetoMaxYFrec {
  maximo: number
  frecuencia: number

}

/*
Dimensiones de una matriz
*/
export interface MatrizDimension {
  rows: number
  columns: number
}

export interface TensorDimension { rows: number, columns: number, layers: number }
