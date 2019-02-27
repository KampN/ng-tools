import {ModuleWithProviders, NgModule} from '@angular/core';
import {
    MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatExpansionModule, MatFormFieldModule, MatIconModule,
    MatInputModule, MatListModule, MatProgressSpinnerModule, MatSidenavModule, MatSlideToggleModule, MatTableModule, MatToolbarModule,
    MatTreeModule
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
        MatCheckboxModule,
        MatSlideToggleModule,
        MatExpansionModule,
        MatTableModule
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
