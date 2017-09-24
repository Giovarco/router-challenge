// GLOBALS

// EXPOSED FUNCTIONS
export function createServer() : object {
    return new Server;
}

// CLASSES
class Server {

    // Private variables
    mapping : IMapping = {}

    // Public functions
    public use(endPoint = "", handler : IHandler) : void {

        // Check if the end point exists in the mapping
        if(this.mapping[endPoint] === undefined) {

            this.mapping[endPoint] = {
                [endPoint] : [handler]
            };

        } else {

        }
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