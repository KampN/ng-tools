import {
    AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, ElementRef,
    EmbeddedViewRef, Input, IterableChangeRecord, IterableDiffer, IterableDiffers, OnInit, TemplateRef, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import * as Packery from 'packery';
import * as Draggabilly from 'draggabilly';
import {GridsterConfig, GridsterItem} from 'angular-gridster2';

@Directive({selector: '[gridBlockOutlet]'})
export class GridBlockOutlet {
    constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) { }
}

@Directive({
    selector: '[gridBlockDef]',
})
export class GridBlockDefDirective {
    @Input('gridBlockDefMovable') movable: boolean = false;

    constructor(public template: TemplateRef<any>) { }

}

@Component({
    selector: 'grid-block, [grid-block]',
    template: `
		<div>Content :</div>
		<ng-content></ng-content>
    `,
    styles: [`
		grid-block, [grid-block] {
			display: block;
			border: 1px solid red;
		}
    `],
    host: {
        'class': 'grid-block',
        'role': 'row',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    exportAs: 'gridBlock',
})
export class GridBlockComponent {
}

interface RenderBlock {
    data: any;
    dataIndex: number;
    def: GridBlockDefDirective;
}

export type RenderBlockCache = WeakMap<GridBlockDefDirective, RenderBlock>;
export type Percent = number;
export const GridLayoutBlockClass = '--grid-layout-block';

@Component({
    selector: 'grid-layout, [grid-layout]',
    styles: [`
		grid-layout, [grid-layout] {
			display: block;
		}

		grid-layout > .grid-unit, [grid-layout] > .grid-unit {
			pointer-events: none;
		}
    `],
    template: `
		<ng-container gridBlockOutlet></ng-container>
		<div class="grid-unit" #gridUnit [style.width.%]="colUnit"></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    exportAs: 'gridLayout',
    host: {
        'class': 'grid-layout',
        'role': 'grid',
    },
})
export class GridLayoutComponent implements OnInit, AfterViewChecked {

    @Input() scheme: any[];
    @ViewChild(GridBlockOutlet) blockOutlet: GridBlockOutlet;
    @ViewChild('gridUnit', {read: ElementRef}) gridUnit: ElementRef;
    @ContentChild(GridBlockDefDirective) gridBlockDef: GridBlockDefDirective;

    protected cachedRenderBlocksMap = new Map<any, RenderBlockCache>();
    protected data: any[];
    protected renderBlocks: RenderBlock[];
    protected dataDiffer: IterableDiffer<RenderBlock>;
    protected packery;
    protected colUnit: Percent;
    protected shiftLayoutRequested = false;
    protected positionRefreshRequested = false;

    constructor(protected readonly differs: IterableDiffers, protected cdr: ChangeDetectorRef, protected el: ElementRef) {
    }

    ngAfterViewChecked(): void {
        if (this.shiftLayoutRequested) {
            console.log('[shift layout]');
            this.packery.shiftLayout();
            this.shiftLayoutRequested = false;
        }
        if (this.positionRefreshRequested) {
            console.log('[refresh position]');
            setTimeout(() => {
                this.refreshBlockPositions();
                this.positionRefreshRequested = false;
            });
        }
    }

    ngOnInit(): void {
        this.dataDiffer = this.differs.find([]).create((_: number, data: RenderBlock) => data);
        this.packery = new Packery(this.el.nativeElement, {
            percentPosition: true,
            itemSelector: `.${GridLayoutBlockClass}`,
            shiftPercentResize: true,
            columnWidth: this.gridUnit.nativeElement
        });

        //this.packery.on('dragItemPositioned', () => this.markForPositionRefresh());
    }

    public refreshBlockPositions() {
        let lastRectY = 0, currentY = 0;
        const outlet = this.blockOutlet;
        const elementMap = this.getRenderedElementMap(outlet);
        console.log(this.packery);
        this.packery.items
            .forEach((item) => {
                const ctx = elementMap.get(item.element);
                //console.log(lastRectY, currentY, item.rect);
                if (lastRectY !== item.rect.y) {
                    lastRectY = item.rect.y;
                    currentY = item.rect.y === 0 ? 0 : currentY + 1;
                }

                const x = (item.rect.x / this.packery.packer.width / (this.colUnit / 100)) | 0;
                const y = currentY;
                ctx.$implicit.x = x;
                ctx.$implicit.y = y;
            });
        this.cdr.markForCheck();
    }

    public markForShiftLayout() {
        this.shiftLayoutRequested = true;
    }

    public markForPositionRefresh() {
        this.positionRefreshRequested = true;
    }

    public refreshLayout() {
        this.calculateUnitSize();

        const outlet = this.blockOutlet;
        this.packery.items = this.getRenderedElements(outlet)
            .sort((a, b) => {
                if (a.ctx.getPosScore() > b.ctx.getPosScore()) return 1;
                if (a.ctx.getPosScore() < b.ctx.getPosScore()) return -1;
                if (a.ctx.createdAt < b.ctx.createdAt) return 1;
                if (a.ctx.createdAt > b.ctx.createdAt) return -1;
                return 0;
            }).map(({el, ctx}) => {
                const item = this.packery.getItem(el);
                if (!item) return;
                item.rect.x = (this.colUnit / 100 * ctx.$implicit.x) * this.packery.packer.width;
                //console.log(ctx.$implicit, item.rect);
                return item;
            })
            .filter((item) => !!item);

        this.markForPositionRefresh();
        this.markForShiftLayout();
    }

    getRenderBlockForData(data: any, dataIndex: number, cache?: RenderBlockCache): RenderBlock {
        const def = this.gridBlockDef;
        const cachedRenderBlock = cache && cache.has(def) ? cache.get(def) : null;
        if (cachedRenderBlock) {
            cachedRenderBlock.dataIndex = dataIndex;
            return cachedRenderBlock;
        } else {
            return {data, def, dataIndex};
        }
    }

    getToProcessRenderBlocks(): RenderBlock[] {
        const renderBlocks: RenderBlock[] = [];

        const oldCachedRenderBlocksMap = this.cachedRenderBlocksMap;
        this.cachedRenderBlocksMap = new Map();

        for (let i = 0; i < this.data.length; i++) {
            const data = this.data[i];

            if (!this.cachedRenderBlocksMap.has(data)) this.cachedRenderBlocksMap.set(data, new WeakMap());
            const renderBlock = this.getRenderBlockForData(data, i, oldCachedRenderBlocksMap.get(data));

            this.cachedRenderBlocksMap.get(renderBlock.data)
                .set(renderBlock.def, renderBlock);

            renderBlocks.push(renderBlock);
        }

        return renderBlocks;
    }

    render(scheme: any[] = this.scheme) {
        this.data = scheme;

        this.renderBlocks = this.getToProcessRenderBlocks();
        const changes = this.dataDiffer.diff(this.renderBlocks);

        const viewContainer = this.blockOutlet.viewContainer;

        if (!changes) { return; }
        changes.forEachOperation((record: IterableChangeRecord<RenderBlock>, prevIndex: number, currentIndex: number) => {
            if (record.previousIndex == null) {
                //console.log('insert', record.item, currentIndex);
                this.insertRow(record.item, currentIndex);
            } else if (currentIndex == null) {
                //console.log('remove', prevIndex);
                viewContainer.remove(prevIndex);
            } else {
                //console.log('move', prevIndex, currentIndex);
                const view = viewContainer.get(prevIndex);
                viewContainer.move(view, currentIndex);
            }
        });

        this.refreshLayout();
    }

    protected getRenderedElements(outlet): { ctx: any, el: HTMLElement }[] {

        const elements = [];
        for (let i = 0; i < outlet.viewContainer.length; i++) {
            const viewRef = outlet.viewContainer.get(i) as EmbeddedViewRef<any>;
            elements.push({el: viewRef.rootNodes[0], ctx: viewRef.context});
        }
        return elements;
    }

    protected getRenderedElementMap(outlet): Map<HTMLElement, any> {
        const map = new Map();
        for (let i = 0; i < outlet.viewContainer.length; i++) {
            const viewRef = outlet.viewContainer.get(i) as EmbeddedViewRef<any>;
            map.set(viewRef.rootNodes[0], viewRef.context);
        }
        return map;
    }

    protected calculateUnitSize() {
        const cols = 4;
        const value = 100 / cols;
        // truncate at 2 digits
        this.colUnit = Math.floor(100 * value) / 100;
    }

    protected renderRow(outlet, def, renderIndex, context) {
        const view: EmbeddedViewRef<any> = outlet.viewContainer.createEmbeddedView(def.template, context, renderIndex);
        const el = view.rootNodes[0];
        el.classList.add(GridLayoutBlockClass);
        this.packery.appended(el);
        const draggy = new Draggabilly(el);
        this.packery.bindDraggabillyEvents(draggy);
        this.cdr.markForCheck();
    }

    private insertRow(renderBlock: RenderBlock, renderIndex: number) {
        const def = renderBlock.def;
        const context = {
            $implicit: renderBlock.data,
            createdAt: new Date().getTime(),
            getPosScore() {
                return this.$implicit.y * 4 + this.$implicit.x;
            }
        };
        this.renderRow(this.blockOutlet, def, renderIndex, context);
    }

    private overridePackerWidth() {
        this.packery.packer.width = this.el.nativeElement.getBoundingClientRect().width;
        console.log(this.packery.packer.width);
    }
}
@Component({selector: 'draw-counter', template: '{{cnt}}'})
export class DrawCounter {
    static _cnt = 0;
    cnt = DrawCounter._cnt++;
}

export const toDeclare = [DrawCounter, GridBlockDefDirective, GridLayoutComponent, GridBlockOutlet, GridBlockComponent];


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    //id = 0;
    //scheme: any = [
    //    {
    //        'id': 1,
    //        'x': 0,
    //        'y': 1,
    //        'w': 1,
    //        'h': 1
    //    },
    //    {
    //        'id': 2,
    //        'x': 0,
    //        'y': 0,
    //        'w': 1,
    //        'h': 1
    //    },
    //    {
    //        'id': 3,
    //        'x': 1,
    //        'y': 0,
    //        'w': 1,
    //        'h': 1
    //    },
    //    {
    //        'id': 4,
    //        'x': 1,
    //        'y': 1,
    //        'w': 2,
    //        'h': 1
    //    },
    //    {
    //        'id': 5,
    //        'x': 2,
    //        'y': 2,
    //        'w': 1,
    //        'h': 1
    //    }
    //];
    //form: FormGroup;
    //@ViewChild(GridLayoutComponent) gridLayout: GridLayoutComponent;
    //
    //constructor(logger: LoggerService, protected fb: FormBuilder) {
    //    console.log(this);
    //}
    //
    //pushItemToScheme() {
    //    this.scheme = [...this.scheme, this.form.value];
    //    this.gridLayout.render(this.scheme);
    //
    //    this.form.reset({
    //        id: ++this.id, x: 0, y: 0, w: 1, h: 1
    //    });
    //
    //}
    //

    options: GridsterConfig;
    dashboard: Array<GridsterItem>;

    static itemChange(item, itemComponent) {
        console.info('itemChanged', item, itemComponent);
    }

    static itemResize(item, itemComponent) {
        console.info('itemResized', item, itemComponent);
    }

    ngOnInit() {
        this.options = {
            gridType: 'scrollVertical',

            minCols: 10,
            maxCols: 10,

            swap: true,

            draggable: {enabled: true},

            resizable: {enabled: true},
            pushItems: true,

            itemChangeCallback: AppComponent.itemChange,
            itemResizeCallback: AppComponent.itemResize,
        };

        this.dashboard = [
            {cols: 2, rows: 1, y: 0, x: 0},
            {cols: 2, rows: 2, y: 0, x: 2}
        ];
    }

    changedOptions() {
        this.options.api.optionsChanged();
    }

    removeItem(item) {
        this.dashboard.splice(this.dashboard.indexOf(item), 1);
    }

    addItem() {
        this.dashboard.push({y: 0, x: 0} as any);
    }

    //ngOnInit(): void {
    //
    //    this.form = this.fb.group({
    //        id: [++this.id],
    //        x: this.fb.control(0),
    //        y: this.fb.control(0),
    //        w: this.fb.control(1),
    //        h: this.fb.control(1),
    //    });
    //
    //}

    ngAfterViewInit(): void {
        //    this.gridLayout.render(this.scheme);
    }

}
