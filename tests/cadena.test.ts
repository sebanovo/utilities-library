import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import Cadena from '../src/class/Cadena';

function cadenaWith(value: string): Cadena {
  const cadena = new Cadena();
  cadena.cargar(value);
  return cadena;
}

describe('Cadena', () => {
  it('loads, returns and downloads a string', () => {
    const cadena = new Cadena();
    cadena.cargar('hola');

    assert.equal(cadena.cadena(), 'hola');
    assert.equal(cadena.descargar(), 'hola');
  });

  it('checks vowels', () => {
    assert.equal(Cadena.esVocal('a'), true);
    assert.equal(Cadena.esVocal('E'), true);
    assert.equal(Cadena.esVocal('z'), false);
  });

  it('checks letters', () => {
    assert.equal(Cadena.esLetra('a'), true);
    assert.equal(Cadena.esLetra('Ñ'), true);
    assert.equal(Cadena.esLetra('1'), false);
  });

  it('checks spaces', () => {
    assert.equal(Cadena.esEspacio(' '), true);
    assert.equal(Cadena.esEspacio('a'), false);
  });

  it('checks digits', () => {
    assert.equal(Cadena.esDigito('5'), true);
    assert.equal(Cadena.esDigito('a'), false);
    assert.equal(Cadena.esDigito(''), false);
  });

  it('checks palindromes', () => {
    assert.equal(cadenaWith('reconocer').esPalindromo(), true);
    assert.equal(cadenaWith('hola').esPalindromo(), false);
  });

  it('counts a character', () => {
    assert.equal(cadenaWith('oso').contarCaracter('o'), 2);
    assert.equal(cadenaWith('oso').contarCaracter('x'), 0);
  });

  it('counts vowels and letters', () => {
    assert.equal(cadenaWith('murcielago').contarVocales(), 5);
    assert.equal(cadenaWith('abc 123').contarLetras(), 3);
  });

  it('reverses the string', () => {
    const cadena = cadenaWith('hola');
    cadena.invertir();
    assert.equal(cadena.cadena(), 'aloh');
  });

  it('removes a character', () => {
    const cadena = cadenaWith('banana');
    cadena.eliminarCaracter('a');
    assert.equal(cadena.cadena(), 'bnn');
  });

  it('removes vowels', () => {
    const cadena = cadenaWith('murcielago');
    cadena.eliminarVocales();
    assert.equal(cadena.cadena(), 'mrclg');
  });

  it('removes letters', () => {
    const cadena = cadenaWith('abc123');
    cadena.eliminarLetras();
    assert.equal(cadena.cadena(), '123');
  });

  it('removes numbers', () => {
    const cadena = cadenaWith('a1b2c3');
    cadena.eliminarNumeros();
    assert.equal(cadena.cadena(), 'abc');
  });

  it('gets the first word', () => {
    assert.equal(cadenaWith('hola mundo').primerPalabra(), 'hola');
    assert.equal(cadenaWith('  hola mundo').primerPalabra(), 'hola');
  });

  it('gets the first word positions', () => {
    assert.deepEqual(cadenaWith('  hola mundo').posicionPrimerPalabra(), {
      start: 2,
      end: 5,
    });
    assert.deepEqual(cadenaWith('   ').posicionPrimerPalabra(), {
      start: -1,
      end: -1,
    });
  });

  it('removes the first word', () => {
    const cadena = cadenaWith('hola mundo');
    cadena.eliminarPrimerPalabra();
    assert.equal(cadena.cadena(), ' mundo');
  });

  it('removes up to the first word', () => {
    const cadena = cadenaWith('hola a todos');
    cadena.eliminarHastaPrimerPalabra();
    assert.equal(cadena.cadena(), ' a todos');
  });

  it('counts words', () => {
    assert.equal(cadenaWith('hola a todos').contarPalabras(), 3);
    assert.equal(cadenaWith('  hola   mundo  ').contarPalabras(), 2);
    assert.equal(cadenaWith('').contarPalabras(), 0);
  });

  it('gets the longest and shortest words', () => {
    assert.equal(cadenaWith('programacion es divertida').palabraMasLarga(), 'programacion');
    assert.equal(cadenaWith('yo soy programador').palabraMenosLarga(), 'yo');
  });

  it('removes the first letter of every word', () => {
    const cadena = cadenaWith('hola mundo');
    cadena.eliminarPrimerLetraDeCadaPalabra();
    assert.equal(cadena.cadena(), 'ola undo');
  });

  it('removes the last letter of every word', () => {
    const cadena = cadenaWith('hola mundo');
    cadena.eliminarUltimaLetraDeCadaPalabra();
    assert.equal(cadena.cadena(), 'hol mund');
  });

  it('removes the first and last letter of every word', () => {
    const cadena = cadenaWith('hola mundo');
    cadena.eliminarPrimeraYUltimaLetraDeCadaPalabra();
    assert.equal(cadena.cadena(), 'ol und');
  });

  it('removes a range of characters', () => {
    const cadena = cadenaWith('abcdef');
    cadena.eliminar(1, 2);
    assert.equal(cadena.cadena(), 'adef');

    const rest = cadenaWith('abcdef');
    rest.eliminar(1);
    assert.equal(rest.cadena(), 'a');
  });

  it('throws when removing with invalid ranges', () => {
    assert.throws(() => cadenaWith('abc').eliminar(-1), /inicio/);
    assert.throws(() => cadenaWith('abc').eliminar(0, 0), /arrastre/);
  });

  it('inserts a string at a position', () => {
    const cadena = cadenaWith('abc');
    cadena.insertar('X', 1);
    assert.equal(cadena.cadena(), 'aXbc');

    const atEnd = cadenaWith('abc');
    atEnd.insertar('X', 3);
    assert.equal(atEnd.cadena(), 'abcX');
  });

  it('throws when inserting outside the limits', () => {
    assert.throws(() => cadenaWith('abc').insertar('X', 4), /límites/);
  });

  it('replaces a character at a position', () => {
    const cadena = cadenaWith('abc');
    cadena.remplazar('X', 1);
    assert.equal(cadena.cadena(), 'aXc');
  });

  it('throws when replacing outside the limits', () => {
    assert.throws(() => cadenaWith('abc').remplazar('X', 4), /límites/);
  });

  it('reverses each word', () => {
    const cadena = cadenaWith('hola mundo');
    cadena.invertirCadaPalabra();
    assert.equal(cadena.cadena(), 'aloh odnum');
  });

  it('reverses the phrase word order', () => {
    const cadena = cadenaWith('hola mundo');
    cadena.invertirFrase();
    assert.equal(cadena.cadena(), 'mundo hola');
  });
});
