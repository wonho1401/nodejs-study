const express = require("express");
const parseurl = require("parseurl");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "Keyboard Cat", //필수적으로 들어가야하는 값. 나중에는 꼭 변수처리하고 공유되지 않게 해야함.
    resave: false,
    saveUninitialized: true, //true로 놔야 세션이 있을때만 실행이 된다. false로 두게되면 서버에 큰 부담을 줄 수 있음.
  })
);

//
app.get("/", (req, res, next) => {
  if (req.session.num === undefined) {
    req.session.num = 1;
  } else {
    req.session.num += 1;
  }

  res.send(` View = ${req.session.num}`);
});

app.listen(3000, () => {
  console.log("Example app in Port:3000");
});
