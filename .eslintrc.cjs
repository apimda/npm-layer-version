module.exports = {
  extends: ['prettier', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    node: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  ignorePatterns: ['/lib', '/dist'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'turbo/no-undeclared-env-vars': 'off',
    'no-restricted-imports': [
      // enforce `node:` prefix
      'error',
      'assert',
      'assert/strict',
      'async_hooks',
      'buffer',
      'child_process',
      'cluster',
      'crypto',
      'dns',
      'events',
      'fs',
      'fs/promises',
      'http',
      'http2',
      'https',
      'inspector',
      'module',
      'net',
      'os',
      'path',
      'perf_hooks',
      'process',
      'querystring',
      'readline',
      'readline/promises',
      'repl',
      'stream',
      'stream/web',
      'string_decoder',
      'timers',
      'timers/promises',
      'tls',
      'trace_events',
      'tty',
      'dgram',
      'url',
      'util',
      '"v8"',
      'vm',
      'worker_threads',
      'zlib'
    ]
  }
};
