/* istanbul ignore next */
import {ErrorHandler, Injectable} from '@angular/core';
import {LoggerService} from './logger';

@Injectable()
export class CustomErrorHandler extends ErrorHandler {

    constructor(protected logger: LoggerService) {
        super();
    }

    handleError(e: Error) {
        this.logger.exception(e);
    }
}