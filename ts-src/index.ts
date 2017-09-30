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

        // Check which signature was used by type checking
        if ( typeof a2 == "undefined" ) {
            endPoint = "/"
            handler = a1 as IHandler;
        } else {
            endPoint = a1 as string;
            handler = a2 as IHandler;
        }

        // Push a new middleware to mapping
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
        
        // Get the middleware list
        const middlewareList : IMiddleware[] = this.mapping;

        // Check if there is at least one middleware
        if(middlewareList.length > 0) {

            // Declare indexes
            let i : number = -1; // Default value that gets i++ immediatly by next()
            let max_i : number = middlewareList.length;
    
            // Declare next function
            const next = () => {
                
                // Find the next function to execute
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
                
                // Execute the next useful function
                const nextFunction : IHandler = middlewareList[i].handler;                    
                nextFunction(req, res, next);

            }
    
            // Start executing the chain
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