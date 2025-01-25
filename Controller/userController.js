const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Required Details are Missing" });
  } else {
    if (role === "admin") {
      const adminExists = await User.findOne({ role: "admin" });
      if (adminExists) {
        return res.status(400).json({ message: "Admin already exists!" })
      } else {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          role
        });
        await newUser.save();
        const token = jwt.sign({
          _id: newUser._id
        }, 'secretkey123', { expiresIn: '1d' });
        res.status(200).json({
          user: { name: newUser.name, email: newUser.email, role: newUser.role },
          message: "New Admin has been saved Successfully",
          token
        });
      }
    } else {
      try {
        const exsistingUser = await User.findOne({ email });
        if (exsistingUser) {
          return res.status(400).json({
            message: "User Already Exsist"
          });
        } else {
          const hashedPassword = await bcrypt.hash(password, 12);
          const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
          });
          await newUser.save();
          const token = jwt.sign({
            _id: newUser._id
          }, 'secretkey123', { expiresIn: '1d' });
          res.status(200).json({
            user: { name: newUser.name, email: newUser.email, role: newUser.role },
            message: "New User has been saved Successfully",
            token
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "Something went wrong"
        });
      }
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "your_secret_key",
      { expiresIn: "1d" }
    );
    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  login
}