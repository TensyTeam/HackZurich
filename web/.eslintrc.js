module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [
    'react-app',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  env: { es6: true, browser: true, node: true, mocha: true, jest: true, jasmine: true },
  rules: {
    'arrow-parens': ['error', 'always'],
    'react/no-unescaped-entities' : 0,
    'react/no-find-dom-node': 0,
    'react/prop-types': 0,
    'no-trailing-spaces': 'warn',
    'no-case-declarations': [0, 'never'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'react/display-name': 0,
    'object-curly-spacing': ['error', 'always'],
    'computed-property-spacing': ['error', 'never'],
    'prettier/prettier': ['error', {
      printWidth: 130,
      semi: true,
      tabWidth: 2,
      trailingComma: 'es5',
      bracketSpacing: true,
      jsxSingleQuote: false,
      arrowParens: 'always',
      singleQuote: true,
    }],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
  },
}