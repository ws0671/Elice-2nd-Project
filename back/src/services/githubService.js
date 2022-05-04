import { User } from "../db";
import axios from "axios";
import jwt from "jsonwebtoken";

class GithubService {
  static addUser = async ({ newUser }) => {
    const user = await User.create({ newUser });
    return user;
  };
}

export { GithubService };
