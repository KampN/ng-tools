import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface User {
    name: string;
}

@Component({
    selector: 'autocomplete-sample',
    templateUrl: './template.html',
    styleUrls: ['./style.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteSampleComponent implements OnInit {
    control = new FormControl();
    options: User[] = [
        {name: 'Mary'},
        {name: 'Shelley'},
        {name: 'Igor'}
    ];
    filteredOptions: Observable<User[]>;

    constructor() { }

    ngOnInit() {
        this.filteredOptions = this.control.valueChanges
            .pipe(
                startWith<string | User>(''),
                map(value => typeof value === 'string' ? value : value.name),
                map(name => name ? this._filter(name) : this.options.slice())
            );
    }

    displayFn(user?: User): string | undefined {
        return user ? user.name : undefined;
    }

    private _filter(name: string): User[] {
        const filterValue = name.toLowerCase();

        return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
}
