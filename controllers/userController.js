import express from "express";
import CryptoJS from "crypto-js";
import md5 from "md5";
import userSchema from "../utils/validate.js";
const app = express();
const data = [];
const SECRET = "kuku";
let idCount = 1;
app.use(express.json());

function registration(req, res) {
  try {
    const { fName, lName, email, password } = req.body;

    const { error } = userSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (!fName || !lName || !email || !password) {
      return res.status(400).json({
        message: "fName or lName or email or password is required please write",
      });
    }

    const userData = {
      fName,
      lName,
      email,
      password: md5(md5(password) + "__secret__"),
      idCount,
    };
    data.push(userData);
    console.log(data);
    console.log(userData.password);
    console.log(userData);
    return res.status(201).json({
      message: "User data is successful",
      id: ++idCount,
      user: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}

function getUsersdata(req, res) {
  try {
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}

function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = data.find(
      (user) =>
        user.email === email &&
        user.password === md5(md5(password) + "__secret__")
    );

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const tokenData = {
      id: idCount,
      email: user.email,
    };

    const hash = CryptoJS.AES.encrypt(JSON.stringify(tokenData), SECRET);
    return res.status(200).json({
      message: "User data is successful",
      token: hash.toString(),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}

function getUserToken(req, res) {
  try {
    const token = req.headers["x-token"];
    if (!token) {
      return res.status(401).json({
        message: "Key Unauthorized",
      });
    }

    const decrypt = CryptoJS.AES.decrypt(token, SECRET);
    const result = decrypt.toString(CryptoJS.enc.Utf8);

    if (!result) {
      return res.status(401).json({
        message: "Invalid token in value",
      });
    }

    const tokenData = JSON.parse(result);
    if (tokenData.id) {
      res.status(200).json({
        message: "User data is successful",
        user: tokenData,
      });
      return;
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export { registration, getUsersdata, login, getUserToken };
