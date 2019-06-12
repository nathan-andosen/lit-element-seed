import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
// import buble from 'rollup-plugin-buble';
import babel from 'rollup-plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';
// import { uglify } from 'rollup-plugin-uglify';

const componentName = 'status-alert';




const babelConfig = {
  babelrc: false,
  extensions: [
    ...DEFAULT_EXTENSIONS,
    'ts',
    'tsx'
  ],
  runtimeHelpers: true,
  "plugins": [
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-transform-classes", {"loose": true}],
    [
      '@babel/plugin-transform-runtime',
      {
        "corejs": false,
        "helpers": false,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ],
  presets: [
    [
      '@babel/preset-env', {
        // "useBuiltIns": "entry",
        targets: {
          ie: '11'
        }
      }
    ]
  ]
};

const prodBuild = {
  input: `src/components/${componentName}/${componentName}.component.ts`,
  output: {
    file: `dist/${componentName}/${componentName}.component.umd.js`,
    format: 'umd',
    name: `${componentName}`,
    globals: {
      '@babel/runtime/regenerator': '_regeneratorRuntime'
    }
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      typescript: require('typescript'),
    }),
    babel(babelConfig)
    
    
    // uglify()
  ]
};

const prodBuildEsm = {
  input: `src/components/${componentName}/${componentName}.component.ts`,
  output: {
    file: `dist/${componentName}/${componentName}.component.esm.js`,
    format: 'es'
  },
  external: [
    'lit-element'
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    resolve(),
    commonjs()
  ]
};



export default [
  prodBuild,
  // prodBuildEsm,
];