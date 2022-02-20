const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const shortid = require("short-id");
require("dotenv").config();
exports.Signup = async (req, res) => {
  console.log(req.body);
  try {
    let user = await User.findOne({ email: req.body.info.email });

    if (user) {
      return res.status(400).json({
        message: "User Exists ",
      });
    }

    //create new user

    let user_name = shortid.generate();
    let profile = `http://localhost:4200/profile/${user_name}`;
    user = new User({
      email: req.body.info.email,
      password: req.body.info.password,
      profile: profile,
      user_name: user_name,
      role: req.body.role,
    });

    console.log("thsi is hittin");
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save(async (err, user) => {
      if (err) {
        return res.status(400).json({
          message: "inexpected error happened",
        });
      }
    });

    const payload = {
      user: {
        id: user._id, //this is the user we just saved
      },
    };

    const token = jwt.sign(payload, "adddasdasda", {
      expiresIn: "1d",
    });
    return res.status(200).send({
      token: token,
      user: user,
      message: "Sign Up Done.. Please Sign In And Shop ",
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.AuthenticatedToken = async (req, res) => {
  //token is valid you get the user and see the content of protected page

  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.Signin = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    //console.log(user);
    //no user
    if (!user) {
      return res.status(400).json({
        message: "No User Exists ",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    //no password
    if (!isMatch) {
      return res.status(400).json({
        message: "Password didnt match ",
      });
    }

    const payload = {
      user: {
        id: user._id,
        email: user.email,
      },
    };

    const token = jwt.sign(payload, "adddasdasda", {
      expiresIn: "1d",
    });

    res.cookie("token", token, { expiresIn: "1d" });
    return res.status(200).send({
      token: token,
      user: user,
      message: "Sign Up Done.. Please Sign In And Shop ",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error,
    }); 
  }
};

exports.Signout = (req, res, next) => {
  //whhile signing out clear the cookie
  res.clearCookie("token");

  res.json({
    nessage: "Sign Out Success",
  });
};

exports.authMiddleware = async (req, res, next) => {
  console.log(
    "I am getting the id of the verified person that i got from tokenAuth middleware",
    req.user.id
  );
  //need the user id
  try {
    const authUserID = req.user.id;

    // console.log(authUserID);
    let authUser = await User.findById({ _id: authUserID });

    console.log(
      "This is the entire user information i pulled using the logged in user",
      authUser
    ); //This comes with photo and all stuffs including password
    //no user
    if (!authUser) {
      return res.status(400).json({ errors: [{ msg: "There is no user" }] });
    }
    // console.log("Using that Id i got I am find the entire user info", authUser);
    // console.log(authUser.profile);

    req.user = authUser;

    next();

    // authUser.profile = user;
  } catch (error) {
    console.error("something wrong with authMiddleware");
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.adminMiddleware = async (req, res, next) => {
  //console.log(req.user.id);
  //need the user id
  try {
    const adminUserID = req.user.id;

    //console.log(adminUserID);
    let adminUser = await User.findById({ _id: adminUserID });
    //no user
    if (!adminUser) {
      return res.status(400).json({ errors: [{ msg: "There is no user" }] });
    }

    if (adminUser.role != 1) {
      return res
        .status(400)
        .json({ errors: [{ msg: "You dont have access to this page" }] });
    }
    req.user = adminUser;
    next();
  } catch (error) {
    console.error("something wrong with adminMiddleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
