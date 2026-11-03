import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import Tensor from '../src/class/Tensor';
import type { MethodsOfNumero } from '../src/types/types';

function arithmetic(rows: number, columns: number, layers: number, start = 1, reason = 1): Tensor {
  const tensor = new Tensor();
  tensor.cargarSerieAritmetica(rows, columns, layers, start, reason);
  return tensor;
}

describe('Tensor', () => {
  it('loads random values with the requested dimensions', () => {
    const tensor = new Tensor();
    tensor.cargar(2, 3, 2, 1, 5);

    assert.equal(tensor.rowLength(), 2);
    assert.equal(tensor.columnLength(), 3);
    assert.equal(tensor.layers(), 2);
    assert.deepEqual(tensor.retornarDimension(), { rows: 2, columns: 3, layers: 2 });

    for (const layer of tensor.tensor()) {
      for (const row of layer) {
        for (const value of row) {
          assert.ok(value >= 1);
          assert.ok(value <= 5);
        }
      }
    }
  });

  it('returns a copy of the tensor', () => {
    const tensor = arithmetic(2, 2, 2);
    const copy = tensor.tensor();
    copy[0][0][0] = 99;

    assert.deepEqual(tensor.tensor(), [
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 8],
      ],
    ]);
  });

  it('loads arithmetic and geometric series', () => {
    assert.deepEqual(arithmetic(2, 2, 2).tensor(), [
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 8],
      ],
    ]);

    const geometric = new Tensor();
    geometric.cargarSerieGeometrica(2, 2, 2, 1, 2);
    assert.deepEqual(geometric.tensor(), [
      [
        [1, 2],
        [4, 8],
      ],
      [
        [16, 32],
        [64, 128],
      ],
    ]);
  });

  it('checks membership and comparisons', () => {
    const tensor = arithmetic(2, 2, 2);

    assert.equal(tensor.pertenencia(5), true);
    assert.equal(tensor.pertenencia(9), false);
    assert.equal(tensor.verificarMayor(8), true);
    assert.equal(tensor.verificarMayor(7), false);
    assert.equal(tensor.verificarMenor(1), true);
    assert.equal(tensor.verificarMenor(2), false);
  });

  it('checks if the tensor is sorted', () => {
    assert.equal(arithmetic(2, 2, 2).verificarOrdenado('asc'), true);
    assert.equal(arithmetic(2, 2, 2).verificarOrdenado('desc'), false);
    assert.equal(arithmetic(2, 2, 2, 8, -1).verificarOrdenado('desc'), true);
    assert.throws(() => arithmetic(2, 2, 2).verificarOrdenado('up' as 'asc'), /dirección/);
  });

  it('checks if the tensor is sorted by a reason', () => {
    assert.equal(arithmetic(2, 2, 2).verificarOrdenadoRazon(1), true);
    assert.equal(arithmetic(2, 2, 2).verificarOrdenadoRazon(2), false);
  });

  it('checks if all elements are equal or unique', () => {
    assert.equal(arithmetic(2, 2, 2, 5, 0).verificarTodosIguales(), true);
    assert.equal(arithmetic(2, 2, 2).verificarTodosIguales(), false);

    assert.equal(arithmetic(2, 2, 2).verificarTodosUnicos(), true);
    assert.equal(arithmetic(2, 2, 2, 5, 0).verificarTodosUnicos(), false);
  });

  it('adds and subtracts tensors', () => {
    const t1 = arithmetic(2, 2, 2);
    const t2 = arithmetic(2, 2, 2, 8, -1);

    const sum = new Tensor();
    sum.suma(t1, t2);
    assert.deepEqual(sum.tensor(), [
      [
        [9, 9],
        [9, 9],
      ],
      [
        [9, 9],
        [9, 9],
      ],
    ]);

    const rest = new Tensor();
    rest.resta(t1, t2);
    assert.deepEqual(rest.tensor(), [
      [
        [-7, -5],
        [-3, -1],
      ],
      [
        [1, 3],
        [5, 7],
      ],
    ]);
  });

  it('throws when adding or subtracting tensors of different dimensions', () => {
    const t1 = arithmetic(2, 2, 2);
    const t2 = arithmetic(2, 3, 2);

    assert.throws(() => new Tensor().suma(t1, t2), /dimensiones diferentes/);
    assert.throws(() => new Tensor().resta(t1, t2), /dimensiones diferentes/);
  });

  it('multiplies by a scalar', () => {
    const tensor = arithmetic(2, 2, 2);
    tensor.multiplicacionPorEscalar(2);

    assert.deepEqual(tensor.tensor(), [
      [
        [2, 4],
        [6, 8],
      ],
      [
        [10, 12],
        [14, 16],
      ],
    ]);
  });

  it('transposes the tensor', () => {
    const tensor = arithmetic(2, 2, 2);
    tensor.transposicion();

    assert.deepEqual(tensor.tensor(), [
      [
        [1, 5],
        [3, 7],
      ],
      [
        [2, 6],
        [4, 8],
      ],
    ]);
    assert.deepEqual(tensor.retornarDimension(), { rows: 2, columns: 2, layers: 2 });
  });

  it('swaps two elements', () => {
    const tensor = arithmetic(2, 2, 2);
    tensor.intercambiar(0, 0, 0, 1, 1, 1);

    assert.deepEqual(tensor.tensor(), [
      [
        [8, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 1],
      ],
    ]);
  });

  it('gets the largest and smallest element', () => {
    const tensor = arithmetic(2, 2, 2);

    assert.equal(tensor.devolverMayor(), 8);
    assert.equal(tensor.devolverMenor(), 1);
    assert.throws(() => new Tensor().devolverMayor(), /vacía/);
  });

  it('sorts the tensor ascending and descending', () => {
    const asc = arithmetic(2, 2, 2, 8, -1);
    asc.ordenar('asc');
    assert.deepEqual(asc.tensor(), [
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 8],
      ],
    ]);

    const desc = arithmetic(2, 2, 2);
    desc.ordenar('desc');
    assert.deepEqual(desc.tensor(), [
      [
        [8, 7],
        [6, 5],
      ],
      [
        [4, 3],
        [2, 1],
      ],
    ]);
  });

  it('throws when sorting with an invalid direction', () => {
    assert.throws(() => arithmetic(2, 2, 2).ordenar('up' as 'asc'), /dirección/);
  });

  it('segments the tensor by a Numero method', () => {
    const tensor = arithmetic(2, 2, 2);
    tensor.segmentar('esPar');

    assert.deepEqual(tensor.tensor(), [
      [
        [2, 4],
        [6, 8],
      ],
      [
        [1, 3],
        [5, 7],
      ],
    ]);
  });

  it('interleaves the tensor by a Numero method', () => {
    const tensor = arithmetic(2, 2, 2);
    tensor.intercalar('esPar');

    assert.deepEqual(tensor.tensor(), [
      [
        [2, 1],
        [4, 3],
      ],
      [
        [6, 5],
        [8, 7],
      ],
    ]);
  });

  it('throws when segmenting or interleaving with an invalid method', () => {
    const tensor = arithmetic(2, 2, 2);
    assert.throws(() => tensor.segmentar('noExiste' as MethodsOfNumero), /no corresponse/);
    assert.throws(() => tensor.intercalar('noExiste' as MethodsOfNumero), /no corresponse/);
  });

  it('finds the position of a number', () => {
    const tensor = arithmetic(2, 2, 2);

    assert.deepEqual(tensor.buscarPosicion(4), [1, 1, 0]);
    assert.deepEqual(tensor.buscarPosicion(9), [null, null, null]);
  });

  it('counts frequencies', () => {
    const tensor = arithmetic(2, 2, 2);

    assert.equal(tensor.frecuencia(3), 1);
    assert.equal(tensor.frecuencia(9), 0);
  });

  it('loads a Diana tensor', () => {
    const tensor = new Tensor();
    tensor.cargarDiana(3);

    assert.deepEqual(tensor.tensor(), [
      [
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ],
      [
        [2, 2, 2],
        [2, 1, 2],
        [2, 2, 2],
      ],
      [
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ],
    ]);
  });

  it('loads an L tensor', () => {
    const tensor = new Tensor();
    tensor.cargarL(3);

    assert.deepEqual(tensor.tensor(), [
      [
        [1, 2, 3],
        [2, 2, 3],
        [3, 3, 3],
      ],
      [
        [1, 2, 3],
        [2, 2, 3],
        [3, 3, 3],
      ],
      [
        [1, 2, 3],
        [2, 2, 3],
        [3, 3, 3],
      ],
    ]);
  });
});
