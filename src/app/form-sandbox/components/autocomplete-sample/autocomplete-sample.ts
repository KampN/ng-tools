import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {delay, filter, startWith, switchMap, tap} from 'rxjs/operators';
import {RxCleaner, StateManager} from '@kamp-n/ng-common-tools';
import {CommonValidators} from '@kamp-n/ng-common-form';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../../material/module";

export interface User {
    name: string;
}

const isUserValidator = CommonValidators.matchFn((data) => typeof data === 'object', 'invalid_user');

@Component({
    selector: 'autocomplete-sample',
    templateUrl: './autocomplete-sample.html',
	styleUrls: ['./autocomplete-sample.scss'],
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialModule
	],
	encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteSampleComponent implements OnInit, OnDestroy {
    form: UntypedFormGroup;
    options: User[] = [
        {name: 'Mary'},
        {name: 'Marianne'},
        {name: 'Shelley'},
        {name: 'Igor'},
        {name: 'Isabelle'},
    ];
    filteredOptions: Observable<User[]>;
    protected rc: RxCleaner = new RxCleaner();
    protected states: StateManager = new StateManager();

    constructor(protected fb: UntypedFormBuilder, protected cdr: ChangeDetectorRef) { }

    get isQueryingUsers(): boolean {
        return this.states.is('loading');
    }

    ngOnInit() {
        this.initForm();

        this.states.stateChange.subscribe((state) => this.cdr.markForCheck());
    }

    ngOnDestroy(): void {
        this.rc.complete();
        this.states.destroy();
    }

    displayFn(user?: User): string | undefined {
        return user ? user.name : undefined;
    }

    protected initForm() {
        this.form = this.fb.group({
            user: this.fb.control(null, [Validators.required, isUserValidator])
        });
        this.filteredOptions = this.form.get('user')
            .valueChanges.pipe(
                startWith<string | User>(''),
                filter((value: string | User) => typeof value === 'string'),
                switchMap((name: string) => this.queryUsers(name)),
                this.rc.takeUntil('form')
            );
    }

    protected queryUsers(name: string): Observable<User[]> {
        this.states.active('loading');
        return of(name ? this.filter(name) : this.options.slice())
            .pipe(
                delay(2000),
                tap(() => this.states.deactive('loading'))
            );
    }

    protected filter(name: string): User[] {
        const filterValue = name.toLowerCase();
        return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
}
