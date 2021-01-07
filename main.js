const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app porting on http://localhost:${port}`);
});
// let http = require("http");
// let fs = require("fs");
// let url = require("url");
// let qs = require("querystring");
// let path = require("path");
// let sanitizeHtml = require("sanitize-html");
// let template = require("./lib/template");

// let app = http.createServer(function (request, response) {
//   let _url = request.url;
//   let queryData = url.parse(_url, true).query;
//   let pathname = url.parse(_url, true).pathname;
//   let title = queryData.id;

//   if (pathname === "/") {
//     if (title === undefined) {
//       fs.readdir("./data", (err, filelist) => {
//         let title = "Welcome";
//         let data = "Hello. Nodejs";

//         let list = template.list(filelist);

//         let html = template.html(
//           title,
//           list,
//           `<h2>${title}</h2> ${data}`,
//           `<a href="/create">create </a>`
//         );
//         response.writeHead(200);
//         response.end(html);
//       });
//     } else {
//       fs.readdir("./data", (err, filelist) => {
//         let list = template.list(filelist);
//         let filteredId = path.parse(queryData.id).base;
//         fs.readFile(`data/${filteredId}`, "utf8", (err, data) => {
//           let title = queryData.id;
//           let sanitizedTitle = sanitizeHtml(title);
//           let sanitizedData = sanitizeHtml(data);
//           let html = template.html(
//             title,
//             list,
//             `<h2>${sanitizedTitle}</h2> ${sanitizedData}`,
//             `<a href="/create">create </a> <p>
//              <a href="/update?id=${sanitizedTitle}"> Update </a> <p>
//              <form action="/delete_process" method="post" onsubmit>
//               <input type="hidden" name="id" value=${sanitizedTitle}>
//               <input type="submit" value="Delete">
//              </form>`
//           );
//           response.writeHead(200);
//           response.end(html);
//         });
//       });
//     }
//   } else if (pathname === "/create") {
//     fs.readdir("./data", (err, filelist) => {
//       let title = "WEB - CREATE";
//       // let data = "Hello. Nodejs";

//       let list = template.list(filelist);

//       let html = template.html(
//         title,
//         list,
//         `
//         <form action="/create_process" method="post" >
//           <p><input type="text" name="title" placeholder="Title"></p>
//           <p><textarea name="description" placeholder="Description"></textarea></p>
//           <p><input type="submit"></p>
//           </form>
//       `,
//         ""
//       );
//       response.writeHead(200);
//       response.end(html);
//     });
//   } else if (pathname === "/create_process") {
//     let body = "";
//     request.on("data", (data) => {
//       body += data;
//     });
//     request.on("end", () => {
//       let post = qs.parse(body);
//       let title = post.title;
//       let description = post.description;

//       fs.writeFile(`data/${title}`, description, (err) => {
//         if (err) throw err;

//         response.writeHead(302, { location: `/?id=${title}` });
//         response.end();
//       });
//     });
//   } else if (pathname === "/update") {
//     fs.readdir("./data", (err, filelist) => {
//       let list = template.list(filelist);
//       let filteredId = path.parse(queryData.id).base;

//       fs.readFile(`data/${filteredId}`, "utf8", (err, data) => {
//         let title = queryData.id;
//         let html = template.html(
//           title,
//           list,
//           `
//           <form action="/update_process" method="post" >
//           <input type="hidden" name="id" value=${title}>
//           <p><input type="text" name="title" placeholder="Title" value=${title}></p>
//           <p><textarea name="description" placeholder="Description">${data}</textarea></p>
//           <p><input type="submit"></p>
//           </form>
//           `,
//           `<a href="/create">create </a> <p>
//            <a href="/update?id=${title}"> Update </a>`
//         );
//         response.writeHead(200);
//         response.end(html);
//       });
//     });
//   } else if (pathname === "/update_process") {
//     let body = "";
//     request.on("data", (data) => {
//       body += data;
//     });

//     request.on("end", () => {
//       let post = qs.parse(body);
//       let id = post.id;
//       let title = post.title;
//       let description = post.description;

//       fs.rename(`data/${id}`, `data/${title}`, (err) => {
//         if (err) throw err;

//         fs.writeFile(`data/${title}`, description, (err) => {
//           if (err) throw err;

//           response.writeHead(302, { location: `/?id=${title}` });
//           response.end();
//         });
//       });
//     });
//   } else if (pathname === "/delete_process") {
//     let body = "";
//     request.on("data", (data) => {
//       body += data;
//     });
//     request.on("end", () => {
//       let post = qs.parse(body);
//       let id = post.id;
//       let filteredId = path.parse(id).base;

//       fs.unlink(`data/${filteredId}`, (err) => {
//         if (err) {
//           console.log(err);
//         }

//         response.writeHead(302, { location: `/` });
//         response.end();
//       });
//     });
//   } else {
//     response.writeHead(404);
//     response.end("Not found");
//   }
// });
// app.listen(3000);
