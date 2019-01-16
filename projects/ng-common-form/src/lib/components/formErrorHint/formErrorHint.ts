import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, Input, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges, SkipSelf,
    ViewEncapsulation
} from '@angular/core';
import {
    AbstractControl, AbstractFormGroupDirective, ControlContainer, FormArrayName, FormGroupDirective, FormGroupName
} from '@angular/forms';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {combineLatest, ReplaySubject} from 'rxjs';
import {RxCleaner} from '@kamp-n/ng-common-tools';

export class FormErrorHintException {

    static controlParentException(): void {
        throw new Error(`form-error-hint must be used with a parent formGroup directive.  You'll want to add a formGroup
       directive and pass it an existing FormGroup instance (you can create one in your class).`);
    }

    static ngModelGroupException(): void {
        throw new Error(`form-error-hint cannot be used with an ngModelGroup parent. It is only compatible with parents
       that also have a "form" prefix: formGroupName, formArrayName, or formGroup.`);
    }
}

@Component({
    selector: 'form-error-hint',
    templateUrl: './template.html',
    styleUrls: ['./style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class FormErrorHintComponent implements OnInit, OnChanges, OnDestroy {

    @Input() control: AbstractControl;
    @Input() controlName: string;
    public errors: any = null;
    public errorType: string = null;
    public showError: boolean = false;
    protected rc: RxCleaner = new RxCleaner();
    protected errorStream: ReplaySubject<any> = new ReplaySubject(1);

    constructor(protected cdr: ChangeDetectorRef, @Optional() @Host() @SkipSelf() protected parent: ControlContainer) {
    }

    ngOnInit(): void {
        this.errorStream.pipe(
            distinctUntilChanged(),
            this.rc.takeUntil('main')
        ).subscribe((errors) => this.handleControlErrors(errors));
    }

    ngOnChanges(changes: SimpleChanges) {
        let controlChanged: boolean;
        if ('controlName' in changes) controlChanged = this.setUpControl();
        controlChanged = controlChanged || 'control' in changes;
        if (controlChanged) this.listenControlChanges();
    }

    ngOnDestroy(): void {
        this.errorStream.complete();
        this.rc.complete();
    }

    public e(errorName: string) {
        return this.getError(errorName);
    }

    public getError(errorName: string): any {
        if (!this.errors) return null;
        return this.errors[errorName] || null;
    }

    protected setUpControl() {
        this.checkParentType();
        const parent: FormGroupDirective = this.parent as any;
        let init: boolean = false;
        if (!!parent) {
            this.control = parent.control.get(this.controlName);
            init = true;
        }
        return init;
    }

    protected listenControlChanges(): void {
        const control: AbstractControl = this.control;
        this.rc.unsubscribe('controls');
        if (!control) return;
        this.errorStream.next(control.errors);
        combineLatest([control.statusChanges, control.valueChanges]).pipe(
            map(() => control.errors || null),
            distinctUntilChanged(),
            this.rc.takeUntil('controls')
        ).subscribe((errors) => this.errorStream.next(errors));
    }

    protected handleControlErrors(errors: any) {
        this.errors = this.isControlInvalid() ? errors : null;
        this.showError = !!this.errors;
        this.errorType = !!this.errors ? Object.keys(errors).find(() => true) : null;
        this.cdr.markForCheck();
    }

    protected isControlInvalid(): boolean {
        return this.control && this.control.invalid;
    }

    protected checkParentType(): void {
        if (!(this.parent instanceof FormGroupName) &&
            this.parent instanceof AbstractFormGroupDirective) FormErrorHintException.ngModelGroupException();
        else if (!(this.parent instanceof FormGroupName) &&
            !(this.parent instanceof FormGroupDirective) &&
            !(this.parent instanceof FormArrayName)) FormErrorHintException.controlParentException();
    }

}
