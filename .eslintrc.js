module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the directory
  env: {
    es6: true,
    node: true,
    browser: false,
    jest: true,
  },
  extends: [
    'eslint:recommended', // ESLint's recommended rules
    'airbnb-base', // Airbnb's base JS ESLint config
    'plugin:import/recommended', // Import plugin's recommended rules
    'plugin:import/typescript', // Import plugin's TypeScript rules
    'plugin:jsdoc/recommended-typescript-error', // To make JSDoc rules work with TypeScript
    'plugin:@typescript-eslint/recommended', // TypeScript ESLint rules
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // TypeScript ESLint rules that require type checking
    'plugin:@typescript-eslint/strict', // TypeScript ESLint rules that require strict mode
    'prettier', // Prettier rules
  ],
  plugins: ['@typescript-eslint', 'jsdoc'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['*.js', '*.cjs', '*.json'],
  rules: {
    // Import plugin rules
    'import/first': 0, // Reports any imports that come after non-import statements
    'import/extensions': 0, // Ensures consistent use of file extension within the import path
    'import/prefer-default-export': 0, // Prefer a default export if module exports a single name

    // JSDoc (documentation) rules
    'jsdoc/require-jsdoc': [
      'error',
      {
        contexts: [
          'FunctionDeclaration',
          'FunctionExpression',
          'ArrowFunctionExpression',
          'ClassDeclaration',
          'ClassExpression',
          'MethodDefinition',
        ],
      },
    ], // Requires that all functions (? other contexts) have a JSDoc block.
    'jsdoc/check-examples': 0, // Linting of JavaScruopt within @example (disabled for now, cause not supported for eslint 8).
    'jsdoc/check-indentation': 2, // Enforces indentation level for tags.
    'jsdoc/check-line-alignment': 2, // Reports invalid alignment of JSDoc block lines.
    'jsdoc/check-syntax': 2, // Reports invalid block tag syntax.
    'jsdoc/no-bad-blocks': 2, // Reports bad block tag syntax.
    'jsdoc/no-blank-block-descriptions': 2, // Reports blocks without description.
    'jsdoc/no-blank-blocks': 2, // Reports empty block tags.
    'jsdoc/require-asterisk-prefix': 2, // Requires that each JSDoc line starts with an "*".
    'jsdoc/require-description': 2, // Requires that all functions (? other contexts) have a description.
    'jsdoc/require-description-complete-sentence': 1, // Requires that block descriptions start with a capital letter and ends with a dot.
    'jsdoc/require-example': 0, // Requires that all functions (? other contexts) have examples
    'jsdoc/sort-tags': 1, // Requires that all tags are sorted alphabetically.

    // TypeScript
    '@typescript-eslint/no-explicit-any': 2, // Disallows usage of the any type.
    '@typescript-eslint/no-floating-promises': 0, // Disallows usage of promise functions without using await.
    '@typescript-eslint/explicit-member-accessibility': 2, // Enforces accessibility modifiers on class properties and methods.
    '@typescript-eslint/explicit-function-return-type': [
      2,
      { allowExpressions: true },
    ], // Enforces return type declaration of functions.
    '@typescript-eslint/no-empty-interface': 0, // Disallows the declaration of empty interfaces.
    '@typescript-eslint/consistent-type-assertions': 0, // Enforces consistent usage of type assertions.
    '@typescript-eslint/non-nullable-type-assertion-style': 0, // Enforces non-nullable type assertions using the ! postfix operator.

    // Normal ESLint rules
    'object-curly-spacing': 2, // Enforces consistent spacing inside braces
    'linebreak-style': 0, // Enforces consistent line endings (disabled for windows)
    'lines-between-class-members': 0, // Requires an empty line between class members
    'no-await-in-loop': 0, // Disallows await inside of loops
    'no-restricted-syntax': 0, // Disallows specified syntax
    'prefer-destructuring': 0, // Enforces destructuring from arrays and/or objects
    'consistent-return': 0, // Enforces consistent return statements
    'no-continue': 0, // Disallows continue statements
    'no-else-return': 0, // Disallows else blocks after return statements in if statements
    'no-unneeded-ternary': 0, // Disallows ternary operators when simpler alternatives exist
    'no-nested-ternary': 0, // Disallows nested ternary expressions
    'id-length': ['error', { min: 2 }], // Enforces a minimum identifier length
    'max-classes-per-file': 0, // Enforces a maximum number of classes per file
    'no-shadow': 0, // Disallows variable declarations from shadowing variables declared in the outer scope - Was causing problems
    'no-underscore-dangle': [2, { allow: ['_id'] }], // Disallows dangling underscores in identifiers
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
};
