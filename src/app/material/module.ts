import {ModuleWithProviders, NgModule} from '@angular/core';
import {
    MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatFormFieldModule,
    MatIconModule, MatInputModule, MatListModule, MatProgressSpinnerModule, MatSidenavModule, MatSlideToggleModule, MatTableModule,
    MatToolbarModule, MatTreeModule
} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';

@NgModule({
    imports: [],
    exports: [
        DragDropModule,
        PortalModule,

        MatDialogModule,
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
