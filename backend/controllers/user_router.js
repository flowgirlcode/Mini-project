const express = require('express');
const bcrypt = require('bcrypt');
const User  = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports.verifyUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = await jwt.verify(token, process.env.KEY);
    
    return res.json({ status: true, message: "authorized" });
  } catch (error) {
    return res.json(error);
  }
};
// module.exports.verifyUser = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       console.log("No token found in cookies.");
//       return res.json({ status: false, message: "no token" });
//     }
//     const decoded = await jwt.verify(token, process.env.KEY);
//     req.user = decoded;  // Attach the decoded token to the request object
//     console.log("Decoded User:", decoded); // Log the decoded user info
//     next();
//   } catch (error) {
//     console.error("Token verification error:", error); // Log the error
//     return res.json({ status: false, message: "unauthorized" });
//   }
// };


exports.signup= async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
      return res.json({ message: "user already existed" })
      
    }
    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      username,
      email,
      password: hashpassword,
    })
    await newUser.save()
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jaya555priya@gmail.com',
        pass: 'ifdk jvjk nudj lcxo'
      }
    });

    var mailOptions = {
      from: 'jaya555priya@gmail.com',
      to: email,
      subject: 'Received password',
      text: `Hello ${username},
      🎉 Welcome to Your Expense Tracker! 🎉

      Are you ready to take control of your finances and pave the way towards financial freedom? Look no further! Our expense tracking platform is here to empower you on your journey towards financial wellness.

      Why Use Our Expense Tracker?
      
      - Stay Organized: Say goodbye to messy spreadsheets and paper receipts! Our intuitive platform helps you effortlessly organize your expenses, making it easy to track where your money is going.
      
      - Gain Insights: Knowledge is power! With our detailed analytics and reports, you'll gain valuable insights into your spending habits, allowing you to make informed financial decisions.
      
      - Budget Smarter: Take charge of your budgeting! Set personalized spending limits, receive timely alerts, and watch your savings grow as you achieve your financial goals.
      
      - Achieve Financial Goals: Whether you're saving for a dream vacation, a new home, or retirement, our expense tracker provides the tools you need to turn your financial dreams into reality.
      
      - Secure and Convenient: Your financial data is precious, and we take its security seriously. Rest assured that your information is encrypted and protected, ensuring a safe and seamless experience every time you log in.
      
      Start your journey today and take the first step towards a brighter financial future!
      `
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error sending mail" })
      } else {
        return res.json({ status: true, message: "email send" })

      }
    });
    return res.json({ status: true, message: "record registered" ,username:username});
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
}





module.exports.login= async(req,res)=>{
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ message: "user is not registered" })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.json({ message: "password is incorrect" })
    }

    const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' })
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
    return res.json({ status: true, message: "login successful" })

  } catch (error) {

    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports.forgotpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ message: "user not registered" })
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '30m' })

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jaya555priya@gmail.com',
        pass: 'ifdk jvjk nudj lcxo'
      }
    });

    var mailOptions = {
      from: 'jaya555priya@gmail.com',
      to: email,
      subject: 'Received password',
      text: `http://localhost:3000/resetpassword/${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error sending mail" })
      } else {
        return res.json({ status: true, message: "email send" })

      }
    });

  } catch (error) {
    console.log(error)
  }

}

module.exports.resetpassword = async (req, res) => {
  const token = req.params.token;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Invalid password' });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashpassword })
    return res.json({ status: true, message: "updated password" })


  } catch (error) {
    return res.json("invalid token")

  }
}
exports.getUsername = async (req, res) => {
  try {
    if (!req.user) {
      console.log("User not authenticated.");
      return res.status(401).json({ message: "User not authenticated" });
    }
    const username = req.user.username;
    console.log("Retrieved Username:", username); 
    res.json({ username });
  } catch (error) {
    console.error("Error fetching username:", error); 
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.logout=(req, res) => {
  res.clearCookie('token')
  return res.json({ status: true })
}


