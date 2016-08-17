var http = require('http');

var port = process.env.PORT || 8080;

var server = http.createServer(function(req, res) {
    
    var ipaddress = req.headers['x-forwarded-for'];
    
    var language = req.headers['accept-language']
            .split(',')[0];
            
    var software = req.headers['user-agent']
            .match(/\((.+?)\)/)[1];
    
    var result = {
            ipaddress: ipaddress,
            language: language,
            software: software
    };
    
    if (result) {
       res.writeHead(200, { 'Content-Type': 'application/json' });
       res.end(JSON.stringify(result));
    } else {
       res.writeHead(404);
       res.end();
    }
});

server.listen(port, function() {
    console.log('Listening on port ' + port);
});