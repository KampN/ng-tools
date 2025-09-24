/// <reference types="vitest" />
import {defineConfig} from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import {fileURLToPath} from 'node:url';

export default defineConfig(({mode}) => ({
    plugins: [
        angular(),
    ],
    resolve: {
        alias: {
            '@kamp-n/ng-logger': fileURLToPath(new URL('./dist/ng-logger', import.meta.url)),
            '@kamp-n/ng-common-tools': fileURLToPath(new URL('./dist/ng-common-tools', import.meta.url)),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test-setup.ts'],
        include: ['src/**/*.{spec,test}.ts'],
        reporters: ['default'],
    },
    define: {
        'import.meta.vitest': mode !== 'production',
    },
    reporters: [
        'dot',
        ['junit', {outputFile: 'coverage/junit.xml'}], // si tu veux un XML CI
    ],
    coverage: {
        provider: 'v8',
        reportsDirectory: 'coverage',
        reporter: ['text', 'html', 'lcov'], // équivalent Angular/Karma
        all: true,                          // inclut fichiers non testés
        include: ['src/**/*.ts'],
        exclude: [
            'src/main.ts',
            'src/environments/**',
            'src/**/*.spec.ts',
            '**/test-setup.ts',
        ],
    },
}));
