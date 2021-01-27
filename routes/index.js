const express = require("express");
const router = express.Router();
const template = require("../lib/template");
const cookie = require("cookie");

const IsAuthenticated = (req, res) => {
  let isLoggedIn = false;
  let cookies = {};
  if (req.headers.cookie) {
    cookies = cookie.parse(req.headers.cookie);
  }

  //이 코드는 보안에 아주 취약한 코드임. 세션을 이용한 방식을 이용해야함. + Hash => 원래값이 뭔지 모르게됨. => 보안 Good
  if (
    cookies.email === "wonho1401@gmail.com" &&
    cookies.password === "111111"
  ) {
    isLoggedIn = true;
  }
  return isLoggedIn;
};

const authStatusUI = (req, res) => {
  let authStatus = `<a href="/login"> Login </a>`;

  if (IsAuthenticated(req, res)) {
    authStatus = `<a href="/logout_process"> Logout </a>`;
  }

  return authStatus;
};
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
    authStatusUI(req, res)
  );
  res.send(html);
});

router.get("/login", (req, res) => {
  let title = "Login";

  let html = template.html(
    title,
    `
        <form action="login_process" method="post" >
          <p><input type="text" name="email" placeholder="Email"></p>
          <p><input type="password" name="password" placeholder="Password"></p>
          <p><input type="submit"></p>
          </form>
    `,
    ""
  );
  res.send(html);
});

router.post("/login_process", (req, res) => {
  let post = req.body;

  if (post.email === "wonho1401@gmail.com" && post.password === "111111") {
    res.writeHead(302, {
      "Set-Cookie": [
        `email = ${post.email}`,
        `password = ${post.password}`,
        `nickname= wonho`,
      ],
      Location: "/",
    });
  }
  res.end();
});

router.get("/logout_process", (req, res) => {
  let post = req.body;
  res.writeHead(302, {
    "Set-Cookie": [
      `email = ; Max-Age=0`,
      `password = ; Max-Age=0`,
      `nickname = ; Max-Age=0 `,
    ],
    Location: "/",
  });
  res.end();
});

module.exports = router;
module.exports.IsAuthenticated = IsAuthenticated;
module.exports.authStatusUI = authStatusUI;
