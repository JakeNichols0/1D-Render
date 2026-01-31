const fs = require('node:fs'); //filesystem
const formidable = require('formidable'); //upload handling

function main(req, res) {
    fs.readFile('src/index.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
}

function upload(req, res) {
    if(req.method.toLowerCase() == 'post') {
        let form = new formidable.IncomingForm()
        form.parse(req, (err, fields, files) => {
            if(files.upload) {
                fs.renameSync(files.upload[0].filepath, "tmp/test.png");
            }
            res.writeHead(301, {Location: "/"});
            res.end();
        });
    }
}

function style(req, res) {
    fs.readFile('src/style.css', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(data);
        res.end();
    });
}

function script(req, res) {
    fs.readFile('src/script.js', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(data);
        res.end();
    });
}

function userImg(req, res) {
    res.writeHead(200, {"Content-Type": "image/png"});
    fs.createReadStream("tmp/test.png").pipe(res);
}

exports.main = main;
exports.upload = upload;
exports.style = style;
exports.script = script;
exports.userImg = userImg;