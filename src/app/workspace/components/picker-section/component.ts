//import {
//    ChangeDetectionStrategy, Component, ContentChildren, Directive, Input, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild,
//    ViewContainerRef, ViewEncapsulation
//} from '@angular/core';
//import {BehaviorSubject, Observable} from 'rxjs';
//import {DataSource} from '@angular/cdk/table';
//import {CollectionViewer, isDataSource, ListRange} from '@angular/cdk/collections';
//import {RxCleaner} from '@kamp-n/ng-common-tools';
//
//export type PickerSectionDataSourceInput<T> = DataSource<T> | Observable<ReadonlyArray<T> | T[]> | ReadonlyArray<T> | T[];
//
//export enum PickerSectionSub {
//    RenderChange = 'render_change'
//}
//
//@Directive({
//    selector: '[pickerNodeOutlet]'
//})
//export class PickerNodeOutlet {
//    constructor(public viewContainer: ViewContainerRef) {}
//}
//
//@Directive({
//    selector: '[pickerNodeDef]'
//})
//export class PickerNodeDef<T> {
//    constructor(public template: TemplateRef<any>) {}
//}
//
//@Component({
//    selector: 'picker-node',
//    template: `
//		Hello world
//    `,
//    changeDetection: ChangeDetectionStrategy.OnPush,
//    encapsulation: ViewEncapsulation.None
//})
//export class PickerNodeComponent {
//
//}
//
//@Component({
//    selector: 'picker-section',
//    templateUrl: './template.html',
//    styleUrls: ['./style.scss'],
//    changeDetection: ChangeDetectionStrategy.OnPush,
//    encapsulation: ViewEncapsulation.None
//})
//export class PickerSectionComponent<T> implements CollectionViewer, OnInit, OnDestroy {
//
//    viewChange: BehaviorSubject<ListRange> = new BehaviorSubject<ListRange>({start: 0, end: Number.MAX_VALUE});
//    data: T[] = [];
//    @ViewChild(PickerNodeOutlet) nodeOutlet: PickerNodeOutlet;
//    @ContentChildren(PickerNodeDef) nodeDefs: QueryList<PickerNodeDef<T>>;
//
//    protected rc: RxCleaner = new RxCleaner();
//
//    constructor() { }
//
//    private _dataSource: PickerSectionDataSourceInput<T>;
//
//    @Input()
//    get dataSource(): PickerSectionDataSourceInput<T> { return this._dataSource; }
//
//    set dataSource(dataSource: PickerSectionDataSourceInput<T>) {
//        if (this._dataSource !== dataSource) this.switchDataSource(dataSource);
//    }
//
//    ngOnInit() { }
//
//    ngOnDestroy(): void {
//        this.disconnectDataSource();
//        this.rc.complete();
//    }
//
//    protected switchDataSource(dataSource: PickerSectionDataSourceInput<T>) {
//        this.data = [];
//        this.disconnectDataSource();
//        this.rc.unsubscribe(PickerSectionSub.RenderChange);
//        this._dataSource = dataSource;
//    }
//
//    protected disconnectDataSource() {
//        if (isDataSource(this.dataSource)) this.dataSource.disconnect(this);
//    }
//}
