const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  root: true,
  extends: [
    '@react-native-community',
    'prettier', // Add prettier rules to eslint
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
  ],
  plugins: [
    'react-native',
    'react-hooks',
    '@typescript-eslint/eslint-plugin',
    'unused-imports',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    semi: 'off',
    'prettier/prettier': isProd ? 2 : 1,
    'import/named': 'warn',
    'unused-imports/no-unused-imports': 'warn',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {order: 'desc'},
      },
    ],
    'max-len': ['warn', {code: 150, ignorePattern: 'd="([\\s\\S]*?)"'}],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts', '.js'],
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
