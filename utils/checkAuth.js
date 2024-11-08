import jwt from "jsonwebtoken";

export default (req, res, next) => {
  console.log("checkauth");
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, ""); //const [bearer, token] = authorization.split(" ");

  console.log(token);

  if (!token) {
    return res.status(403).json({ message: "no access !token" });
  }

  try {
    const decoded = jwt.verify(token, "secret123");
    req.userId = decoded._id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "no access" });
  }
};
