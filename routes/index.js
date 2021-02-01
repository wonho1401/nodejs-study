const express = require("express");
const router = express.Router();
const template = require("../lib/template");
const auth = require("../lib/auth");

// path에 들어가면 callback 함수 실행.
router.get("/", (req, res) => {
  let title = "Welcome";
  let data = "Hello. Nodejs";

  let list = template.list(req.list);

  let html = template.html(
    title,
    list,
    `<h2>${title}</h2> ${data}
    <img src="/images/hello.jpg" style="width:600px; height:400px; display:flex; flex-direction:column; padding-top:20px;">
    `,
    `<a href="/topic/create">create </a>`,
    auth.statusUI(req, res)
  );
  res.send(html);
});

module.exports = router;
