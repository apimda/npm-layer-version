module.exports = {
  extends: ['prettier', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    node: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  ignorePatterns: ['/lib', '/dist']
  // rules: {
  //   'newline-per-chained-call': 'error'
  // }
};