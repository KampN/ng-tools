import {ChangeDetectionStrategy, Component, Directive, ElementRef, TemplateRef, ViewContainerRef, ViewEncapsulation} from '@angular/core';

@Directive({selector: '[pickerHeaderOutlet]'})
export class PickerHeaderOutletDirective {
    constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) { }
}

@Directive({
    selector: '[pickerHeaderDef]'
})
export class PickerHeaderDefDirective {
    constructor(public template: TemplateRef<any>) {}
}

@Component({
    selector: 'picker-header',
    templateUrl: './picker-header.html',
    styleUrls: ['./picker-header.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerHeaderComponent {
}
