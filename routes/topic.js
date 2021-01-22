const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const sanitizeHtml = require("sanitize-html");
const template = require("../lib/template");

router.get("/create", (req, res) => {
  let title = "WEB - CREATE";
  // let data = "Hello. Nodejs";

  let list = template.list(req.list);

  let html = template.html(
    title,
    list,
    `
        <form action="/topic/create_process" method="post" >
          <p><input type="text" name="title" placeholder="Title"></p>
          <p><textarea name="description" placeholder="Description"></textarea></p>
          <p><input type="submit"></p>
          </form>
      `,
    ""
  );
  res.send(html);
});

router.post("/create_process", (req, res) => {
  //body-parser 미들웨어 사용시.
  let post = req.body;
  let title = post.title;
  let description = post.description;

  fs.writeFile(`data/${title}`, description, (err) => {
    if (err) throw err;

    res.redirect(`/topic/${title}`);
  });
});

router.get("/update/:pageId", (req, res) => {
  let list = template.list(req.list);
  let filteredId = path.parse(req.params.pageId).base;

  fs.readFile(`data/${filteredId}`, "utf8", (err, data) => {
    let title = req.params.pageId;
    let html = template.html(
      title,
      list,
      `
          <form action="/topic/update_process" method="post" >
          <input type="hidden" name="id" value=${title}>
          <p><input type="text" name="title" placeholder="Title" value=${title}></p>
          <p><textarea name="description" placeholder="Description">${data}</textarea></p>
          <p><input type="submit"></p>
          </form>
          `,
      `<a href="/topic/create">create </a> <p>
           <a href="/topic/update/${title}"> Update </a>`
    );
    res.send(html);
  });
});

router.post("/update_process", (req, res) => {
  let post = req.body;
  let id = post.id;
  let title = post.title;
  let description = post.description;

  fs.rename(`data/${id}`, `data/${title}`, (err) => {
    if (err) throw err;

    fs.writeFile(`data/${title}`, description, (err) => {
      if (err) throw err;

      res.redirect(302, `/topic/${title}`);
      res.end();
    });
  });
});

router.post("/delete_process", (req, res) => {
  let post = req.body;
  let id = post.id;
  let filteredId = path.parse(id).base;

  fs.unlink(`data/${filteredId}`, (err) => {
    if (err) {
      console.log(err);
    }

    res.redirect(302, `/`);
    res.end();
  });
});

router.get("/:pageId", (req, res, next) => {
  let filteredId = path.parse(req.params.pageId).base;
  fs.readFile(`data/${filteredId}`, "utf8", (err, data) => {
    if (err) {
      next(err);
    } else {
      let list = template.list(req.list);
      let title = req.params.pageId;
      let sanitizedTitle = sanitizeHtml(title);
      let sanitizedData = sanitizeHtml(data);
      let html = template.html(
        title,
        list,
        `<h2>${sanitizedTitle}</h2> ${sanitizedData}`,
        `<a href="/topic/create">create </a> <p>
             <a href="/topic/update/${sanitizedTitle}"> Update </a> <p>
             <form action="/topic/delete_process" method="post" onsubmit>
              <input type="hidden" name="id" value=${sanitizedTitle}>
              <input type="submit" value="Delete">
             </form>`
      );
      res.send(html);
    }
  });
});

module.exports = router;
