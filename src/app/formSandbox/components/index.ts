import {Type} from '@angular/core';
import {AutocompleteSampleComponent} from './autocomplete-sample/autocomplete-sample';
import {
    FormSelectControlDirective, FormSelectGroupDirective, PickerSectionSampleComponent
} from './picker-section-sample/picker-section-sample';

export const Components: Type<any>[] = [
    AutocompleteSampleComponent,
    PickerSectionSampleComponent,
    FormSelectControlDirective,
    FormSelectGroupDirective,
];
