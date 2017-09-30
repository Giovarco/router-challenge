/// <reference types="node" />
import * as http from "http";
export declare function createServer(): IServer;
export interface IMapping {
    [key: string]: IHandler[];
}
export interface IHandler {
    (req: http.IncomingMessage, res: http.ServerResponse, next: Function): void;
}
export interface IServer {
    use(endPoint: string, handler: IHandler): void;
    use(handler: IHandler): void;
    listen(port: number, callback: Function): void;
    logMapping(): void;
}
