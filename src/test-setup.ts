// IMPORTANT : ces imports doivent être au top du fichier
import '@angular/compiler';
import '@analogjs/vitest-angular/setup-zone';

import {getTestBed} from '@angular/core/testing';
import {BrowserTestingModule, platformBrowserTesting,} from '@angular/platform-browser/testing';

getTestBed().initTestEnvironment(
    BrowserTestingModule,
    platformBrowserTesting(),
);
