import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs'
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
