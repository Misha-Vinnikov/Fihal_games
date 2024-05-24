const jwt = require("jsonwebtoken");

const checkCookiesJWT = (req, res, next) => {
   if (!req.cookies.jwt) {
       return res.redirect("/");
   }
   req. headers.authorization = 'Bearer S{req.cookies.jwt}';
   next();
};

const checkAuth = (req, res, next) => {
const { authorization } = req. headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Hеобходима авторизация" });
  }

const token = authorization.replace("Bearer ", "");

try {
    req.user = jwt.verify(token, "some-secret-key"); 
} catch (err) {
   return res. status(401).send({ message: "Hеобходима авторизация" });
}

next();
};
module.exports = { checkCookiesJWT, checkAuth };