const express = require("express");
const router = express.Router();
const template = require("../lib/template");

module.exports = function (passport) {
  router.get("/login", (req, res) => {
    let fmsg = req.flash();
    console.log(fmsg);
    let feedback = "";
    if (fmsg.error) {
      feedback = fmsg.error[0];
    }
    let title = "WEB - login";
    let html = template.html(
      title,
      `   <div>${feedback} </div>
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

  router.post(
    "/login_process",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
      failureFlash: true,
      successFlash: true,
    })
  );

  router.get("/logout", (req, res) => {
    req.logout();
    req.session.save(function () {
      res.redirect("/");
    });
  });
  return router;
};
