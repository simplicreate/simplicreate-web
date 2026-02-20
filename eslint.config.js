import js from '@eslint/js';
import globals from 'globals';  
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import jsdoc from 'eslint-plugin-jsdoc';


export default [
  {
  files: ['api/**/*.{js,ts}'],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.node,
      fetch: 'readonly',
      Request: 'readonly',
      Response: 'readonly',
    },
  },
  rules: {
    'no-console': 'off',
  },
},
  
  js.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        console: 'readonly',
        HTMLElement: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      jsdoc,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'jsdoc/require-jsdoc': ['error', {
        contexts: ['TSClassDeclaration']
      }],
    },
  },
  {
    files: ['src/**/*.spec.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        describe: 'readonly',
        beforeEach: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        HTMLElement: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
];