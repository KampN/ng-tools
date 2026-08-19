import { ChangeDetectionStrategy, Component, Directive, ElementRef, TemplateRef, ViewContainerRef, ViewEncapsulation, inject } from '@angular/core';

@Directive({
    selector: '[pickerHeaderOutlet]',
    standalone: true,
})
export class PickerHeaderOutletDirective {
    viewContainer = inject(ViewContainerRef);
    elementRef = inject(ElementRef);
}

@Directive({
    selector: '[pickerHeaderDef]',
    standalone: true,
})
export class PickerHeaderDefDirective {
    template = inject<TemplateRef<any>>(TemplateRef);
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
