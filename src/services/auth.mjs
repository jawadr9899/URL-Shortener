import jwt from "jsonwebtoken";
import UserModel from "../models/user.mjs";
import { AppConfig } from "../config/config.mjs";
import bcryptjs from "bcryptjs";

const secretKey = AppConfig.JWT_SECRET || "??$$$$??";

class Service {
  async encryptPassword(password){
    const salt = await bcryptjs.genSalt(10);
    const hashed = await bcryptjs.hash(password,salt);
    return hashed;
  }

  async signUp(name, email, password) {
    try {
      const passHash = await this.encryptPassword(password);

      const user = await UserModel.create({
        name,
        email,
        password:passHash,
      });

      return user._id;
    } catch (error) {
      console.log(`Error at authService:\n ${error}`);
      return {
        msg: "Internal Server Error!",
        success: false,
      };
    }
  }
  authenticate(req, res, next) {
    const uid = req.cookies?.uid;
    
    // check
    if (!uid) {
      return res.redirect("/signin");
    }
    // verification
    const result = jwt.verify(uid, secretKey);
    if (!result) return res.redirect("/signin");
    // set to req obj
    req.uid = result;
    next();
  }
  async signIn(email, password) {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return { msg: "Not Found!", success: false };
      // check for credentials
      const compareResult = bcryptjs.compareSync(password, user.password);
      if (!compareResult)
        return { msg: "Invalid Credentials!", success: false };
      // token
      const token = jwt.sign({ _id: user._id }, secretKey,{expiresIn:"2d"});
      return token;
    } catch (error) {
      console.log(`Error at authService:\n ${error}`);
      return {
        msg: "Internal Server Error!",
        success: false,
      };
    }
  }
}

const authService = new Service();

export default authService;
