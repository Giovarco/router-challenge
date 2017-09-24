// LIBRARIES
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
class Server {

    // Private variables
    mapping : IMapping = {}

    // Public functions
    public use(endPoint = "/*", handler : IHandler) : void {

        // Check if the end point exists in the mapping. If not, create it
        if(this.mapping[endPoint] === undefined) {
            this.mapping[endPoint] = [];
        }

        // Associate the end point with the handler
        this.mapping[endPoint].push(handler);

    }

    public logMapping() {
        console.log( JSON.stringify(this.mapping, null, 2) );
    }

}

// INTERFACES
interface IMapping
{
    [key : string] : IHandler[];
}

interface IHandler {
    (req : object, res : object, next : object) : void;
}

export interface IServer {
    logMapping() : void
}