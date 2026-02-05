const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



async function registerUser(req, res) {
  try {
    const { username, email, password, role = "user" } = req.body;
    //check if user exists
    const isUserAlreadyExisting = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExisting) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    //password hashing

    const hashedPassword = await bcrypt.hash(password, 10);

    //user create
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    //token generation
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    //secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to register",
    });
  }
}

async function loginUser(req, res) {

    try{
        const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentails.",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid credentails.",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,{expiresIn:"1d"}
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message : "user login successfully",
    id:user._id,
    username:user.username,
    email:user.email,
    role:user.role
  })
    }catch(error){

        console.log("login error")
        return res.status(500).json({
            message : "Failed to login"
        })

    }
  
}

async function logoutUser(req,res) {
    
  res.clearCookie("token")
  res.status(200).json({
    message : "user logged out seccessfulluy"
  })

  
}



module.exports = { registerUser , loginUser,logoutUser};
