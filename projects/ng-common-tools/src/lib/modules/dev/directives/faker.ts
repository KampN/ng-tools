import * as Faker from 'faker';
import {Directive, EmbeddedViewRef, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

export class FakerContext {
    constructor(public $implicit: Faker.FakerStatic) {}
}

@Directive({
    selector: '[faker]'
})
export class FakerDirective implements OnInit {

    protected context: FakerContext = new FakerContext(Faker);
    protected viewRef: EmbeddedViewRef<FakerContext>;

    constructor(protected vc: ViewContainerRef, protected template: TemplateRef<FakerContext>) {}

    ngOnInit(): void {
        this.updateView();
    }

    protected updateView() {
        if (!this.viewRef) {
            this.vc.clear();
            this.viewRef = this.vc.createEmbeddedView(this.template, this.context);
            this.viewRef.detach();
        }
        this.viewRef.detectChanges();
    }
}
