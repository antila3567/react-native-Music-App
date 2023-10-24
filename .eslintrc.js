module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    '@react-native-community/eslint-config',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    ecmaVersion: 14,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
    'react-native/react-native': true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react-native/no-color-literals': 'off',
    'react-native/no-inline-styles': 'off',
    'react-native/no-raw-text': 'error',
    'react-native/sort-styles': 'off',
    'react-native/no-single-element-style-arrays': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'react-native/no-unused-styles': 'error',
    'comma-dangle': ['off', { functions: 'never' }],
  },
};
