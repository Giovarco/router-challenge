"use strict";
exports.__esModule = true;
function createServer() {
    return new Server;
}
exports.createServer = createServer;
var Server = (function () {
    function Server() {
        this.mapping = {};
    }
    Server.prototype.use = function (endPoint, handler) {
        if (endPoint === void 0) { endPoint = ""; }
        if (this.mapping[endPoint] === undefined) {
            this.mapping[endPoint] = (_a = {},
                _a[endPoint] = [handler],
                _a);
        }
        else {
        }
        var _a;
    };
    return Server;
}());
