import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import ListaEnlazada, { NodoListaEnlazada } from '../src/class/ListaEnlazada';

function listaWith(values: number[]): ListaEnlazada {
  const lista = new ListaEnlazada();
  for (const value of values) {
    lista.insertarFinal(value);
  }
  return lista;
}

describe('NodoListaEnlazada', () => {
  it('stores a value and starts without a next node', () => {
    const nodo = new NodoListaEnlazada(10);

    assert.equal(nodo.dato, 10);
    assert.equal(nodo.sig, null);
  });
});

describe('ListaEnlazada', () => {
  it('starts empty', () => {
    const lista = new ListaEnlazada();

    assert.equal(lista.descargar(), '');
    assert.equal(lista.length(), 0);
    assert.equal(lista.obtenerInicio(), null);
    assert.equal(lista.obtenerFinal(), null);
  });

  it('inserts at the end', () => {
    const lista = listaWith([1, 2, 3]);

    assert.equal(lista.descargar(), '1->2->3');
    assert.equal(lista.length(), 3);
    assert.equal(lista.obtenerInicio()?.dato, 1);
    assert.equal(lista.obtenerFinal()?.dato, 3);
  });

  it('inserts at the beginning', () => {
    const lista = listaWith([1, 2, 3]);
    lista.insertarInicio(0);

    assert.equal(lista.descargar(), '0->1->2->3');
    assert.equal(lista.obtenerInicio()?.dato, 0);
  });

  it('deletes from the end', () => {
    const lista = listaWith([1, 2, 3]);
    lista.eliminarFinal();

    assert.equal(lista.descargar(), '1->2');
    assert.equal(lista.obtenerFinal()?.dato, 2);
  });

  it('deletes from the beginning', () => {
    const lista = listaWith([1, 2, 3]);
    lista.eliminarInicio();

    assert.equal(lista.descargar(), '2->3');
    assert.equal(lista.obtenerInicio()?.dato, 2);
  });

  it('deletes the only node and ignores empty lists', () => {
    const lista = listaWith([1]);
    lista.eliminarInicio();
    assert.equal(lista.descargar(), '');
    assert.equal(lista.obtenerInicio(), null);

    lista.eliminarFinal();
    lista.eliminarInicio();
    assert.equal(lista.descargar(), '');
  });

  it('returns a copy of the list', () => {
    const lista = listaWith([1, 2, 3]);
    const copy = lista.lista();

    assert.equal(copy?.dato, 1);
    assert.equal(copy?.sig?.dato, 2);
    copy!.dato = 99;
    assert.equal(lista.obtenerInicio()?.dato, 1);
  });

  it('loads the Fibonacci series', () => {
    const lista = new ListaEnlazada();
    lista.cargarFibonacci(8);
    assert.equal(lista.descargar(), '0->1->1->2->3->5->8->13');

    const one = new ListaEnlazada();
    one.cargarFibonacci(1);
    assert.equal(one.descargar(), '0');

    const none = new ListaEnlazada();
    none.cargarFibonacci(0);
    assert.equal(none.descargar(), '');
  });

  it('loads arithmetic and geometric series', () => {
    const arithmetic = new ListaEnlazada();
    arithmetic.cargarSerieAritmetica(4, 2, 3);
    assert.equal(arithmetic.descargar(), '2->5->8->11');

    const geometric = new ListaEnlazada();
    geometric.cargarSerieGeometrica(4, 1, 2);
    assert.equal(geometric.descargar(), '1->2->4->8');
  });

  it('sorts the list', () => {
    const lista = listaWith([3, 1, 4, 2]);
    lista.ordenar();

    assert.equal(lista.descargar(), '1->2->3->4');
  });

  it('segments even and odd numbers', () => {
    const lista = listaWith([1, 2, 3, 4, 5, 6]);
    lista.segmentar('esPar');

    assert.equal(lista.descargar(), '2->4->6->1->3->5');
  });

  it('interleaves even and odd numbers', () => {
    const lista = listaWith([1, 2, 3, 4, 5, 6]);
    lista.intercalar('esPar');

    assert.equal(lista.descargar(), '2->1->4->3->6->5');
  });

  it('searches values sequentially', () => {
    const lista = listaWith([3, 5, 7]);

    assert.equal(lista.busquedaSecuencial(5), true);
    assert.equal(lista.busquedaSecuencial(9), false);
  });

  it('reverses the list', () => {
    const lista = listaWith([1, 2, 3]);
    lista.invertir();

    assert.equal(lista.descargar(), '3->2->1');
    assert.equal(lista.obtenerInicio()?.dato, 3);
  });

  it('iterates over every node', () => {
    const lista = listaWith([1, 2, 3]);
    const values: number[] = [];
    let headValue = -1;

    lista.forEach((value, nodo, head) => {
      values.push(value);
      headValue = head!.dato;
      assert.equal(nodo?.dato, value);
    });

    assert.deepEqual(values, [1, 2, 3]);
    assert.equal(headValue, 1);
  });
});
