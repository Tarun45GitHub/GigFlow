import {UserSchema as User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hash });
  res.json({ msg: "Registered" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,          // REQUIRED for sameSite=none
    sameSite: "none",      // REQUIRED for cross-domain
    maxAge: 7 * 24 * 60 * 60 * 1000,
   }).json({
    token,
    message: "Login successful",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
     });
};
