import {Directive, Host, Input, OnChanges, OnDestroy, OnInit, Optional, SkipSelf, TemplateRef, ViewContainerRef} from '@angular/core';
import {
	AbstractControl, AbstractFormGroupDirective, ControlContainer, FormArray, FormArrayName, FormControl, FormGroup, FormGroupDirective,
	FormGroupName
} from '@angular/forms';
import {combineLatest, ReplaySubject} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {RxCleaner} from '@kamp-n/ng-common-tools';

export class ControlErrorDirectiveExceptions {

	static controlNotFound(controlName?:string):Error {
		return new Error(`*controlError must be used with a valid FormControl. Control "${controlName}" not found.`);
	}

	static controlParentNotFound():Error {
		return new Error(`*controlError must be used with a parent formGroup directive when using control name as parameter.  You'll want to add a formGroup
       directive and pass it an existing FormGroup instance (you can create one in your class).`);
	}

	static ngModelGroup():Error {
		return new Error(`*controlError cannot be used with an ngModelGroup parent when using control name as parameter. It is only compatible with parents
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
	selector: '[controlError]'
})
export class ControlErrorDirective implements OnInit, OnChanges, OnDestroy {
	@Input() controlErrorOf:string | AbstractControl;
	protected control:AbstractControl;

	protected errorStream:ReplaySubject<any> = new ReplaySubject(1);
	protected rc:RxCleaner = new RxCleaner();

	constructor(protected vContainer:ViewContainerRef, protected template:TemplateRef<ControlErrorContext>,
	            @Optional() @Host() @SkipSelf() protected parent:ControlContainer) {
	}

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
		if(!this.controlErrorOf) return null;
		let control = null;

		if(this.isFormControl(this.controlErrorOf)) control = this.controlErrorOf as AbstractControl;
		else if(typeof this.controlErrorOf === 'string') {
			this.checkParentType();
			if(this.parent) control = (this.parent as FormGroupDirective).control.get(this.controlErrorOf);
			if(!control) throw ControlErrorDirectiveExceptions.controlNotFound(this.controlErrorOf);
		}

		this.control = control;
	}

	protected isFormControl(item:any) {
		return item instanceof FormControl ||
			item instanceof FormGroup ||
			item instanceof FormArray;
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
