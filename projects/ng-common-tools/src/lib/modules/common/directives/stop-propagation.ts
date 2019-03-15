import {Directive, ElementRef, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
    selector: '[stopPropagation]'
})
export class StopPropagationDirective implements OnChanges, OnDestroy {
    @Input('stopPropagation') eventName: string = 'click';
    protected _listener: () => void;

    constructor(protected ref: ElementRef, protected render: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('eventName' in changes) this.lockPropagation();
    }

    ngOnDestroy(): void {
        if (this._listener) this._listener();
    }

    lockPropagation() {
        if (this._listener) this._listener();
        this._listener = null;
        if (this.eventName)
            this._listener = this.render.listen(this.ref.nativeElement, this.eventName, (event: Event) => {
                event.stopPropagation();
            });
    }

}
