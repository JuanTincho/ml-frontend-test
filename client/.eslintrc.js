module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:import/errors', 'plugin:import/warnings', 'plugin:react/recommended'],
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    'no-multi-spaces': [
      'error',
      {
        ignoreEOLComments: false,
        exceptions: {
          ImportDeclaration: true,
          Property: true,
          VariableDeclarator: true
        }
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true
      }
    ],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }]
  }
};
