import Vector from '../src/class/Vector';
import type { Data } from '../src/class/binarysearchtree/binarysearch.node';

export function vectorFrom(values: number[]): Vector {
  const vector = new Vector();
  for (const value of values) {
    vector.cargarElementoXElemento(value);
  }
  return vector;
}

export function data(key: number, value: string = `v${key}`): Data<string> {
  return { key, value };
}
