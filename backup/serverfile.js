http = require('http');
url = require('url');
fs = require('fs');

http.createServer(function(req, res){

  var q = url.parse(req.url, true);
  console.log(q);
  var filename = "." + q.pathname;
  console.log(filename);

  fs.readFile(filename, function(err, data){
    //if file not found, 404
    if (err){
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write('404 Error. Sorry, page not found.');
      return res.end();
    }
    //else, display page
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write(data);

    return res.end();
  });
}).listen(8080);
console.log('Node server started on port 8080');
