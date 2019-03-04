import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RxCleaner} from '@kamp-n/ng-common-tools';
import {MatTableDataSource} from '@angular/material';

@Component({
    selector: 'picker-select-sample',
    templateUrl: './template.html',
    styleUrls: ['./style.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerSampleComponent implements OnInit, OnDestroy {
    form: FormGroup;
    displayedColumns: string[] = ['selector', 'name'];
    dataSource = new MatTableDataSource([
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    ]);
    protected rc: RxCleaner = new RxCleaner();

    constructor(protected fb: FormBuilder, protected cdr: ChangeDetectorRef) {
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
