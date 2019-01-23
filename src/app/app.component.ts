import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, ElementRef, EmbeddedViewRef, Input,
    IterableChangeRecord, IterableDiffer, IterableDiffers, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import {LoggerService} from '@kamp-n/ng-logger';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as Packery from 'packery';

@Directive({selector: '[gridBlockOutlet]'})
export class GridBlockOutlet {
    constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) { }
}

@Directive({
    selector: '[gridBlockDef]',
})
export class GridBlockDefDirective {
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
export class GridBlockComponnt {
}

interface RenderBlock {
    data: any;
    dataIndex: number;
    def: GridBlockDefDirective;
}

export type RenderBlockCache = WeakMap<GridBlockDefDirective, RenderBlock>;
export type Percent = number;

@Component({
    selector: 'grid-layout, [grid-layout]',
    styles: [`
		grid-layout {
			display: block
		}
    `],
    template: `
		<ng-container gridBlockOutlet></ng-container>
    `,
    //providers: [{provide: GridBlockDef, useExisting: GridLayoutComponent}],
    exportAs: 'gridLayout',
    host: {
        'class': 'grid-layout',
        'role': 'grid',
    },
})
export class GridLayoutComponent implements OnInit {

    @Input() scheme: any[];
    @ViewChild(GridBlockOutlet) blockOutlet: GridBlockOutlet;
    @ContentChild(GridBlockDefDirective) gridBlockDef: GridBlockDefDirective;

    protected cachedRenderBlocksMap = new Map<any, RenderBlockCache>();
    protected data: any[];
    protected renderBlocks: RenderBlock[];
    protected dataDiffer: IterableDiffer<RenderBlock>;
    protected packery;
    protected colUnit: Percent;

    constructor(protected readonly differs: IterableDiffers, protected cdr: ChangeDetectorRef, protected el: ElementRef) {
        this.packery = new Packery(this.el.nativeElement, {
            percentPosition: true,
            shiftPercentResize: true,
        });
    }

    ngOnInit(): void {
        this.dataDiffer = this.differs.find([]).create((_: number, data: RenderBlock) => data);
    }

    //public refreshItemPosLayout() {
    //    let lastRectY = 0, currentY = 0;
    //    this.packery.getItemElements()
    //        .forEach((el: HTMLElement) => {
    //            const item = this.packery.getItem(el);
    //            if (lastRectY !== item.rect.y) {
    //                lastRectY = item.rect.y;
    //                currentY++;
    //            }
    //            let x = Math.round(item.rect.x / this.packery.packer.width / (this.colUnit / 100));
    //            let y = currentY;
    //
    //            console.log(item, x, y);
    //        });
    //}

    public refreshLayout() {
        this.calculateUnitSize();

        const outlet = this.blockOutlet;
        const rItems: { ctx: any, el: HTMLElement }[] = [];
        for (let i = 0; i < outlet.viewContainer.length; i++) {
            const viewRef = outlet.viewContainer.get(i) as EmbeddedViewRef<any>;
            rItems.push({el: viewRef.rootNodes[0], ctx: viewRef.context});
        }

        this.packery.items = rItems
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
                console.log(ctx.$implicit, item.rect);
                return item;
            })
            .filter((item) => !!item);
        this.packery.shiftLayout();
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
                console.log('insert', record.item, currentIndex);
                this.insertRow(record.item, currentIndex);
            } else if (currentIndex == null) {
                console.log('remove', prevIndex);
                viewContainer.remove(prevIndex);
            } else {
                console.log('move', prevIndex, currentIndex);
                const view = viewContainer.get(prevIndex);
                viewContainer.move(view, currentIndex);
            }
        });

        this.refreshLayout();
    }

    protected calculateUnitSize() {
        const cols = 4;
        const value = 100 / cols;
        // truncate at 2 digits
        this.colUnit = Math.floor(100 * value) / 100;
    }

    protected renderRow(outlet, def, renderIndex, context) {
        const view: EmbeddedViewRef<any> = outlet.viewContainer.createEmbeddedView(def.template, context, renderIndex);
        this.packery.appended(view.rootNodes[0]);
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
}

export const toDeclare = [GridBlockDefDirective, GridLayoutComponent, GridBlockOutlet, GridBlockComponnt];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    id = 0;
    scheme: any = [];
    form: FormGroup;
    @ViewChild(GridLayoutComponent) gridLayout: GridLayoutComponent;

    constructor(logger: LoggerService, protected fb: FormBuilder) {
        console.log(this);
    }

    pushItemToScheme() {
        this.scheme = [...this.scheme, this.form.value];
        this.gridLayout.render(this.scheme);

        this.form.reset({
            id: ++this.id, x: 0, y: 0, w: 1, h: 1
        });

    }

    ngOnInit(): void {

        this.form = this.fb.group({
            id: [++this.id],
            x: this.fb.control(0),
            y: this.fb.control(0),
            w: this.fb.control(1),
            h: this.fb.control(1),
        });

        //const grid = this.grid.nativeElement;
        //const pckry = new Packery(grid, {
        //    itemSelector: '.grid-item',
        //    percentPosition: true
        //});

        //pckry.layout();
    }

}
