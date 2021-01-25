const express = require("express");
const fs = require("fs");
const topicRouter = require("./routes/topic");
const indexRouter = require("./routes/index");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const app = express();
const port = 3000;

app.use(express.static("public")); // 정적인 파일을 사용하는 방법.
//form 데이터 처리
//app.use를 통해 middleware가 장착되는 느낌.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.get("*", (req, res, next) => {
  fs.readdir("./data", (err, filelist) => {
    req.list = filelist; //filelist를 req.list에 담는거임.
    next(); //다음으로 호출될 미들웨어
  });
});

app.use("/topic", topicRouter); // /topic가 들어가는 주소에는 topicRouter라는 미들웨어를 적용시키겠다~ 이말이다.
app.use("/", indexRouter);
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
