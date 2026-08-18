import { Directive, Input, OnChanges, OnDestroy, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import {
	AbstractControl, AbstractFormGroupDirective, ControlContainer, UntypedFormArray, FormArrayName, UntypedFormControl, UntypedFormGroup, FormGroupDirective,
	FormGroupName
} from '@angular/forms';
import {combineLatest, ReplaySubject} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {RxCleaner} from '@kamp-n/ng-common-tools';

export class ControlErrorDirectiveExceptions {

	static controlNotFound(controlName?:string):Error {
		return new Error(`*libControlError must be used with a valid FormControl. Control "${controlName}" not found.`);
	}

	static controlParentNotFound():Error {
		return new Error(`*libControlError must be used with a parent formGroup directive when using control name as parameter.  You'll want to add a formGroup
       directive and pass it an existing FormGroup instance (you can create one in your class).`);
	}

	static ngModelGroup():Error {
		return new Error(`*libControlError cannot be used with an ngModelGroup parent when using control name as parameter. It is only compatible with parents
       that also have a "form" prefix: formGroupName, formArrayName, or formGroup.`);
	}
}

export class ControlErrorContext {
	public error;

	constructor(public $implicit:string, public errors:any) {
		this.error = errors[$implicit] || null;
	}
}

@Directive({
	selector: '[libControlError]',
	standalone: true
})
export class ControlErrorDirective implements OnInit, OnChanges, OnDestroy {
	protected vContainer = inject(ViewContainerRef);
	protected template = inject<TemplateRef<ControlErrorContext>>(TemplateRef);
	protected parent = inject(ControlContainer, { optional: true, host: true, skipSelf: true });

	@Input() libControlErrorOf:string | AbstractControl;
	protected control:AbstractControl;

	protected errorStream:ReplaySubject<any> = new ReplaySubject(1);
	protected rc:RxCleaner = new RxCleaner();

	ngOnInit():void {
		this.errorStream.pipe(
			distinctUntilChanged(),
			this.rc.takeUntil('main')
		).subscribe((errors) => this.handleControlErrors(errors));
	}

	ngOnChanges() {
		this.setUpControl();
		this.listenControlChanges();
	}

	ngOnDestroy():void {
		this.errorStream.complete();
		this.rc.complete();
	}

	protected handleControlErrors(errors:any) {
		this.vContainer.clear();
		if(this.isControlInvalid()) {
			const error = !!errors ? Object.keys(errors).find(() => true) : null;
			this.vContainer.createEmbeddedView(this.template, new ControlErrorContext(error, errors));
		}
	}

	protected listenControlChanges() {
		const control:AbstractControl = this.control;
		this.rc.unsubscribe('controls');
		if(!control) return;

		this.errorStream.next(control.errors);
		combineLatest([control.statusChanges, control.valueChanges]).pipe(
			map(() => control.errors || null),
			distinctUntilChanged(),
			this.rc.takeUntil('controls')
		).subscribe((errors) => this.errorStream.next(errors));
	}

	protected setUpControl() {
		if(!this.libControlErrorOf) return null;
		let control = null;

		if(this.isFormControl(this.libControlErrorOf)) control = this.libControlErrorOf as AbstractControl;
		else if(typeof this.libControlErrorOf === 'string') {
			this.checkParentType();
			if(this.parent) control = (this.parent as FormGroupDirective).control.get(this.libControlErrorOf);
			if(!control) throw ControlErrorDirectiveExceptions.controlNotFound(this.libControlErrorOf);
		}

		this.control = control;
	}

	protected isFormControl(item:any) {
		return item instanceof UntypedFormControl ||
			item instanceof UntypedFormGroup ||
			item instanceof UntypedFormArray;
	}

	protected isControlInvalid():boolean {
		return this.control && this.control.invalid;
	}

	protected checkParentType():void {
		if(!(this.parent instanceof FormGroupName) &&
			this.parent instanceof AbstractFormGroupDirective) throw ControlErrorDirectiveExceptions.ngModelGroup();
		else if(!(this.parent instanceof FormGroupName) &&
			!(this.parent instanceof FormGroupDirective) &&
			!(this.parent instanceof FormArrayName)) throw ControlErrorDirectiveExceptions.controlParentNotFound();
	}
}
