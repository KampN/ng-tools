import {AfterViewInit, Component, OnInit} from '@angular/core';
import {GridsterConfig, GridsterItem} from 'angular-gridster2';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

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

    ngAfterViewInit(): void {
    }

}
