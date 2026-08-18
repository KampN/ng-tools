import { Directive, ElementRef, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges, inject } from '@angular/core';

@Directive({
    selector: '[libStopPropagation]', standalone: true
})
export class StopPropagationDirective implements OnChanges, OnDestroy {
    protected ref = inject(ElementRef);
    protected render = inject(Renderer2);

    @Input('libStopPropagation') eventName: string = 'click';
    protected _listener: () => void;

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
