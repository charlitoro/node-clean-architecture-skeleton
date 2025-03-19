import globals from 'globals';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['mongo_data/', 'build/', 'dist/', 'node_modules/']),
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: 'readonly'
      }
    },
    rules: {
      'no-console': 'off',
      'no-underscore-dangle': [
        'error',
        { allowAfterThis: true, allow: ['_id'] }
      ],
      'no-buffer-constructor': 'off',
      'no-restricted-syntax': 'off',
      'object-curly-newline': ['error', { consistent: true }],
      'max-len': ['error', { code: 120 }],
      'implicit-arrow-linebreak': 'off',
      indent: 'off',
      'operator-linebreak': 'off',
      'prettier/prettier': 'error'
    },
    plugins: {
      prettier: pluginPrettier
    }
  }
]);
