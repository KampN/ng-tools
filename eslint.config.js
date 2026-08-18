// @ts-check
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  {
    // Mirrors the "ignorePatterns" of the previous .eslintrc.json.
    ignores: ['dist/**', 'coverage/**', '.angular/**', 'node_modules/**'],
  },
  {
    files: ['**/*.ts'],
    extends: [
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        {
          prefix: 'lib',
          style: 'kebab-case',
          type: 'element',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          prefix: 'lib',
          style: 'camelCase',
          type: 'attribute',
        },
      ],
    },
  },
  {
    // The publishable libraries were never linted by the previous
    // .eslintrc.json, which excluded "projects/**". Their component and
    // directive selectors are therefore not "lib"-prefixed, and they are part
    // of the published API of @kamp-n/ng-common-tools, @kamp-n/ng-common-form
    // and @kamp-n/gads-preview. Renaming them would break every consumer
    // template and every CSS override, so the two selector rules stay off
    // here. They remain active elsewhere for new code.
    files: ['projects/**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': 'off',
      '@angular-eslint/directive-selector': 'off',
    },
  },
  {
    // LogDisplay and FSLogDisplay are extension points: FSLogDisplay extends
    // LogDisplay and any consumer subclass calls super(logStream, config).
    // Moving those dependencies to inject() would silently break every
    // subclass, so constructor injection stays in the logger libraries.
    files: ['projects/ng-logger/**/*.ts', 'projects/ng-logger-fs/**/*.ts'],
    rules: {
      '@angular-eslint/prefer-inject': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
    ],
    rules: {},
  },
);
