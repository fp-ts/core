/* eslint-disable no-undef */
module.exports = {
  ignorePatterns: ['build', 'dist', 'dtslint', '*.cjs', '*.mjs', 'docs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.eslint.json'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['deprecation'],
  rules: {
    '@typescript-eslint/array-type': ['warn', { 'default': 'generic', 'readonly': 'generic' }],
    '@typescript-eslint/prefer-readonly': 'warn',
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
    '@typescript-eslint/consistent-type-imports': 'warn',
    'prefer-rest-params': 'off',
    'prefer-spread': 'off',
    'deprecation/deprecation': 'off'
  }
}
