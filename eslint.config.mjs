import js from '@eslint/js';
import globals from 'globals';
import { configs as tseslintConfig } from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            importPlugin.flatConfigs.recommended,
            importPlugin.flatConfigs.typescript,
        ],
        rules: {
            'import/no-unresolved': 'off',
            'import/order': [
                'error',
                {
                    'newlines-between': 'always',
                    groups: [
                        ['builtin', 'external'],
                        ['internal', 'parent', 'sibling', 'index'],
                    ],
                },
            ],
        },
    },
    js.configs.recommended,
    tseslintConfig.recommended,
    eslintConfigPrettier,
    eslintPluginPrettierRecommended,
    {
        rules: {
            'prettier/prettier': 'error',
            'linebreak-style': ['error', 'unix'],
            'no-console': 'warn',
        },
        settings: {
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts'],
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
            },
        },
    },
]);
