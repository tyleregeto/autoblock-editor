import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from 'rollup-plugin-replace';
import typescript from '@rollup/plugin-typescript';


export default {
    input: 'main.ts',
    output: {
        file: 'bundle.js',
        format: 'iife',
        sourcemap: true,
    },
    plugins: [
        resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
        typescript({ sourceMap: true }),
        commonjs(),
        babel({ babelHelpers: 'bundled' }),
        replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    ],
    onwarn: (warning, warn) => {
        // suppress eval warnings
        if (warning.code === 'EVAL') {
            return;
        }
        warn(warning);
    }
};