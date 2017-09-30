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
        logger.debug("targetEndPoint="+targetEndPoint);

        res.writeHead(200);
        // Execute / middlewares
        if(this.mapping["/"] !== undefined) {

            let functionList : IHandler[] = this.mapping["/"];

            let i : number = 0;
            let max_i : number = functionList.length;

            let next = () => {
                i++;
                let nextFunction : IHandler;
                if(i >= max_i) {
                    nextFunction = function() { return; };                    
                } else {
                    nextFunction = functionList[i];                    
                }

                nextFunction(req, res, next);
                
            }

            functionList[i](req, res, next);

            /*for(let i = 0; i < functionList.length; i++) {

                logger.debug("i="+i)
                let currentMiddleware : IHandler = functionList[i];
                
                let next : Function;
                if(i<functionList.length-1) {
                    logger.debug("1")
                    next = functionList[i+1];
                } else {
                    logger.debug("2")
                    next = function() { 
                        console.log("empty function")
                    };
                }
                
                logger.debug("req="+req);
                logger.debug("res="+res);
                logger.debug("next="+next)
                currentMiddleware(req, res, next);
                logger.debug("");
            }*/

        }
        
        // Execute the specific middlewares

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
    (req : http.IncomingMessage, res : http.ServerResponse, next : Function) : void;
}

export interface IServer {
    use(endPoint  : string, handler : IHandler) : void
    use(handler : IHandler) : void
    listen(port : number, callback : Function) : void
    logMapping() : void
}