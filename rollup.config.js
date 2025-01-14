const  typescript = require('@rollup/plugin-typescript');
const terser  = require('@rollup/plugin-terser');

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm'
      },
      {
        file: 'dist/index.min.js',
        format: 'umd',
        name: 'utils',
        plugins: [terser()]
      }
    ],
    plugins: [typescript({ tsconfig: './tsconfig.json' })]
  }
];
