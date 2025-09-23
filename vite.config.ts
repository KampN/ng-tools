/// <reference types="vitest" />
import {defineConfig} from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig(({mode}) => ({
    plugins: [angular()],
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
        'dot',                              // ≈ --progress=false (sortie minimale)
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
