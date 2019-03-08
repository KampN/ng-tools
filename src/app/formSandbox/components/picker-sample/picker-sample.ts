import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RxCleaner} from '@kamp-n/ng-common-tools';
import {MatTableDataSource} from '@angular/material';
import {ExtractIdFn} from '@kamp-n/ng-common-form';

@Component({
    selector: 'picker-sample',
    templateUrl: './template.html',
    styleUrls: ['./style.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerSampleComponent implements OnInit, OnDestroy {
    form: FormGroup;
    displayedColumns: string[] = ['selector', 'name'];
    dataSource = new MatTableDataSource([
        {id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {id: 1, name: 'Hydrogen 2', weight: 1.0079, symbol: 'H'},
        {id: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {id: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {id: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {id: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {id: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {id: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {id: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    ]);
    protected rc: RxCleaner = new RxCleaner();

    constructor(protected fb: FormBuilder, protected cdr: ChangeDetectorRef) {
    }

    extractIdFn: ExtractIdFn = (v: any) => v.id;

    even(index: number, item: any) {
        return index % 2;
    }

    ngOnInit() {
        this.form = this.fb.group({
            search: this.fb.control(''),
            elements: this.fb.control({value: [], disabled: false}, [Validators.minLength(1)])
        });

        this.form.get('search').valueChanges.pipe(
            this.rc.takeUntil('destroy')
        ).subscribe((search: string) => {
            this.dataSource.filter = search;
        });
    }

    ngOnDestroy(): void {
        this.rc.complete();
    }

}
