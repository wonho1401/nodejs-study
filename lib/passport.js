//express-session이 내부적으로 사용되기 때문에 passport는 session 다음에 나와야함.
module.exports = function (app) {
  const authData = {
    email: "wonho1401@gmail.com",
    password: "111111",
    nickname: "w0no",
  };

  let passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  //serializeUser는 사용자가 로그인에 성공했을때 딱 한번 호출됨. 그리고 식별자를 session store에 저장한다.
  passport.serializeUser(function (user, done) {
    console.log("serial", user);
    done(null, user.email);
  });

  //deserializeUser는 우리가 필요한 정보를 조회할때 호출됨.
  passport.deserializeUser(function (id, done) {
    console.log("deserial", id);
    done(null, authData);
  });
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      function (username, password, done) {
        if (username === authData.email) {
          if (password === authData.password) {
            return done(null, authData);
          } else {
            return done(null, false, { message: "Incorrect password" });
          }
        } else {
          return done(null, false, { message: "Incorrect username" });
        }
      }
    )
  );
  return passport;
};
