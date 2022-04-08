const User = require("../models/user");
const genPassword = require("../utils/passwordUtils").genPassword;
const validPassword = require("../utils/passwordUtils").validPassword;
const crypto = require("crypto");

exports.addProfile = async (req, res, next) => {
  try {
    const {email,password} = req.body

    if (!( password && email )) {
      return res.status(400).json({
        success: false,
        error: "All input is required"
      });
    }

    const saltHash = genPassword(password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

  
    const token = crypto.randomBytes(64).toString('hex');
    const newUser = new User({
      hash: hash,
      salt: salt,
      email: email,
      token: token
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      data: newUser,
      token:token
    });
  } catch (err) {
    return res.json({
      success: false,
      error: `Error Adding User: ${err}`,
    });
  }
};


exports.login = async (req, res, next) => {
  console.log(req.body)

    try {
      const { email, password } = req.body;
      
      if (!(password || email)) {
        res.status(400).json({
          success: false,
          error: "Username and password are required"});
      }

      let user;
      user = await User.findOne({email: email})
        
      if (user && (await validPassword(password,user.hash, user.salt))) {
          const token = user.token;
          
        return res.status(200).json({
          success: true,
          data:user,
          token:token });
      }
      return res.status(400).json({
        success: false,
        error: `Invalid credentials`,
      });
    } catch (err) {
        return res.json({
        status: "500",
        success: false,
        error: `Error loging in : ${err.message}`,
      });    
  }
};

exports.logoutUser =  async (req,res) => {
  try {
      req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
      })
      await req.user.save()

      res.send()
  } catch (e) {
      res.status(500).send()
  }
};

