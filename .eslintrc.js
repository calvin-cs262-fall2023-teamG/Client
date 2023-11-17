module.exports = {
  root: true,
  extends: ['universe/native', 'airbnb'],
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'prettier/prettier': 'off',
    'react/jsx-filename-extension': 'off',
    'no-use-before-define': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-console': 'off',
  },
};
