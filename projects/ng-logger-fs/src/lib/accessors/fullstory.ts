import {FactoryProvider, InjectionToken} from '@angular/core';

declare const window: any;

export enum FSLogLevel {
    Log = 'log',
    Info = 'info',
    Warn = 'warn',
    Debug = 'debug'
}

export interface FullStory {
    log(level: FSLogLevel, ...args: any): void;

    log(msg: any): void;

    setUserVars(userVars: any): void;

    identify(uid: string | number, userVars?: any): void;

    getCurrentSession(): string;

    shutdown(): void;

    restart(): void;

    userConsents(userConsents: boolean): void;
}

export const FULLSTORY: InjectionToken<FullStory> = new InjectionToken<FullStory>('fullstory_instance');

export function getFS(): FullStory {
    return (typeof window !== 'undefined') ? window.FS : null;
}

export const FullstoryProvider: FactoryProvider = {provide: FULLSTORY, useFactory: getFS};
