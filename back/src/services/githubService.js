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
  };
}

export { GithubService };
