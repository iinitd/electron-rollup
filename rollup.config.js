// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss'
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

const env = process.env.NODE_ENV

export default {
  input: 'src/renderer.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    postcss({ extensions: ['.css'],
    plugins: [
      simplevars(),
      nested(),
      cssnext({ warnForDuplicates: false, }),
      cssnano()
    ] }),
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
  ]
};