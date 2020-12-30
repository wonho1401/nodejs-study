let http = require("http");
let fs = require("fs");
let url = require("url");
const { template } = require("lodash");

let app = http.createServer(function (request, response) {
  let _url = request.url;
  let queryData = url.parse(_url, true).query;
  let pathname = url.parse(_url, true).pathname;
  let title = queryData.id;

  if (pathname === "/") {
    if (title === undefined) {
      fs.readdir("./data", (err, filelist) => {
        let title = "Welcome";
        let data = "Hello. Nodejs";
        let list = `<ol>`;
        for (let file of filelist) {
          list += `<li><a href="/?id=${file}">${file}</a></li>`;
        }
        list += `</ol>`;

        let template = `
<!doctype html>
  <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
  <body>
  <h1><a href="/">WEB</a></h1>
  ${list}
  <h2>${title}</h2>
  <p>${data}</p>
</body>
</html>
`;
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("./data", (err, filelist) => {
        let title = "Welcome";
        let data = "Hello. Nodejs";
        let list = `<ol>`;
        for (let file of filelist) {
          list += `<li><a href="/?id=${file}">${file}</a></li>`;
        }
        list += `</ol>`;
        fs.readFile(`data/${title}`, "utf8", (err, data) => {
          let template = `
<!doctype html>
  <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
  <body>
  <h1><a href="/">WEB</a></h1>
  ${list}
  <h2>${title}</h2>
  <p>${data}</p>
</body>
</html>
`;
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
