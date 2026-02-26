export default class Extra {
  /**
   * @example
   *  n = 6
   *  1)         1
   *  2)        1 1
   *  3)       1 2 1
   *  4)      1 3 3 1
   *  5)     1 4 6 4 1
   *  6)   1 5 10 10 5 1
   * @param n size of triangle
   * @returns {number[][]}
   */
  static pascalsTriangle(n: number): number[][] {
    const m: number[][] = [];
    if (n < 0) throw new Error('Error no puede ser menor a cero');
    if (n >= 1) m.push([1]);
    if (n >= 2) m.push([1, 1]);
    for (let i = 2; i < n; i++) {
      m.push(new Array(i + 1).fill(1));
      for (let j = 1; j < m[i].length - 1; j++) {
        m[i][j] = m[i - 1][j - 1] + m[i - 1][j];
      }
    }
    return m;
  }
}
