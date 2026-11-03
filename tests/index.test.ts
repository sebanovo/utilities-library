import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import * as library from '../src/index';

describe('public exports', () => {
  it('exports every class', () => {
    const names = [
      'Cadena',
      'ListaCircular',
      'ListaDoblementeEnlazada',
      'ListaEnlazada',
      'Matriz',
      'Numero',
      'Tensor',
      'Vector',
      'Stack',
      'Queue',
      'NodoListaEnlazada',
      'NodoListaCircular',
      'NodoListaDoblementeEnlazada',
      'BinarySearchTreeNode',
      'AVLTreeNode',
      'NAryTreeNode',
      'MWayTreeNode',
      'BTreeNode',
      'BinarySearchTree',
      'AVLTree',
      'NAryTree',
      'MWayTree',
      'BTree',
      'Extra',
    ];

    for (const name of names) {
      assert.equal(typeof library[name as keyof typeof library], 'function', name);
    }
  });

  it('creates the exported data structures', () => {
    assert.equal(new library.Cadena().descargar(), '');
    assert.equal(new library.Numero().numero(), 0);
    assert.equal(new library.Vector().length(), 0);
    assert.equal(new library.Matriz().rowLength(), 0);
    assert.equal(new library.Tensor().layers(), 0);
    assert.equal(new library.Stack<number>().isEmpty(), true);
    assert.equal(new library.Queue<number>().isEmpty(), true);
    assert.equal(new library.ListaEnlazada().length(), 0);
    assert.equal(new library.ListaDoblementeEnlazada().length(), 0);
    assert.equal(new library.ListaCircular().length(), 0);
    assert.equal(new library.BinarySearchTree().isEmpty(), true);
    assert.equal(new library.AVLTree().isEmpty(), true);
    assert.equal(new library.NAryTree().isEmpty(), true);
    assert.equal(new library.MWayTree(3).isEmpty(), true);
    assert.equal(new library.BTree(3).isEmpty(), true);
  });
});
