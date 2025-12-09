import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import noCommentedCode from 'eslint-plugin-no-commented-code';
import unusedImports from 'eslint-plugin-unused-imports';
import onlyWarn from 'eslint-plugin-only-warn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        extraFileExtensions: ['.svelte']
      }
    },
    plugins: {
      'no-commented-code': noCommentedCode,
      'unused-imports': unusedImports,
      'only-warn': onlyWarn
    },
    rules: {
      // Warn when commented code is detected
      'no-commented-code/no-commented-code': 'warn',
      // Turn off some strict TypeScript rules that might be too noisy
      '@typescript-eslint/no-unused-vars': 'off', // Turn off base rule
      '@typescript-eslint/ban-ts-comment': 'off',
      // Use unused-imports plugin instead
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ]
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  {
    ignores: ['build/', '.svelte-kit/', 'dist/', 'node_modules/', 'functions/']
  }
];
