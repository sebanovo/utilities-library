import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import Numero from '../src/class/Numero';
import type { MethodsOfNumero } from '../src/types/types';

function numeroWith(value: number): Numero {
  const numero = new Numero();
  numero.cargar(value);
  return numero;
}

describe('Numero', () => {
  it('loads, returns and downloads a number', () => {
    const numero = new Numero();
    numero.cargar(42);

    assert.equal(numero.numero(), 42);
    assert.equal(numero.descargar(), '42');
  });

  it('gets the last digit', () => {
    assert.equal(Numero.obtenerUltimoDigito(123), 3);
    assert.equal(Numero.obtenerUltimoDigito(7), 7);
  });

  it('adds a digit at the end', () => {
    assert.equal(Numero.adicionarAlFinal(12, 3), 123);
    assert.equal(Numero.adicionarAlFinal(0, 5), 5);
  });

  it('removes the last digit', () => {
    assert.equal(Numero.eliminarUltimoDigito(123), 12);
    assert.equal(Numero.eliminarUltimoDigito(5), 0);
  });

  it('gets the first digit', () => {
    assert.equal(Numero.obtenerPrimerDigito(1234), 1);
    assert.equal(Numero.obtenerPrimerDigito(0), 0);
  });

  it('adds a digit at the beginning', () => {
    assert.equal(Numero.adicionarAlPrincipio(234, 1), 1234);
    assert.equal(Numero.adicionarAlPrincipio(0, 7), 7);
  });

  it('removes the first digit', () => {
    assert.equal(Numero.eliminarPrimerDigito(1234), 234);
    assert.equal(Numero.eliminarPrimerDigito(0), 0);
  });

  it('reverses a number with all four strategies', () => {
    const invertir1 = numeroWith(1234);
    invertir1.invertir1();
    assert.equal(invertir1.numero(), 4321);

    const invertir1R = numeroWith(1234);
    invertir1R.invertir1R();
    assert.equal(invertir1R.numero(), 4321);

    const invertir2 = numeroWith(1234);
    invertir2.invertir2();
    assert.equal(invertir2.numero(), 4321);

    const invertir2R = numeroWith(1234);
    invertir2R.invertir2R();
    assert.equal(invertir2R.numero(), 4321);
  });

  it('returns the length and amount of digits', () => {
    assert.equal(numeroWith(12345).length(), 5);
    assert.equal(numeroWith(-123).length(), 3);
    assert.equal(Numero.cantidadDigitos(0), 1);
    assert.equal(Numero.cantidadDigitos(123), 3);
    assert.equal(Numero.cantidadDigitos(-4567), 4);
  });

  it('sorts digits ascending and descending', () => {
    const asc = numeroWith(312);
    asc.ordenar();
    assert.equal(asc.numero(), 123);

    const desc = numeroWith(312);
    desc.ordenar('desc');
    assert.equal(desc.numero(), 321);
  });

  it('throws when sort direction is invalid', () => {
    const numero = numeroWith(123);
    assert.throws(() => numero.ordenar('up' as 'asc'), /dirección/);
  });

  it('checks if a number is even', () => {
    assert.equal(numeroWith(4).esPar(), true);
    assert.equal(numeroWith(7).esPar(), false);
  });

  it('checks if a number is prime', () => {
    assert.equal(numeroWith(2).esPrimo(), true);
    assert.equal(numeroWith(7).esPrimo(), true);
    assert.equal(numeroWith(1).esPrimo(), false);
    assert.equal(numeroWith(9).esPrimo(), false);
  });

  it('generates random numbers inside the range', () => {
    for (let i = 0; i < 100; i++) {
      const value = Numero.random(5, 10);
      assert.ok(value >= 5);
      assert.ok(value <= 10);
      assert.ok(Number.isInteger(value));
    }
  });

  it('checks if a number is a palindrome', () => {
    assert.equal(numeroWith(121).esCapicua(), true);
    assert.equal(numeroWith(123).esCapicua(), false);
  });

  it('checks if a number is a perfect square', () => {
    assert.equal(numeroWith(16).esCuadradoPerfecto(), true);
    assert.equal(numeroWith(10).esCuadradoPerfecto(), false);
  });

  it('checks if a number is Fibonacci', () => {
    assert.equal(numeroWith(8).esFibonacci(), true);
    assert.equal(numeroWith(13).esFibonacci(), true);
    assert.equal(numeroWith(7).esFibonacci(), false);
  });

  it('returns the countdown number', () => {
    assert.equal(numeroWith(5).cuentaRegresiva(), 54321);
    assert.equal(numeroWith(1).cuentaRegresiva(), 1);
  });

  it('repeats each digit according to its value', () => {
    const numero = numeroWith(524);
    numero.repetirDigitos();
    assert.equal(numero.numero(), 55555224444);
  });

  it('calculates factorials', () => {
    assert.equal(numeroWith(0).factorial(), 1);
    assert.equal(numeroWith(1).factorial(), 1);
    assert.equal(numeroWith(5).factorial(), 120);
    assert.throws(() => numeroWith(-1).factorial(), /negativos/);
  });

  it('removes digits using Numero methods', () => {
    const evens = numeroWith(123456);
    evens.eliminarDigitosMetodos('esPar');
    assert.equal(evens.numero(), 246);

    const notEvens = numeroWith(123456);
    notEvens.eliminarDigitosMetodos('esPar', false);
    assert.equal(notEvens.numero(), 135);

    const primes = numeroWith(123456);
    primes.eliminarDigitosMetodos('esPrimo');
    assert.equal(primes.numero(), 235);
  });

  it('throws when removing digits with an invalid method', () => {
    const numero = numeroWith(123);
    assert.throws(
      () => numero.eliminarDigitosMetodos('noExiste' as MethodsOfNumero),
      /no corresponse/
    );
  });

  it('finds the largest and smallest digit', () => {
    assert.deepEqual(numeroWith(58321).encontrarMayorYMenorDigito(), {
      mayor: 8,
      menor: 1,
    });
  });

  it('converts decimal numbers to base N', () => {
    assert.equal(Numero.decimalABaseN(255, 16), 'FF');
    assert.equal(Numero.decimalABaseN(10, 2), '1010');
    assert.equal(Numero.decimalABaseN(0, 10), '0');
    assert.equal(Numero.decimalABaseN(5, 1), '11111');
  });

  it('throws when converting to an invalid base', () => {
    assert.throws(() => Numero.decimalABaseN(10, 0), /base/);
    assert.throws(() => Numero.decimalABaseN(10, 37), /base/);
  });

  it('converts numbers in base N to decimal', () => {
    assert.equal(Numero.baseNADecimal('FF', 16), 255);
    assert.equal(Numero.baseNADecimal('1010', 2), 10);
    assert.equal(Numero.baseNADecimal('11111', 1), 5);
    assert.equal(Numero.baseNADecimal('ff', 16), 255);
  });

  it('throws when converting from an invalid base', () => {
    assert.throws(() => Numero.baseNADecimal('10', 0), /base/);
    assert.throws(() => Numero.baseNADecimal('10', 37), /base/);
  });
});
