import { User } from "../db";
import axios from "axios";
import jwt from "jsonwebtoken";

class GithubService {
  static addUser = async ({ newUser }) => {
    const user = await User.create({ newUser });
    return user;
  };

  static checkUser = async ({ email, nickname, id, loginMethod }) => {
    const user = await User.findByEmail({ email });
    if (user) {
      if (user.userId == id) {
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ user_id: user.userId }, secretKey);
        const loginUser = { token, userId: id, email, nickname };
        return loginUser;
      }
    }
  };
}

export { GithubService };
