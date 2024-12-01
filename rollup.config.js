import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';

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
  },
  {
    input: './dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [
      dts(),
      del({ hook: 'buildEnd', targets: ['./dist/class', './dist/types'] })
    ]
  }
];
