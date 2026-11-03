import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import Matriz from '../src/class/Matriz';
import type { MethodsOfNumero } from '../src/types/types';

function arithmetic(rows: number, columns: number, start = 1, reason = 1): Matriz {
  const matriz = new Matriz();
  matriz.cargarSerieAritmetica(rows, columns, start, reason);
  return matriz;
}

function sorted(values: number[]): number[] {
  return [...values].sort((a, b) => a - b);
}

function visible(matriz: Matriz): number[][] {
  return matriz
    .matriz()
    .slice(0, matriz.rowLength())
    .map((row) => row.slice(0, matriz.columnLength()));
}

describe('Matriz', () => {
  it('loads random values with the requested dimensions', () => {
    const matriz = new Matriz();
    matriz.cargar(2, 3, 1, 5);

    assert.equal(matriz.rowLength(), 2);
    assert.equal(matriz.columnLength(), 3);
    assert.deepEqual(matriz.retornarDimension(), { rows: 2, columns: 3 });

    for (const row of matriz.matriz()) {
      for (const value of row) {
        assert.ok(value >= 1);
        assert.ok(value <= 5);
      }
    }
  });

  it('throws when loading with null parameters', () => {
    const matriz = new Matriz();
    assert.throws(
      () => matriz.cargar(null as unknown as number, 2, 1, 5),
      /Ingrese los parametros/
    );
  });

  it('loads a snake pattern by rows', () => {
    const matriz = new Matriz();
    matriz.cargarViboraPorFilas(3, 3);

    assert.deepEqual(matriz.matriz(), [
      [1, 2, 3],
      [6, 5, 4],
      [7, 8, 9],
    ]);
  });

  it('loads a snake pattern by columns', () => {
    const matriz = new Matriz();
    matriz.cargarViboraPorColumnas(3, 3);

    assert.deepEqual(matriz.matriz(), [
      [1, 6, 7],
      [2, 5, 8],
      [3, 4, 9],
    ]);
  });

  it('downloads the matrix as a string', () => {
    assert.equal(arithmetic(2, 2).descargar(), '1\t2\t\n3\t4\t\n');
  });

  it('returns a copy of the matrix', () => {
    const matriz = arithmetic(2, 2);
    const copy = matriz.matriz();
    copy[0][0] = 99;

    assert.deepEqual(matriz.matriz(), [
      [1, 2],
      [3, 4],
    ]);
  });

  it('loads arithmetic and geometric series', () => {
    assert.deepEqual(arithmetic(2, 3, 1, 2).matriz(), [
      [1, 3, 5],
      [7, 9, 11],
    ]);

    const geometric = new Matriz();
    geometric.cargarSerieGeometrica(2, 3, 1, 2);
    assert.deepEqual(geometric.matriz(), [
      [1, 2, 4],
      [8, 16, 32],
    ]);
  });

  it('checks membership and comparisons', () => {
    const matriz = arithmetic(2, 3);

    assert.equal(matriz.pertenencia(4), true);
    assert.equal(matriz.pertenencia(9), false);
    assert.equal(matriz.verificarMayor(6), true);
    assert.equal(matriz.verificarMayor(5), false);
    assert.equal(matriz.verificarMenor(1), true);
    assert.equal(matriz.verificarMenor(2), false);
  });

  it('checks if the matrix is sorted', () => {
    assert.equal(arithmetic(2, 2).verificarOrdenado('asc'), true);
    assert.equal(arithmetic(2, 2).verificarOrdenado('desc'), false);
    assert.equal(arithmetic(2, 2, 4, -1).verificarOrdenado('desc'), true);
    assert.equal(arithmetic(2, 2, 4, -1).verificarOrdenado('asc'), false);
    assert.throws(() => arithmetic(2, 2).verificarOrdenado('up' as 'asc'), /dirección/);
  });

  it('checks if the matrix is sorted by a reason', () => {
    assert.equal(arithmetic(2, 3, 1, 2).verificarOrdenadoRazon(2), true);
    assert.equal(arithmetic(2, 3, 1, 2).verificarOrdenadoRazon(1), false);
  });

  it('checks if all elements are equal or different', () => {
    assert.equal(arithmetic(2, 2, 5, 0).verificarTodosIguales(), true);
    assert.equal(arithmetic(2, 2).verificarTodosIguales(), false);

    assert.equal(arithmetic(2, 2).verificarTodosDiferentes(), true);
    assert.equal(arithmetic(2, 2, 5, 0).verificarTodosDiferentes(), false);
  });

  it('adds and subtracts matrices', () => {
    const m1 = arithmetic(2, 3);
    const m2 = arithmetic(2, 3, 6, -1);

    const sum = new Matriz();
    sum.suma(m1, m2);
    assert.deepEqual(sum.matriz(), [
      [7, 7, 7],
      [7, 7, 7],
    ]);

    const rest = new Matriz();
    rest.resta(m1, m2);
    assert.deepEqual(rest.matriz(), [
      [-5, -3, -1],
      [1, 3, 5],
    ]);
  });

  it('throws when adding or subtracting matrices of different dimensions', () => {
    const m1 = arithmetic(2, 3);
    const m2 = arithmetic(3, 2);

    assert.throws(() => new Matriz().suma(m1, m2), /dimensiones diferentes/);
    assert.throws(() => new Matriz().resta(m1, m2), /dimensiones diferentes/);
  });

  it('multiplies matrices', () => {
    const m1 = arithmetic(2, 3);
    const m2 = arithmetic(3, 2);

    const result = new Matriz();
    result.multiplicacion(m1, m2);

    assert.deepEqual(result.matriz(), [
      [22, 28],
      [49, 64],
    ]);
    assert.deepEqual(result.retornarDimension(), { rows: 2, columns: 2 });
  });

  it('throws when multiplying incompatible matrices', () => {
    assert.throws(
      () => new Matriz().multiplicacion(arithmetic(2, 3), arithmetic(2, 3)),
      /columna de la primera/
    );
  });

  it('multiplies by a scalar', () => {
    const matriz = arithmetic(2, 2);
    matriz.multiplicacionPorEscalar(2);

    assert.deepEqual(matriz.matriz(), [
      [1, 2],
      [3, 8],
    ]);
  });

  it('transposes the matrix', () => {
    const matriz = arithmetic(2, 3);
    matriz.transposicion();

    assert.deepEqual(matriz.matriz(), [
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
    assert.deepEqual(matriz.retornarDimension(), { rows: 3, columns: 2 });
  });

  it('swaps two elements', () => {
    const matriz = arithmetic(2, 2);
    matriz.intercambiar(0, 0, 1, 1);

    assert.deepEqual(matriz.matriz(), [
      [4, 2],
      [3, 1],
    ]);
  });

  it('gets the largest and smallest element', () => {
    const matriz = arithmetic(2, 3);

    assert.equal(matriz.devolverMayor(), 6);
    assert.equal(matriz.devolverMenor(), 1);
    assert.throws(() => new Matriz().devolverMayor(), /vacía/);
    assert.throws(() => new Matriz().devolverMenor(), /vacía/);
  });

  it('searches a value and returns its position', () => {
    const matriz = arithmetic(2, 3);

    assert.deepEqual(matriz.busquedaSecuencial(5), [2, 2]);
    assert.deepEqual(matriz.busquedaSecuencial(9), [null, null]);
  });

  it('counts frequencies', () => {
    const matriz = arithmetic(2, 3);
    assert.equal(matriz.frecuencia(3), 1);
    assert.equal(matriz.frecuencia(9), 0);
  });

  it('sorts the matrix ascending and descending', () => {
    const asc = arithmetic(2, 2, 4, -1);
    asc.ordenar('asc');
    assert.deepEqual(asc.matriz(), [
      [1, 2],
      [3, 4],
    ]);

    const desc = arithmetic(2, 2);
    desc.ordenar('desc');
    assert.deepEqual(desc.matriz(), [
      [4, 3],
      [2, 1],
    ]);
  });

  it('throws when sorting with an invalid direction', () => {
    assert.throws(() => arithmetic(2, 2).ordenar('up' as 'asc'), /dirección/);
  });

  it('segments the matrix by a Numero method', () => {
    const matriz = arithmetic(2, 3);
    matriz.segmentar('esPar');

    assert.deepEqual(matriz.matriz(), [
      [2, 4, 6],
      [1, 3, 5],
    ]);
  });

  it('interleaves the matrix by a Numero method', () => {
    const matriz = arithmetic(2, 3);
    matriz.intercalar('esPar');

    assert.deepEqual(matriz.matriz(), [
      [2, 1, 4],
      [3, 6, 5],
    ]);
  });

  it('throws when segmenting or interleaving with an invalid method', () => {
    const matriz = arithmetic(2, 3);
    assert.throws(() => matriz.segmentar('noExiste' as MethodsOfNumero), /no corresponse/);
    assert.throws(() => matriz.intercalar('noExiste' as MethodsOfNumero), /no corresponse/);
  });

  it('calculates row statistics', () => {
    const matriz = arithmetic(2, 3);

    assert.equal(matriz.sumaFila(0), 6);
    assert.equal(matriz.multiplicacionFila(0), 6);
    assert.equal(matriz.contarParesFila(0), 1);
    assert.equal(matriz.contarNoParesFila(0), 2);
    assert.equal(matriz.contarPrimosFila(0), 2);
    assert.equal(matriz.contarNoPrimosFila(0), 1);
    assert.equal(matriz.contarCapicuasFila(0), 3);
    assert.equal(matriz.contarNoCapicuasFila(0), 0);
    assert.equal(matriz.contarFibonaccisFila(0), 3);
    assert.equal(matriz.contarNoFibonaccisFila(0), 0);
    assert.equal(matriz.contarElementosDiferentesFila(0), 3);
    assert.equal(matriz.contarElementosUnicosFila(0), 3);
    assert.equal(matriz.frecuenciaFila(0, 2), 1);
  });

  it('calculates column statistics', () => {
    const matriz = arithmetic(2, 3);

    assert.equal(matriz.sumaColumna(0), 5);
    assert.equal(matriz.multiplicacionColumna(0), 6);
    assert.equal(matriz.contarParesColumna(0), 1);
    assert.equal(matriz.contarNoParesColumna(0), 1);
    assert.equal(matriz.contarPrimosColumna(0), 0);
    assert.equal(matriz.contarNoPrimosColumna(0), 2);
    assert.equal(matriz.contarCapicuasColumna(0), 2);
    assert.equal(matriz.contarNoCapicuasColumna(0), 0);
    assert.equal(matriz.contarFibonaccisColumna(0), 1);
    assert.equal(matriz.contarNoFibonaccisColumna(0), 1);
    assert.equal(matriz.contarElementosDiferentesColumna(0), 2);
    assert.equal(matriz.contarElementosUnicosColumna(0), 2);
    assert.equal(matriz.frecuenciaColumna(0, 4), 1);
  });

  it('adds computed columns', () => {
    const sum = arithmetic(2, 2);
    sum.añadirColumnaSuma();
    assert.deepEqual(visible(sum), [
      [1, 2, 3],
      [3, 4, 7],
    ]);
    assert.equal(sum.columnLength(), 3);

    const product = arithmetic(2, 2);
    product.añadirColumnaMultiplacion();
    assert.deepEqual(visible(product), [
      [1, 2, 2],
      [3, 4, 12],
    ]);

    const pairs = arithmetic(2, 2);
    pairs.añadirColumnaPares();
    assert.deepEqual(visible(pairs), [
      [1, 2, 1],
      [3, 4, 1],
    ]);
  });

  it('adds computed rows', () => {
    const sum = arithmetic(2, 2);
    sum.añadirFilaSuma();
    assert.deepEqual(visible(sum), [
      [1, 2],
      [3, 4],
      [4, 6],
    ]);
    assert.equal(sum.rowLength(), 3);

    const product = arithmetic(2, 2);
    product.añadirFilaMultiplacion();
    assert.deepEqual(visible(product), [
      [1, 2],
      [3, 4],
      [5, 7],
    ]);

    const pairs = arithmetic(2, 2);
    pairs.añadirFilaPares();
    assert.deepEqual(visible(pairs), [
      [1, 2],
      [3, 4],
      [0, 2],
    ]);
  });

  it('adds the most and least frequent value of each row with its frequency', () => {
    const most = arithmetic(2, 3);
    most.añadirColumnaMayorFrecuenciaYFrecuencia();
    assert.deepEqual(visible(most), [
      [1, 2, 3, 1, 1],
      [4, 5, 6, 4, 1],
    ]);

    const least = arithmetic(2, 3);
    least.añadirColumnaMenorFrecuenciaYFrecuencia();
    assert.deepEqual(visible(least), [
      [1, 2, 3, 1, 1],
      [4, 5, 6, 4, 1],
    ]);
  });

  it('adds the most and least frequent value of each column with its frequency', () => {
    const most = arithmetic(2, 3);
    most.añadirFilaMayorFrecuenciaYFrecuencia();
    assert.deepEqual(most.matriz(), [
      [1, 2, 3],
      [4, 5, 6],
      [1, 2, 3],
      [1, 1, 1],
    ]);

    const least = arithmetic(2, 3);
    least.añadirFilaMenorFrecuenciaYFrecuencia();
    assert.deepEqual(least.matriz(), [
      [1, 2, 3],
      [4, 5, 6],
      [1, 2, 3],
      [1, 1, 1],
    ]);
  });

  it('sorts the main diagonal', () => {
    const matriz = arithmetic(3, 3, 9, -1);
    matriz.ordenarDiagonalPrincipal();

    assert.deepEqual(
      [matriz.matriz()[0][0], matriz.matriz()[1][1], matriz.matriz()[2][2]],
      [1, 5, 9]
    );
  });

  it('sorts the secondary diagonal', () => {
    const matriz = arithmetic(3, 3, 9, -1);
    matriz.ordenarDiagonalSecundaria();

    assert.deepEqual(
      [matriz.matriz()[0][2], matriz.matriz()[1][1], matriz.matriz()[2][0]],
      [3, 5, 7]
    );
  });

  it('requires square matrices for diagonal operations', () => {
    const matriz = arithmetic(2, 3);
    assert.throws(() => matriz.ordenarDiagonalPrincipal(), /cuadrada/);
    assert.throws(() => matriz.ordenarDiagonalSecundaria(), /Cuadrada/);
  });

  it('segments all triangular regions', () => {
    const operations = [
      (matriz: Matriz) => matriz.segmentarTriangularInferiorIzquierda('esPar'),
      (matriz: Matriz) => matriz.segmentarTriangularInferiorDerecha('esPar'),
      (matriz: Matriz) => matriz.segmentarTriangularSuperiorIzquierda('esPar'),
      (matriz: Matriz) => matriz.segmentarTriangularSuperiorDerecha('esPar'),
    ];

    for (const operation of operations) {
      const matriz = arithmetic(3, 3);
      operation(matriz);
      assert.deepEqual(sorted(matriz.matriz().flat()), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }
  });

  it('interleaves all triangular regions', () => {
    const operations = [
      (matriz: Matriz) => matriz.intercalarTriangularInferiorIzquierda('esPar'),
      (matriz: Matriz) => matriz.intercalarTriangularInferiorDerecha('esPar'),
      (matriz: Matriz) => matriz.intercalarTriangularSuperiorIzquierda('esPar'),
      (matriz: Matriz) => matriz.intercalarTriangularSuperiorDerecha('esPar'),
    ];

    for (const operation of operations) {
      const matriz = arithmetic(3, 3);
      operation(matriz);
      assert.deepEqual(sorted(matriz.matriz().flat()), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }
  });

  it('requires square matrices for triangular operations', () => {
    const matriz = arithmetic(2, 3);
    assert.throws(() => matriz.segmentarTriangularInferiorIzquierda('esPar'), /cuadrada/);
    assert.throws(() => matriz.segmentarTriangularInferiorDerecha('esPar'), /cuadrada/);
    assert.throws(() => matriz.segmentarTriangularSuperiorIzquierda('esPar'), /cuadrada/);
    assert.throws(() => matriz.segmentarTriangularSuperiorDerecha('esPar'), /cuadrada/);
    assert.throws(() => matriz.intercalarTriangularInferiorIzquierda('esPar'), /cuadrada/);
    assert.throws(() => matriz.intercalarTriangularInferiorDerecha('esPar'), /cuadrada/);
    assert.throws(() => matriz.intercalarTriangularSuperiorIzquierda('esPar'), /cuadrada/);
    assert.throws(() => matriz.intercalarTriangularSuperiorDerecha('esPar'), /cuadrada/);
  });

  it('swaps rows and columns', () => {
    const byRows = arithmetic(3, 2);
    byRows.intercambiarFilas(0, 2);
    assert.deepEqual(byRows.matriz(), [
      [5, 6],
      [3, 4],
      [1, 2],
    ]);

    const byColumns = arithmetic(2, 3);
    byColumns.intercambiarColumnas(0, 2);
    assert.deepEqual(byColumns.matriz(), [
      [3, 2, 1],
      [6, 5, 4],
    ]);
  });

  it('sorts rows by the last column', () => {
    const matriz = arithmetic(3, 2);
    matriz.intercambiarFilas(0, 2);
    matriz.ordenarFilasPorUltimaColumna();

    assert.deepEqual(matriz.matriz(), [
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  it('sorts columns by the last row', () => {
    const matriz = arithmetic(2, 3);
    matriz.intercambiarColumnas(0, 2);
    matriz.ordenarColumnasPorUltimaFila();

    assert.deepEqual(matriz.matriz(), [
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  it('calculates determinants', () => {
    assert.equal(arithmetic(2, 2).determinante(), -2);
    assert.equal(arithmetic(3, 3).determinante(), 0);
    assert.throws(() => arithmetic(2, 3).determinante(), /cuadrada/);
  });

  it('loads an L matrix', () => {
    const matriz = new Matriz();
    matriz.cargarL(3);

    assert.deepEqual(matriz.matriz(), [
      [1, 2, 3],
      [2, 2, 3],
      [3, 3, 3],
    ]);
  });

  it('loads a Diana matrix', () => {
    const matriz = new Matriz();
    matriz.cargarDiana(3);

    assert.deepEqual(matriz.matriz(), [
      [2, 2, 2],
      [2, 1, 2],
      [2, 2, 2],
    ]);
  });

  it('loads a magic square', () => {
    const matriz = new Matriz();
    matriz.cargarCuadradoMagico(3);

    assert.deepEqual(matriz.matriz(), [
      [8, 1, 6],
      [3, 5, 7],
      [4, 9, 2],
    ]);
  });

  it('loads a snail matrix', () => {
    const matriz = new Matriz();
    matriz.cargarCaracol(3);

    assert.deepEqual(matriz.matriz(), [
      [1, 2, 3],
      [8, 9, 4],
      [7, 6, 5],
    ]);
  });

  it('loads secondary diagonals', () => {
    const matriz = new Matriz();
    matriz.cargarDiagonalesSecundarias(3);

    assert.deepEqual(matriz.matriz(), [
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
    ]);
  });

  it('loads secondary diagonals from bottom up', () => {
    const matriz = new Matriz();
    matriz.cargarDiagonalesSecundariasUpBottomUp(3);

    assert.deepEqual(
      [0, 1, 2].map((row) => matriz.matriz()[row].slice(0, 3)),
      [
        [1, 3, 6],
        [2, 5, 8],
        [4, 7, 9],
      ]
    );
  });

  it('loads the lower-left triangular diagonals', () => {
    const matriz = new Matriz();
    matriz.cargarDiagonalesPrincipalesTriangularInferiorIzquierda(3);

    assert.deepEqual(
      [0, 1, 2].map((row) => matriz.matriz()[row].slice(0, 3)),
      [[1], [4, 2], [6, 5, 3]]
    );
  });
});
