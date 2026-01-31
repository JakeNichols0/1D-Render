const { createServer } = require('node:http');
const url = require('node:url'); //URL information

const hostname = '127.0.0.1';
const port = 3000;

function start(route, handle) {
  const server = createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(handle, pathname, req, res);
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

exports.start = start;