import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import Vector from '../src/class/Vector';
import { vectorFrom } from './helpers';

function arithmetic(count: number, start = 1, reason = 1): Vector {
  const vector = new Vector();
  vector.cargarSerieAritmetica(count, start, reason);
  return vector;
}

function expectSorted(values: number[], descending = false): void {
  for (let i = 1; i < values.length; i++) {
    if (descending) {
      assert.ok(values[i - 1] >= values[i], `expected ${values} to be descending`);
    } else {
      assert.ok(values[i - 1] <= values[i], `expected ${values} to be ascending`);
    }
  }
}

describe('Vector', () => {
  it('loads random elements with the requested size', () => {
    const vector = new Vector();
    vector.cargar(10, 1, 5);

    assert.equal(vector.length(), 10);
    const values = vector.vector();
    assert.equal(values.length, 10);
    for (const value of values) {
      assert.ok(value >= 1);
      assert.ok(value <= 5);
    }
  });

  it('returns a copy of the vector', () => {
    const vector = arithmetic(3);
    const copy = vector.vector();
    copy[0] = 99;

    assert.deepEqual(vector.vector(), [1, 2, 3]);
  });

  it('adds elements one by one', () => {
    const vector = vectorFrom([4, 7, 9]);

    assert.equal(vector.length(), 3);
    assert.deepEqual(vector.vector(), [4, 7, 9]);
  });

  it('downloads the vector as a string', () => {
    assert.equal(arithmetic(3).descargar(), '1|2|3|');
  });

  it('loads arithmetic and geometric series', () => {
    assert.deepEqual(arithmetic(4, 2, 3).vector(), [2, 5, 8, 11]);

    const geometric = new Vector();
    geometric.cargarSerieGeometrica(4, 1, 2);
    assert.deepEqual(geometric.vector(), [1, 2, 4, 8]);
  });

  it('loads the Fibonacci series', () => {
    const vector = new Vector();
    vector.cargarSerieFibonacci(8);
    assert.deepEqual(vector.vector(), [0, 1, 1, 2, 3, 5, 8, 13]);

    const one = new Vector();
    one.cargarSerieFibonacci(1);
    assert.deepEqual(one.vector(), [0]);

    const none = new Vector();
    none.cargarSerieFibonacci(0);
    assert.equal(none.length(), 0);
  });

  it('selects elements by position', () => {
    const source = arithmetic(6);
    const target = new Vector();
    source.seleccionarPorPosicion(2, target);

    assert.deepEqual(target.vector(), [1, 3, 5]);
  });

  it('selects elements by a Numero method', () => {
    const source = arithmetic(6);

    const evens = new Vector();
    source.seleccionar(evens, 'esPar');
    assert.deepEqual(evens.vector(), [2, 4, 6]);

    const odds = new Vector();
    source.seleccionar(odds, 'esPar', false);
    assert.deepEqual(odds.vector(), [1, 3, 5]);
  });

  it('throws when selecting with an invalid method', () => {
    const source = arithmetic(3);
    assert.throws(() => source.seleccionar(new Vector(), 'noExiste' as 'esPar'), /no corresponse/);
  });

  it('selects values greater than mean plus standard deviation', () => {
    const source = vectorFrom([1, 2, 3, 4, 5, 10]);
    const target = new Vector();
    source.seleccionarBuenos(target);

    assert.deepEqual(target.vector(), [10]);
  });

  it('sums elements in a range', () => {
    const vector = arithmetic(5);
    assert.equal(vector.sumar(), 15);
    assert.equal(vector.sumar(1, 3), 9);
  });

  it('throws for invalid sum ranges', () => {
    const vector = arithmetic(5);
    assert.throws(() => vector.sumar(-1, 2), /limites/);
    assert.throws(() => vector.sumar(4, 2), /menor o igual/);
  });

  it('gets the maximum value', () => {
    const vector = vectorFrom([2, 9, 4, 7]);
    assert.equal(vector.maximo(), 9);
    assert.equal(vector.maximo(0, 1), 9);
    assert.equal(vector.maximo(2, 3), 7);
  });

  it('counts frequencies', () => {
    const vector = vectorFrom([2, 4, 4, 1]);
    assert.equal(vector.frecuencia(4), 2);
    assert.equal(vector.frecuencia(2, 0, 1), 1);
  });

  it('gets the maximum value and its frequency', () => {
    const vector = vectorFrom([2, 4, 4, 1]);
    const result = { maximo: 0, frecuencia: 0 };
    vector.maximoYfrecuencia(result);

    assert.deepEqual(result, { maximo: 4, frecuencia: 2 });
  });

  it('calculates averages and deviations', () => {
    const vector = vectorFrom([1, 2, 3, 4]);
    assert.ok(Math.abs(vector.promedio() - 13 / 3) < 1e-9);

    const other = vectorFrom([2, 4, 4, 1]);
    assert.ok(Math.abs(other.desviacionMedia() - 23 / 12) < 1e-9);
    assert.ok(Math.abs(other.desviacionEstandar() - Math.sqrt(193 / 36)) < 1e-9);
  });

  it('performs binary search and sorts while searching', () => {
    const vector = vectorFrom([5, 3, 1, 4, 2]);

    assert.equal(vector.busquedaBinaria(4), true);
    assert.deepEqual(vector.vector(), [1, 2, 3, 4, 5]);
    assert.equal(vector.busquedaBinaria(6), false);
  });

  it('performs sequential search', () => {
    const vector = vectorFrom([5, 3, 1, 4, 2]);

    assert.equal(vector.busquedaSecuencial(1), true);
    assert.equal(vector.busquedaSecuencial(9), false);
    assert.equal(vector.busquedaSecuencial(5, 1, 4), false);
  });

  it('returns the dimension and an element by position', () => {
    const vector = arithmetic(4);

    assert.equal(vector.retornarDimension(), 4);
    assert.equal(vector.retornarNumero(2), 3);
  });

  it('removes duplicates', () => {
    const vector = vectorFrom([1, 1, 2, 3, 3, 3]);
    vector.eliminarDuplicados();

    assert.deepEqual(vector.vector(), [1, 2, 3]);
    assert.equal(vector.length(), 3);
  });

  it('swaps elements', () => {
    const vector = arithmetic(4);
    vector.intercambiar(0, 3);
    assert.deepEqual(vector.vector(), [4, 2, 3, 1]);
  });

  it('shuffles without changing the elements', () => {
    const vector = arithmetic(6);
    vector.desordenar(0, 5);

    assert.deepEqual(
      [...vector.vector()].sort((a, b) => a - b),
      [1, 2, 3, 4, 5, 6]
    );
    assert.equal(vector.length(), 6);
  });

  it('sorts with bogo sort when already sorted', () => {
    const vector = arithmetic(4);
    vector.bogoSort('asc');

    assert.deepEqual(vector.vector(), [1, 2, 3, 4]);
  });

  it('sorts with bubble sort', () => {
    const asc = vectorFrom([5, 3, 8, 1, 9, 2]);
    asc.bubbleSort('asc');
    expectSorted(asc.vector());

    const desc = vectorFrom([5, 3, 8, 1, 9, 2]);
    desc.bubbleSort('desc');
    expectSorted(desc.vector(), true);
  });

  it('sorts with insertion sort', () => {
    const asc = vectorFrom([3, 1, 2, 4]);
    asc.insertionSort('asc');
    expectSorted(asc.vector());

    const desc = vectorFrom([1, 3, 2, 0]);
    desc.insertionSort('desc');
    expectSorted(desc.vector(), true);
  });

  it('sorts with selection sort', () => {
    const asc = vectorFrom([5, 3, 8, 1, 9, 2]);
    asc.selectionSort('asc');
    expectSorted(asc.vector());

    const desc = vectorFrom([5, 3, 8, 1, 9, 2]);
    desc.selectionSort('desc');
    expectSorted(desc.vector(), true);
  });

  it('sorts with shell sort', () => {
    const asc = vectorFrom([5, 3, 8, 1, 9, 2]);
    asc.shellSort('asc');
    expectSorted(asc.vector());

    const desc = vectorFrom([5, 3, 8, 1, 9, 2]);
    desc.shellSort('desc');
    expectSorted(desc.vector(), true);
  });

  it('sorts with merge sort', () => {
    const asc = vectorFrom([5, 3, 8, 1, 9, 2]);
    asc.mergeSort('asc');
    expectSorted(asc.vector());

    const desc = vectorFrom([5, 3, 8, 1, 9, 2]);
    desc.mergeSort('desc');
    expectSorted(desc.vector(), true);
  });

  it('sorts with quick sort', () => {
    const asc = vectorFrom([5, 3, 8, 1, 9, 2]);
    asc.quickSort('asc');
    expectSorted(asc.vector());

    const desc = vectorFrom([5, 3, 8, 1, 9, 2]);
    desc.quickSort('desc');
    expectSorted(desc.vector(), true);
  });

  it('sorts with counting sort', () => {
    const asc = vectorFrom([5, 3, 8, 1, 9, 2]);
    asc.countingSort('asc');
    expectSorted(asc.vector());

    const desc = vectorFrom([5, 3, 8, 1, 9, 2]);
    desc.countingSort('desc');
    expectSorted(desc.vector(), true);
  });

  it('checks membership', () => {
    const vector = arithmetic(5);

    assert.equal(vector.pertenencia(3), true);
    assert.equal(vector.pertenencia(8), false);
    assert.equal(vector.pertenencia(3, 3, 4), false);
  });

  it('calculates intersection, union and differences of sets', () => {
    const v1 = vectorFrom([1, 2, 3]);
    const v2 = vectorFrom([2, 3, 4]);

    const intersection = new Vector();
    intersection.interseccionDeConjuntos(v1, v2);
    assert.deepEqual(intersection.vector(), [2, 3]);

    const union = new Vector();
    union.unionDeConjuntos(v1, v2);
    assert.deepEqual(union.vector(), [1, 2, 3, 4]);

    const ab = new Vector();
    ab.diferenciaDeConjuntosAB(v1, v2);
    assert.deepEqual(ab.vector(), [1]);

    const ba = new Vector();
    ba.diferenciaDeConjuntosBA(v1, v2);
    assert.deepEqual(ba.vector(), [4]);
  });

  it('segments even and odd numbers', () => {
    const vector = arithmetic(6);
    vector.segmentar('esPar');

    const values = vector.vector();
    assert.deepEqual(
      [...values].sort((a, b) => a - b),
      [1, 2, 3, 4, 5, 6]
    );
    const firstOdd = values.findIndex((value) => value % 2 !== 0);
    if (firstOdd !== -1) {
      assert.ok(values.slice(firstOdd).every((value) => value % 2 !== 0));
    }
  });

  it('interleaves even and odd numbers', () => {
    const vector = arithmetic(6);
    vector.intercalar('esPar');

    assert.deepEqual(
      [...vector.vector()].sort((a, b) => a - b),
      [1, 2, 3, 4, 5, 6]
    );
  });

  it('reverses the vector', () => {
    const vector = arithmetic(5);
    vector.invertir();

    assert.deepEqual(vector.vector(), [5, 4, 3, 2, 1]);
  });

  it('counts submultiples', () => {
    assert.equal(arithmetic(5).contarSubmultiplos(), 5);
  });

  it('finds the largest element at index multiples', () => {
    const vector = vectorFrom([1, 9, 3, 7, 5]);
    assert.equal(vector.buscarElementoMayor(2), 5);
  });

  it('calculates the average at index multiples', () => {
    const vector = vectorFrom([1, 9, 3, 7, 5]);
    assert.equal(vector.buscarMedia(2), 3);
  });

  it('checks if all elements are equal', () => {
    assert.equal(vectorFrom([2, 2, 2]).verificarElementosIguales(), true);
    assert.equal(vectorFrom([2, 2, 3]).verificarElementosIguales(), false);
  });

  it('checks if the vector is sorted', () => {
    const vector = arithmetic(5);
    assert.equal(vector.verificarOrdenado('asc', 0, 4), true);
    assert.equal(vector.verificarOrdenado('desc', 0, 4), false);
  });

  it('inserts a vector at a position', () => {
    const v1 = arithmetic(5);
    const v2 = vectorFrom([9, 8]);
    const target = new Vector();
    target.insertarVectorPorPosicion(v1, v2, 2);

    assert.deepEqual(target.vector(), [1, 2, 9, 8, 3, 4, 5]);
  });

  it('removes the last element', () => {
    const vector = arithmetic(4);
    vector.pop();

    assert.deepEqual(vector.vector(), [1, 2, 3]);
    assert.equal(vector.length(), 3);
  });

  it('removes elements in a range of positions', () => {
    const vector = arithmetic(5);
    vector.eliminarElementosDelVectorIndicandoLasPosiciones(1, 3);

    assert.deepEqual(vector.vector(), [1, 5]);
    assert.equal(vector.length(), 2);
  });

  it('duplicates the elements', () => {
    const vector = arithmetic(3);
    vector.duplicarElementos();

    assert.equal(vector.length(), 6);
    assert.equal(vector.descargar(), '1|1|2|2|3|3|');
  });

  it('concatenates another vector', () => {
    const vector = arithmetic(3);
    vector.concatenar(vectorFrom([8, 9]));

    assert.deepEqual(vector.vector(), [1, 2, 3, 8, 9]);
  });

  it('finds the least repeated element', () => {
    assert.equal(vectorFrom([1, 1, 2, 2, 3]).buscarElementoMenosRepetido(), 3);
    assert.equal(
      vectorFrom([1, 1, 2, 2, 3]).encontrarElementoMenosRepetidoEntreUnSegmento(1, 3),
      1
    );
  });

  it('loads frequencies into another vector', () => {
    const source = vectorFrom([1, 2, 2, 3]);
    const elements = vectorFrom([2, 3, 1]);
    const frequencies = new Vector();
    source.cargarFrecuencia(frequencies, elements);

    assert.deepEqual(frequencies.vector(), [2, 1, 1]);
  });

  it('finds the frequency distribution of a segment', () => {
    const source = vectorFrom([3, 1, 2, 2, 3]);
    const elements = new Vector();
    const frequencies = new Vector();
    source.encontrarLaFrecuenciaDeDistribucionDeUnSegmento(0, 4, elements, frequencies);

    assert.deepEqual(elements.vector(), [1, 2, 3]);
    assert.deepEqual(frequencies.vector(), [1, 2, 2]);
  });

  it('counts consecutive elements that satisfy a method', () => {
    assert.equal(vectorFrom([2, 4, 6]).contar('esPar'), 3);
    assert.equal(vectorFrom([2, 4, 1, 6]).contar('esPar'), 2);
  });

  it('removes a number from the vector', () => {
    const vector = vectorFrom([1, 2, 2, 3]);
    vector.eliminarNumero(2);

    assert.deepEqual(vector.vector(), [1, 3]);
    assert.equal(vector.length(), 2);
  });

  it('loads the digits of a number', () => {
    const vector = new Vector();
    vector.cargarDigitos(1234);

    assert.deepEqual(vector.vector(), [1, 2, 3, 4]);
  });

  it('loads the countdown series', () => {
    const vector = new Vector();
    vector.cargarSerie1(5);

    assert.deepEqual(vector.vector(), [1, 21, 321, 4321, 54321]);
  });
});
