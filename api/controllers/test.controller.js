import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res) => {
  //verify with verifyToken
  //If everything cehcks out
  console.log(req.userId);

  res.status(200).json({ message: "You are autenticated" });
};
export const shouldBeAdmin = async (req, res) => {
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
    if (!payload.isAdmin) {
      return res.status(403).json({ message: "Not authorized account!  " });
    }
  });

  //If everything cehcks out
  res.status(200).json({ message: "You are autenticated and authorized" });
};
