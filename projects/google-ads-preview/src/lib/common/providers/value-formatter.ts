import {InjectionToken} from '@angular/core';

export const GADS_PREVIEW_VALUE_FORMATTER = new InjectionToken('GADS_PREVIEW_VALUE_FORMATTER');

export type GAdsPreviewValueFormatter = (value: string) => string;
