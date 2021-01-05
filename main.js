let http = require("http");
let fs = require("fs");
let url = require("url");
let qs = require("querystring");

let templateHTML = (title, list, body, control) => {
  return `
<!doctype html>
  <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
  <body>
  <h1><a href="/">WEB</a></h1>
  ${list}
  ${control}
  ${body}
</body>
</html>
`;
};

let templateList = (filelist) => {
  let list = `<ol>`;

  for (let file of filelist) {
    list += `<li><a href="/?id=${file}">${file}</a></li>`;
  }
  list += `</ol>`;
  return list;
};

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

        let list = templateList(filelist);

        let template = templateHTML(
          title,
          list,
          `<h2>${title}</h2> ${data}`,
          `<a href="/create">create </a>`
        );
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("./data", (err, filelist) => {
        let list = templateList(filelist);

        fs.readFile(`data/${queryData.id}`, "utf8", (err, data) => {
          let title = queryData.id;
          let template = templateHTML(
            title,
            list,
            `<h2>${title}</h2> ${data}`,
            `<a href="/create">create </a> <p>  <a href="/update?id=${title}"> Update </a>`
          );
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", (err, filelist) => {
      let title = "WEB - CREATE";
      // let data = "Hello. Nodejs";

      let list = templateList(filelist);

      let template = templateHTML(
        title,
        list,
        `
        <form action="/create_process" method="post" >
          <p><input type="text" name="title" placeholder="Title"></p>
          <p><textarea name="description" placeholder="Description"></textarea></p>
          <p><input type="submit"></p>
          </form>
      `,
        ""
      );
      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === "/create_process") {
    let body = "";
    request.on("data", (data) => {
      body += data;
    });
    request.on("end", () => {
      let post = qs.parse(body);
      let title = post.title;
      let description = post.description;

      fs.writeFile(`data/${title}`, description, (err) => {
        if (err) throw err;

        response.writeHead(302, { location: `/?id=${title}` });
        response.end();
      });
    });
  } else if (pathname === "/update") {
    fs.readdir("./data", (err, filelist) => {
      let list = templateList(filelist);

      fs.readFile(`data/${queryData.id}`, "utf8", (err, data) => {
        let title = queryData.id;
        let template = templateHTML(
          title,
          list,
          `
          <form action="/update_process" method="post" >
          <input type="hidden" name="id" value=${title}>
          <p><input type="text" name="title" placeholder="Title" value=${title}></p>
          <p><textarea name="description" placeholder="Description">${data}</textarea></p>
          <p><input type="submit"></p>
          </form>
          `,
          `<a href="/create">create </a> <p>  <a href="/update?id=${title}"> Update </a>`
        );
        response.writeHead(200);
        response.end(template);
      });
    });
  } else if (pathname === "/update_process") {
    let body = "";
    request.on("data", (data) => {
      body += data;
    });
    request.on("end", () => {
      let post = qs.parse(body);
      let id = post.id;
      let title = post.title;
      let description = post.description;

      fs.rename(`data/${id}`, `data/${title}`, (err) => {
        if (err) throw err;

        fs.writeFile(`data/${title}`, description, (err) => {
          if (err) throw err;

          response.writeHead(302, { location: `/?id=${title}` });
          response.end();
        });
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
