const express = require("express");
const fs = require("fs");
const topicRouter = require("./routes/topic");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const app = express();
const port = 3000;

const authData = {
  email: "wonho1401@gmail.com",
  password: "111111",
  nickname: "w0no",
};

app.use(express.static("public")); // 정적인 파일을 사용하는 방법.
//form 데이터 처리
//app.use를 통해 middleware가 장착되는 느낌.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.use(
  session({
    secret: "Keyboard Cat", //필수적으로 들어가야하는 값. 나중에는 꼭 변수처리하고 공유되지 않게 해야함.
    resave: false,
    saveUninitialized: true, //true로 놔야 세션이 있을때만 실행이 된다. false로 두게되면 서버에 큰 부담을 줄 수 있음.
    store: new FileStore({ logFn: function () {} }),
  })
);

//express-session이 내부적으로 사용되기 때문에 passport는 session 다음에 나와야함.
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

// app.use(passport.initialize());
// app.use(passport.session());
//여기부터 해야함.

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (username, password, done) {
      console.log("Local Strategy", username, password);
      if (username === authData.email) {
        console.log("1");
        if (password === authData.password) {
          console.log("2");
          return done(null, authData);
        } else {
          console.log("3");
          return done(null, false, { message: "Incorrect password" });
        }
      } else {
        console.log("4");
        return done(null, false, { message: "Incorrect username" });
      }
    }
  )
);

app.post(
  "/auth/login_process",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })
);

app.get("*", (req, res, next) => {
  fs.readdir("./data", (err, filelist) => {
    req.list = filelist; //filelist를 req.list에 담는거임.
    next(); //다음으로 호출될 미들웨어
  });
});

app.use("/topic", topicRouter); // /topic가 들어가는 주소에는 topicRouter라는 미들웨어를 적용시키겠다~ 이말이다.
app.use("/", indexRouter);
app.use("/auth", authRouter);
//routing -> 순서가 중요하다.

//가장 간단한 에러처리. 맨 아래에 두는 이유는? 맞는 것을 찾지 못했을때 가장 아래로 오기 때문에.
app.use((req, res) => {
  res.status(404).send("Sorry, Can't find that.");
});

//port를 listen. 읽는다고 생각하면 이해가 쉽다. 그렇게 해서 성공하면 출력.
app.listen(port, () => {
  console.log(`Example app porting on http://localhost:${port}`);
});

//다음과 같은 것은 기본적인 코드이기 때문에 express-generator 를 이용하면 쉽게 셋업할 수 있다.
