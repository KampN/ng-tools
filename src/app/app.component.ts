import {Component} from '@angular/core';
import {LoggerService} from 'ng-logger';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'ng-tools';

    constructor(logger: LoggerService) {
        logger.info('hello world', 'hihiii');
    }

}
