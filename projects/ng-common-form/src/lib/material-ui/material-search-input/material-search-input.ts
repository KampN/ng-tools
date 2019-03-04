import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output,
    ViewChild, ViewEncapsulation
} from '@angular/core';
import {FocusMonitor, FocusOrigin} from '@angular/cdk/a11y';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {RxCleaner} from '@kamp-n/ng-common-tools';
import {Subject} from 'rxjs';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'material-search-input',
    templateUrl: './template.html',
    styleUrls: ['./style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MaterialSearchInputComponent),
            multi: true
        },
    ]
})
export class MaterialSearchInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

    @Input() search: string = '';
    @Output() searchChange: EventEmitter<string> = new EventEmitter();
    readonly valueChange: Subject<string> = new Subject();

    @ViewChild('input') input: ElementRef;
    @Input() placeholder = '';
    @Input() disableClear: boolean = false;

    public focused: boolean = false;
    public disabled: boolean = false;
    protected rc: RxCleaner = new RxCleaner();

    constructor(protected monitor: FocusMonitor, protected cdr: ChangeDetectorRef) { }

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
