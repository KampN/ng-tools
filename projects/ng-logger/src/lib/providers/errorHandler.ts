/* istanbul ignore next */
import { ErrorHandler, Injectable, inject } from '@angular/core';
import {LoggerService} from './logger';

@Injectable()
export class CustomErrorHandler extends ErrorHandler {
    protected logger = inject(LoggerService);


    handleError(e: Error) {
        this.logger.exception(e);
    }
}