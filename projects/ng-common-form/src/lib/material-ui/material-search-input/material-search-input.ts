import {
	AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, OnInit,
	Output, ViewChild, ViewEncapsulation
} from '@angular/core';
import {FocusMonitor, FocusOrigin} from '@angular/cdk/a11y';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {RxCleaner} from '@kamp-n/ng-common-tools';
import {Subject} from 'rxjs';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
	selector: 'material-search-input',
	templateUrl: './material-search-input.html',
	styleUrls: ['./material-search-input.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MaterialSearchInputComponent),
			multi: true
		},
	],
	host: {
		'[class.disabled]': 'disabled'
	}
})
export class MaterialSearchInputComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {

	@Input() search: string = '';
	@Output() searchChange: EventEmitter<string> = new EventEmitter();
	readonly valueChange: Subject<string> = new Subject();

	@ViewChild('input') input: ElementRef;
	@Input() placeholder = '';
	@Input() disableClear: boolean = false;

	public focused: boolean = false;
	protected rc: RxCleaner = new RxCleaner();

	constructor(protected monitor: FocusMonitor, protected cdr: ChangeDetectorRef) { }

	protected _disabled: boolean = false;

	get disabled(): boolean {return this._disabled;}

	@Input() set disabled(val: boolean) {this._disabled = coerceBooleanProperty(val);}

	get showClearBtn(): boolean {
		return !this.disableClear && (this.focused || !!this.search);
	}

	ngOnInit() {
		this.valueChange.pipe(
			distinctUntilChanged(),
			this.rc.takeUntil('destroy')
		).subscribe((value: string) => {
			this.search = value;
			this.onTouched();
			this.onChange(this.search);
			this.searchChange.emit(this.search);
		});
	}

	ngAfterViewInit(): void {
		this.monitor.monitor(this.input.nativeElement).pipe(
			map((origin: FocusOrigin) => !!origin),
			distinctUntilChanged(),
			this.rc.takeUntil('destroy')
		).subscribe((focused: boolean) => {
			this.focused = focused;
			this.cdr.markForCheck();
		});
	}

	ngOnDestroy(): void {
		this.rc.complete();
		this.searchChange.complete();
		this.valueChange.complete();
	}

	onChange = function(_) { };

	onTouched = function() { };

	registerOnChange(fn) { this.onChange = fn; }

	registerOnTouched(fn) { this.onTouched = fn; }

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	writeValue(val: string): void {
		this.search = val;
		this.cdr.markForCheck();
	}

}
