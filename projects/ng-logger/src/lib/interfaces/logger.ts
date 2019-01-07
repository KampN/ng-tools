export interface Logger {

    exception(e: Error);

    error(msg: string, data?: any);

    warn(msg: string, data?: any);

    info(msg: string, data?: any);

    debug(msg: string, data?: any);

}
