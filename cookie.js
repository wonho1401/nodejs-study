const http = require("http");
const cookie = require("cookie");

http
  .createServer((req, res) => {
    let cookies = {};
    if (req.headers.cookie !== undefined) {
      cookies = cookie.parse(req.headers.cookie);
    }
    console.log(cookies);
    res.writeHead(200, {
      "set-cookie": [
        "yummy-cookie = choco",
        "tasty-cookie = strawberry",
        // `permanent = cookie; Max-Age=${60 * 60 * 24 * 30}`,
        // 쿠키 뒤에 Max-Age or Expired 를 사용하면 기한을 정할 수 있다.
        "Secure = Secure; Secure", //request header에는 나오지 않는다! (Https에서만 나오게 됨.)
        "HttpOnly = HttpOnly; HttpOnly", //javascript를 통해서는 접근하지 못하도록 하는 것.
        "Path = Path; Path=/cookie", //path에 해당하는 주소에만 쿠키가 생성됨.
        "Domain = Domain; Domain=localhost", //해당 도메인에서만 쿠키가 생성.
      ],
    });
    res.end("Cookie!!!");
  })
  .listen(3000);

console.log("okay");
