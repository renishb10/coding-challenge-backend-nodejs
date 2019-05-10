const fs = require('fs');

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  env: {
    es6: true,
  },
  root: true,
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'no-console': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },
  globals: {
    logger: false,
  },
  parserOptions: {
    ecmaVersion: 6,
  },
};
