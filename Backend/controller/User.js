import User from "../model/usermodel.js";
import jwt from "jsonwebtoken";
const time = 10 * 24 * 60 * 60;
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "Incorrect Email") {
    errors.email = "This email is not registered";
  }
  if (err.message === "Incorrect Password") {
    errors.password = "This password is incorrect";
  }
  // Check for duplicate email error
  if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
  }

  // Check for validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: time,
  });
};

export const create = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const newUser = new User({ name, password, email });

    const token = createToken(newUser._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: time * 1000,
      sameSite: "lax",
      secure: true  
    });

    await newUser.save();

    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: time * 1000,
      sameSite: "lax",
      secure: true  
    });

    res.status(200).json({ message: "Login success" });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "lax",secure: true  });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed", error });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { email, name ,googleId} = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      user = new User({ name, email ,googleId });
      await user.save();
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: time * 1000,
      sameSite: "lax",
      secure: true  
    });


    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Google login failed", error });
  }
};
