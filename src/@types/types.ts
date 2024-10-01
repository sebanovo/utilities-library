export type MethodsOfNumero =
  | 'esPar'
  | 'esPrimo'
  | 'esCapicua'
  | 'esCuadradoPerfecto'
  | 'esFibonacci';

export const methodsOfNumero: MethodsOfNumero[] = [
  'esPar',
  'esPrimo',
  'esCapicua',
  'esCuadradoPerfecto',
  'esFibonacci'
];

export interface objetoMaxYFrec {
  maximo: number
  frecuencia: number

}

export interface MatrizDimension {
  rows: number
  columns: number
}


export interface TensorDimension { rows: number, columns: number, layers: number }
