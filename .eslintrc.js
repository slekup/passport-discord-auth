const path = require('path');

module.exports = {
  root: true,
  extends: ['adonis'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: [path.resolve(__dirname, '.tsconfig.json')],
      },
      node: true,
    },
  },
};
