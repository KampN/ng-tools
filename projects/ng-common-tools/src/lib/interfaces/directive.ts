import {ElementRef, TemplateRef, ViewContainerRef} from '@angular/core';

export interface OutletDirective {
    viewContainer: ViewContainerRef;
    elementRef: ElementRef;
}

export interface TemplateDefDirective<T = any> {
    template: TemplateRef<T>;
}
