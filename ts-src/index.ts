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
    private mapping : Array<IMiddleware> = [];
    private server : http.Server;
    private  requestHandler = async (req : http.IncomingMessage, res : http.ServerResponse) => {
        
        // Get the target end point
        const targetEndPoint : string = req.url as string;
        // logger.debug("targetEndPoint="+targetEndPoint);

        // Write status code
        await res.writeHead(200);

        // Handle request
        await this.handleEndPoint(targetEndPoint, req, res);

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
        const middleware : IMiddleware = {
            "endPoint" : endPoint,
            "handler" : handler
        };

        this.mapping.push(middleware);

    }

    public listen(port : number, callback : Function) : void {
        this.server.listen(port, callback);
    }

    public logMapping() {
        console.log( JSON.stringify(this.mapping, null, 2) );
    }

    // Private functions
    private handleEndPoint(endPoint : string, req : http.IncomingMessage, res : http.ServerResponse) : void {
        
        const middlewareList : IMiddleware[] = this.mapping;

        if(middlewareList.length > 0) {

            let i : number = -1;
            let max_i : number = middlewareList.length;
    
            let next = () => {
                
                logger.debug("endPoint="+endPoint);

                let noMatch : boolean = true;
                do {
                    i++;

                    if(middlewareList[i] === undefined) {
                        return;
                    }

                    if( middlewareList[i].endPoint === "/" ||
                        middlewareList[i].endPoint === endPoint) {
                            noMatch = false;
                    }

                } while(noMatch);
                
                
                const nextFunction : IHandler = middlewareList[i].handler;                    
                nextFunction(req, res, next);

            }
    
            next();

        }

    }
}

// INTERFACES
export interface IMiddleware {
    endPoint : string,
    handler : IHandler
}

export interface IHandler {
    (req : http.IncomingMessage, res : http.ServerResponse, next : Function) : void;
}

export interface IServer {
    use(endPoint  : string, handler : IHandler) : void
    use(handler : IHandler) : void
    listen(port : number, callback : Function) : void
    logMapping() : void
}