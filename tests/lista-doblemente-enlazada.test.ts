import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import ListaDoblementeEnlazada, {
  NodoListaDoblementeEnlazada,
} from '../src/class/ListaDoblementeEnlazada';

function listaWith(values: number[]): ListaDoblementeEnlazada {
  const lista = new ListaDoblementeEnlazada();
  for (const value of values) {
    lista.insertarFinal(value);
  }
  return lista;
}

describe('NodoListaDoblementeEnlazada', () => {
  it('stores a value and starts without links', () => {
    const nodo = new NodoListaDoblementeEnlazada(10);

    assert.equal(nodo.dato, 10);
    assert.equal(nodo.sig, null);
    assert.equal(nodo.ant, null);
  });
});

describe('ListaDoblementeEnlazada', () => {
  it('starts empty', () => {
    const lista = new ListaDoblementeEnlazada();

    assert.equal(lista.descargar1(), '\r\n');
    assert.equal(lista.descargar2(), '\r\n');
    assert.equal(lista.length(), 0);
    assert.equal(lista.obtenerInicio(), null);
    assert.equal(lista.obtenerFinal(), null);
  });

  it('inserts at the end and downloads the list in both directions', () => {
    const lista = listaWith([1, 2, 3]);

    assert.equal(lista.descargar1(), '1->2->3\r\n1<-2<-3');
    assert.equal(lista.descargar2(), '3->2->1\r\n3<-2<-1');
    assert.equal(lista.length(), 3);
    assert.equal(lista.obtenerInicio()?.dato, 1);
    assert.equal(lista.obtenerFinal()?.dato, 3);
  });

  it('inserts at the beginning', () => {
    const lista = listaWith([1, 2, 3]);
    lista.insertarInicio(0);

    assert.equal(lista.descargar1(), '0->1->2->3\r\n0<-1<-2<-3');
    assert.equal(lista.obtenerInicio()?.ant, null);
  });

  it('deletes from the end', () => {
    const lista = listaWith([1, 2, 3]);
    lista.eliminarFinal();

    assert.equal(lista.descargar1(), '1->2\r\n1<-2');
    assert.equal(lista.obtenerFinal()?.dato, 2);
    assert.equal(lista.obtenerFinal()?.sig, null);
  });

  it('deletes from the beginning', () => {
    const lista = listaWith([1, 2, 3]);
    lista.eliminarInicio();

    assert.equal(lista.descargar1(), '2->3\r\n2<-3');
    assert.equal(lista.obtenerInicio()?.ant, null);
  });

  it('deletes the only node and ignores empty lists', () => {
    const lista = listaWith([1]);
    lista.eliminarFinal();
    assert.equal(lista.descargar1(), '\r\n');

    lista.eliminarFinal();
    lista.eliminarInicio();
    assert.equal(lista.descargar1(), '\r\n');
    assert.equal(lista.length(), 0);
  });

  it('returns a copy of the list', () => {
    const lista = listaWith([1, 2, 3]);
    const copy = lista.lista();

    assert.equal(copy?.dato, 1);
    assert.equal(copy?.sig?.dato, 2);
    assert.equal(copy?.sig?.ant?.dato, 1);
    copy!.dato = 99;
    assert.equal(lista.obtenerInicio()?.dato, 1);
  });

  it('loads the Fibonacci series', () => {
    const lista = new ListaDoblementeEnlazada();
    lista.cargarFibonacci(8);
    assert.equal(lista.descargar1().split('\r\n')[0], '0->1->1->2->3->5->8->13');

    const one = new ListaDoblementeEnlazada();
    one.cargarFibonacci(1);
    assert.equal(one.descargar1().split('\r\n')[0], '0');
  });

  it('loads arithmetic and geometric series', () => {
    const arithmetic = new ListaDoblementeEnlazada();
    arithmetic.cargarSerieAritmetica(4, 2, 3);
    assert.equal(arithmetic.descargar1().split('\r\n')[0], '2->5->8->11');

    const geometric = new ListaDoblementeEnlazada();
    geometric.cargarSerieGeometrica(4, 1, 2);
    assert.equal(geometric.descargar1().split('\r\n')[0], '1->2->4->8');
  });

  it('sorts the list', () => {
    const lista = listaWith([3, 1, 4, 2]);
    lista.ordenar();

    assert.equal(lista.descargar1().split('\r\n')[0], '1->2->3->4');
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
