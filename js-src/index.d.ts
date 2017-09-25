export declare function createServer(): IServer;
export interface IHandler {
    (req: object, res: object, next: object): void;
}
export interface IServer {
    use(endPoint: string, handler: IHandler): void;
    use(handler: IHandler): void;
    listen(port: number, callback: Function): void;
    logMapping(): void;
}
