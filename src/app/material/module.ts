import {ModuleWithProviders, NgModule} from '@angular/core';
import {
    MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatListModule, MatProgressSpinnerModule, MatSidenavModule, MatToolbarModule, MatTreeModule
} from '@angular/material';

@NgModule({
    imports: [],
    exports: [
        MatToolbarModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatSidenavModule,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatTreeModule,
        MatCheckboxModule
    ],
})
export class MaterialModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MaterialModule,
            providers: []
        };
    }
}
