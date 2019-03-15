import {ModuleWithProviders, NgModule} from '@angular/core';
import {
    MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatDividerModule, MatExpansionModule,
    MatFormFieldModule,
    MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressSpinnerModule, MatSidenavModule, MatSlideToggleModule,
    MatTableModule, MatToolbarModule, MatTreeModule
} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    imports: [],
    exports: [
        FlexLayoutModule,
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
        MatTableModule,
        MatMenuModule,
        MatDividerModule
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
