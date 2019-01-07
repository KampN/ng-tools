export enum LogLevel {
    Error = 100, Warning = 70, Info = 30, Debug = 10
}

export interface LogMessage {
    message: string;
    data: any;
    level: LogLevel;
}