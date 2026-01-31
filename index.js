const server = require("./server");
const router = require("./router");
const requestHandlers = require("./requestHandlers");

let handle = {}
handle["/"] = requestHandlers.main;
handle["/upload"] = requestHandlers.upload;
//static
handle["/style.css"] = requestHandlers.style;
handle["/script.js"] = requestHandlers.script;
//images
handle["/img.png"] = requestHandlers.userImg;
console.log("Handles: ", handle);

server.start(router.route, handle);