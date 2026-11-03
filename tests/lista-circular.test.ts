import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import ListaCircular, { NodoListaCircular } from '../src/class/ListaCircular';

function listaWith(values: number[]): ListaCircular {
  const lista = new ListaCircular();
  for (const value of values) {
    lista.insertarFinal(value);
  }
  return lista;
}

describe('NodoListaCircular', () => {
  it('stores a value and starts without links', () => {
    const nodo = new NodoListaCircular(10);

    assert.equal(nodo.dato, 10);
    assert.equal(nodo.sig, null);
    assert.equal(nodo.ant, null);
  });
});

describe('ListaCircular', () => {
  it('starts empty', () => {
    const lista = new ListaCircular();

    assert.equal(lista.descargar1(), '');
    assert.equal(lista.descargar2(), '');
    assert.equal(lista.length(), 0);
    assert.equal(lista.obtenerInicio(), null);
    assert.equal(lista.obtenerFinal(), null);
  });

  it('inserts at the end and keeps the list circular', () => {
    const lista = listaWith([1, 2, 3]);

    assert.equal(lista.descargar1(), '1->2->3\r\n1<-2<-3');
    assert.equal(lista.descargar2(), '3->2->1\r\n3<-2<-1');
    assert.equal(lista.length(), 3);
    assert.equal(lista.obtenerInicio()?.dato, 1);
    assert.equal(lista.obtenerFinal()?.dato, 3);
    assert.equal(lista.obtenerInicio()?.sig?.dato, 2);
    assert.equal(lista.obtenerInicio()?.ant?.dato, 3);
  });

  it('inserts at the beginning', () => {
    const lista = listaWith([1, 2, 3]);
    lista.insertarInicio(0);

    assert.equal(lista.descargar1(), '0->1->2->3\r\n0<-1<-2<-3');
    assert.equal(lista.obtenerInicio()?.dato, 0);
    assert.equal(lista.obtenerFinal()?.dato, 3);
  });

  it('handles a single element', () => {
    const lista = listaWith([5]);

    assert.equal(lista.descargar1(), '5\r\n5');
    assert.equal(lista.descargar2(), '5\r\n5');
    assert.equal(lista.length(), 1);
    assert.equal(lista.obtenerInicio()?.dato, 5);
    assert.equal(lista.obtenerFinal()?.dato, 5);
  });

  it('inserts at the end when there is a single element', () => {
    const lista = listaWith([1]);
    lista.insertarFinal(2);

    assert.equal(lista.descargar1(), '1->2\r\n1<-2');
    assert.equal(lista.length(), 2);
  });

  it('deletes from the end', () => {
    const lista = listaWith([1, 2, 3]);
    lista.eliminarFinal();

    assert.equal(lista.descargar1(), '1->2\r\n1<-2');
    assert.equal(lista.length(), 2);
    assert.equal(lista.obtenerFinal()?.dato, 2);
  });

  it('deletes from the beginning', () => {
    const lista = listaWith([1, 2, 3]);
    lista.eliminarInicio();

    assert.equal(lista.descargar1(), '2->3\r\n2<-3');
    assert.equal(lista.obtenerInicio()?.dato, 2);
  });

  it('deletes the only node and ignores empty lists', () => {
    const final = listaWith([1]);
    final.eliminarFinal();
    assert.equal(final.descargar1(), '');
    assert.equal(final.length(), 0);

    const inicio = listaWith([1]);
    inicio.eliminarInicio();
    assert.equal(inicio.descargar1(), '');
    assert.equal(inicio.length(), 0);

    final.eliminarFinal();
    final.eliminarInicio();
    assert.equal(final.descargar1(), '');
  });

  it('loads the Fibonacci series', () => {
    const lista = new ListaCircular();
    lista.cargarFibonacci(6);
    assert.equal(lista.descargar1(), '0->1->1->2->3->5\r\n0<-1<-1<-2<-3<-5');
    assert.equal(lista.descargar2(), '5->3->2->1->1->0\r\n5<-3<-2<-1<-1<-0');

    const one = new ListaCircular();
    one.cargarFibonacci(1);
    assert.equal(one.descargar1(), '0\r\n0');
  });

  it('loads arithmetic and geometric series', () => {
    const arithmetic = new ListaCircular();
    arithmetic.cargarSerieAritmetica(4, 2, 3);
    assert.equal(arithmetic.descargar1().split('\r\n')[0], '2->5->8->11');

    const geometric = new ListaCircular();
    geometric.cargarSerieGeometrica(4, 1, 2);
    assert.equal(geometric.descargar1().split('\r\n')[0], '1->2->4->8');
  });

  it('sorts the list', () => {
    const lista = listaWith([3, 1, 4, 2]);
    lista.ordenar();

    assert.equal(lista.descargar1(), '1->2->3->4\r\n1<-2<-3<-4');
  });

  it('segments even and odd numbers', () => {
    const lista = listaWith([1, 2, 3, 4, 5, 6]);
    lista.segmentar('esPar');

    assert.equal(lista.descargar1(), '2->4->6->1->3->5\r\n2<-4<-6<-1<-3<-5');
  });

  it('interleaves even and odd numbers', () => {
    const lista = listaWith([1, 2, 3, 4, 5, 6]);
    lista.intercalar('esPar');

    assert.equal(lista.descargar1(), '2->1->4->3->6->5\r\n2<-1<-4<-3<-6<-5');
  });

  it('searches values sequentially', () => {
    const lista = listaWith([3, 5, 7]);

    assert.equal(lista.busquedaSecuencial(5), true);
    assert.equal(lista.busquedaSecuencial(9), false);
  });

  it('reverses the list', () => {
    const lista = listaWith([1, 2, 3]);
    lista.invertir();

    assert.equal(lista.descargar1(), '3->2->1\r\n3<-2<-1');
    assert.equal(lista.descargar2(), '1->2->3\r\n1<-2<-3');
  });

  it('returns a copy of the list', () => {
    const lista = listaWith([1, 2, 3]);
    const copy = lista.lista();

    assert.equal(copy?.dato, 1);
    assert.equal(copy?.sig?.dato, 2);
    assert.equal(copy?.ant?.dato, 3);
    copy!.dato = 99;
    assert.equal(lista.obtenerInicio()?.dato, 1);
  });

  it('iterates over every node once', () => {
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
