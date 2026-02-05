const jwt = require("jsonwebtoken");
const { createSearchIndex } = require("../models/album.model");

async function authArtist(req, res, next) {
  //step 1 : store valid token
  const token = req.cookies.token;

  //step 2 : token is empty or not
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }

  try {
    //step 3 : verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // step 4 : checking user access or not artist access denied
    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "You don't have access",
      });
    }

    req.user = decoded;
    //step 5: next for next work
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user" && decoded.role !== "artist") {
      return res.status(403).json({
        message: "You don't have access",
      });
    }
    next()
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}
module.exports = { authArtist,authUser };
