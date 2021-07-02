import {InjectionToken} from '@angular/core';

export const GADS_PREVIEW_TRANSLATOR = new InjectionToken('GADS_PREVIEW_TRANSLATOR');

export type GAdsPreviewTranslator = (value: string) => string;
