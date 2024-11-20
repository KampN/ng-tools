import {ChangeDetectionStrategy, Component, Directive, ElementRef, TemplateRef, ViewContainerRef, ViewEncapsulation} from '@angular/core';

@Directive({
    selector: '[pickerHeaderOutlet]',
    standalone: true,
})
export class PickerHeaderOutletDirective {
    constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) { }
}

@Directive({
    selector: '[pickerHeaderDef]',
    standalone: true,
})
export class PickerHeaderDefDirective {
    constructor(public template: TemplateRef<any>) {}
}

@Component({
    selector: 'picker-header',
    standalone: true,
    templateUrl: './picker-header.html',
    styleUrls: ['./picker-header.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerHeaderComponent {
}
