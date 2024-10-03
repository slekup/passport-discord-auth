import slekupConfig from 'eslint-config-slekup/auto.js';

export default [
  ...slekupConfig,
  {
    rules: {
      'no-undef': 0,
      'yml/block-sequence': 0,
      '@typescript-eslint/no-unused-expressions': 0,
      '@typescript-eslint/no-require-imports': 0,
      '@typescript-eslint/no-unused-vars': 0,
      'jsonc/no-comments': 0,
      'jsonc/indent': 0,
      'no-constant-binary-expression': 0,
    },
    ignores: [
      './node_modules',
      './build',
      './dist',
      './out',
      './coverage/',
      './*.yaml',
      './tsconfig.json',
      './tsup.config.ts',
      './*.md',
    ],
  },
];
