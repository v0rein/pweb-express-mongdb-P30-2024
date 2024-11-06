import { User } from "../models/user.model";
import bcrypt from "bcrypt";

interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

interface LoginRequest {
  email?: string;
  username?: string;
  password: string;
}

export type { RegisterRequest };

export const AuthService = {
  async register(request: RegisterRequest) {
    const newUser = new User(request);

    try {
      const savedUser = await newUser.save();
      return { user: savedUser };
    } catch (err) {
      throw err;
    }
  },

  async login(request: LoginRequest) {
    const { email, username, password } = request;

    try {
      const user = await User.findOne({ $or: [{ email }, { username }] });
      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const token = await user.generateAuthToken();
      return { user, token };
    } catch (err) {
      throw err;
    }
  },
};
