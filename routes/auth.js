const express = require("express");
const router = express.Router();
const template = require("../lib/template");

const authData = {
  email: "wonho1401@gmail.com",
  password: "111111",
  nickname: "w0no",
};

router.get("/login", (req, res) => {
  let title = "WEB - login";

  let html = template.html(
    title,
    `
        <form action="/auth/login_process" method="post" >
          <p><input type="text" name="email" placeholder="Email"></p>
          <p><input type="password" name="password" placeholder="Password"></p>
          <p><input type="submit" value="login"></p>
          </form>
    `,
    ""
  );
  res.send(html);
});

router.post("/login_process", (req, res) => {
  let post = req.body;
  let email = post.email;
  let password = post.password;

  if (email === authData.email && password === authData.password) {
    req.session.is_loggedIn = true;
    req.session.nickname = authData.nickname;
    req.session.save(() => {
      res.redirect("/");
    });
  } else {
    res.send("Login denied");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

module.exports = router;
// module.exports.IsAuthenticated = IsAuthenticated;
// module.exports.authStatusUI = authStatusUI;
