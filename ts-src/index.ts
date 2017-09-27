// LIBRARIES
import * as http from "http";

import * as winston from 'winston';
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({ colorize: true })
  ]
});
logger.level = 'debug';

// EXPOSED FUNCTIONS
export function createServer() : IServer {
    return new Server;
}

// CLASSES
class Server implements IServer {

    // Private variables
    private mapping : IMapping = {};
    private server : http.Server;
    private requestHandler = (req : http.IncomingMessage, res : http.ServerResponse) => {
        
        const targetEndPoint : string = req.url as string;

        // Execute / middlewares
        if(this.mapping["/"] !== undefined) {

            let functionList : IHandler[] = this.mapping["/"];

            for(let i = 0; i < functionList.length; i++) {
                let currentMiddleware : IHandler = functionList[i];
                currentMiddleware(req, res, next);
            }

        }
        

        // Execute the specific middlewares

        /*
        for(let currentEndPoint in this.mapping) {
            logger.debug(currentEndPoint);
        }
        */

        res.writeHead(200);
        res.end("HELLO");

    };

    // Public functions
    constructor() {
        this.server = http.createServer(this.requestHandler);
    }

    public use(endPoint  : string, handler : IHandler) : void
    public use(handler : IHandler) : void
    public use(a1 : string | IHandler, a2 ? : IHandler) : void {

        // Local variables
        let endPoint : string;
        let handler : IHandler;

        // Type checking
        if ( typeof a2 == "undefined" ) {
            endPoint = "/"
            handler = a1 as IHandler;
        } else {
            endPoint = a1 as string;
            handler = a2 as IHandler;
        }

        // Check if the end point exists in the mapping. If not, create it
        if(this.mapping[endPoint] === undefined) {
            this.mapping[endPoint] = [];
        }

        // Associate the end point with the handler
        this.mapping[endPoint].push(handler);

    }

    public listen(port : number, callback : Function) : void {
        this.server.listen(port, callback);
    }

    public logMapping() {
        console.log( JSON.stringify(this.mapping, null, 2) );
    }

}

/*class Response {

    // Private variables
    private response : http.ServerResponse;

    // Public functions
    constructor(response : http.ServerResponse) {
        this.response = response;
    }

    public write(s : string) : void {
        this.response.write
    }
}*/

// INTERFACES
export interface IMapping
{
    [key : string] : IHandler[];
}

export interface IHandler {
    (req : object, res : object, next : object) : void;
}

export interface IServer {
    use(endPoint  : string, handler : IHandler) : void
    use(handler : IHandler) : void
    listen(port : number, callback : Function) : void
    logMapping() : void
}