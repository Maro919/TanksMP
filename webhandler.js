var express = require('express');
var expressApp = express();
var HTTPServer = require('http').Server(expressApp);
var WebSocketServer = require('websocket').server;

module.exports = {
    startServer: function(callback) {
        expressApp.get('/', function(req, res) {
            res.sendFile(__dirname + '/client/index.html');
        });
        expressApp.get('/mobile', function(req, res) {
            res.sendFile(__dirname + '/client/mobile/index.html');
        });
        expressApp.get('/play', function(req, res) {
            res.sendFile(__dirname + '/client/play/play.html');
        });
        expressApp.use('/client', express.static(__dirname + '/client'));
        
        var port = process.env.PORT || 8080;
        
        HTTPServer.listen(port, function() {
            console.log((new Date()) + ' Server is listening on port ' + port);
        });

        module.exports.server = new WebSocketServer({
            httpServer: HTTPServer,
            autoAcceptConnections: false
        });
        
        callback();
    },
}