import {AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {PickerHeaderDefDirective, PickerHeaderOutletDirective} from '../picker-header/picker-header';
import {CommonToolsModule} from '@kamp-n/ng-common-tools';

@Component({
    selector: 'picker-section, [picker-section]',
    standalone: true,
    templateUrl: './picker-section.html',
    styleUrls: ['./picker-section.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonToolsModule, PickerHeaderOutletDirective
    ]
})
export class PickerSectionComponent<T> implements AfterContentInit, OnDestroy {

    @ViewChild(PickerHeaderOutletDirective, {static: true}) headerOutlet: PickerHeaderOutletDirective;
    @ContentChild(PickerHeaderDefDirective) headerDef: PickerHeaderDefDirective;

    ngAfterContentInit(): void {
        if (this.headerDef) this.headerOutlet.viewContainer.createEmbeddedView(
            this.headerDef.template
        );
    }

    ngOnDestroy(): void {
        this.headerOutlet.viewContainer.clear();
    }

}
