const OFF = 0;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  root: true, // stop ESLint from looking for a configuration file in parent folders
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  plugins: ['import', 'prettier', 'react', 'flowtype'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/react',
    'prettier/flowtype',
  ],
  rules: {
    'no-console': [ERROR, { allow: ['warn', 'error'] }],
    'no-underscore-dangle': [ERROR, { enforceInMethodNames: true }],
    'import/order': [
      ERROR,
      {
        groups: [['builtin', 'external'], ['parent', 'sibling'], 'index'],
        'newlines-between': 'always',
      },
    ],
    'import/newline-after-import': ERROR,
    'import/no-mutable-exports': ERROR,
    'import/no-absolute-path': ERROR,
    'prettier/prettier': [
      ERROR,
      { singleQuote: true, trailingComma: 'all', jsxBracketSameLine: false },
    ],
    'react/jsx-no-bind': ERROR,
    'react/no-access-state-in-setstate': ERROR,
    'react/prop-types': OFF, // we use Flow instead,
    'flowtype/require-valid-file-annotation': [ERROR, 'always'],
  },
};
