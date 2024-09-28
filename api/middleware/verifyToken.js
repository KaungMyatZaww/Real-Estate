import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  //Check if the user exists
  if (!token) {
    return res.status(401).json({ message: "Not autenticated! " });
  }

  //Check if the token is valid by checking with JWT token from logging in
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid!  " });
    }
    req.userId = payload.id;
    next();
  });
};
