import {AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {PickerHeaderDefDirective, PickerHeaderOutletDirective} from '../picker-header/picker-header';

@Component({
    selector: 'picker-section, [picker-section]',
    templateUrl: './template.html',
    styleUrls: ['./style.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerSectionComponent<T> implements AfterContentInit, OnDestroy {

    @ViewChild(PickerHeaderOutletDirective) headerOutlet: PickerHeaderOutletDirective;
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
