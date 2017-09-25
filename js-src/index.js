"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const winston = require("winston");
const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ colorize: true })
    ]
});
logger.level = 'debug';
function createServer() {
    return new Server;
}
exports.createServer = createServer;
class Server {
    constructor() {
        this.mapping = {};
        this.server = http.createServer(function (req, res) {
            res.writeHead(200);
            res.end('Hello, World!\n');
        });
    }
    use(a1, a2) {
        let handler;
        let endPoint;
        if (typeof a2 == "undefined") {
            endPoint = "/";
            handler = a1;
        }
        else {
            endPoint = a1;
            handler = a2;
        }
        if (this.mapping[endPoint] === undefined) {
            this.mapping[endPoint] = [];
        }
        this.mapping[endPoint].push(handler);
    }
    listen(port, callback) {
        this.server.listen(port, callback);
    }
    logMapping() {
        console.log(JSON.stringify(this.mapping, null, 2));
    }
}
