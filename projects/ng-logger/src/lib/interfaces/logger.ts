export interface Logger {

    exception(e: any, data?: any);

    error(data: any, msg?: string);

    error(msg: string, data?: any);

    warn(data: any, msg?: string);

    warn(msg: string, data?: any);

    info(data: any, msg?: string);

    info(msg: string, data?: any);

    debug(data: any, msg?: string);

    debug(msg: string, data?: any);

}
