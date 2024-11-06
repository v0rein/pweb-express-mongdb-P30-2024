import { type NextFunction, type Request, type Response } from "express";

import { AuthService, type RegisterRequest } from "../services/auth.service";

export const AuthController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = await AuthService.register(req.body as RegisterRequest);

      res.status(201).send({
        status: "success",
        message: "User registered successfully",
        data: {
          user: {
            email: user.email,
            username: user.username,
            id: user._id,
          },
        },
      });
    } catch (error: any) {
      if (error.code === 11000 && error.keyPattern?.email) {
        console.log(error.name, error.message);
        res.status(400).send({
          status: "failed",
          message: "Email already exists",
        });
      } else if (error.name === "ValidationError") {
        res.status(400).send({
          status: "failed",
          message: error.message,
        });
      } else if (error.code == 11000 && error.keyPattern?.username) {
        res.status(400).send({
          status: "failed",
          message: "Username already exists",
        });
      } else {
        res.status(400).send({
          status: "failed",
          message: error.message,
        });
      }
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, username, password } = req.body;

      if (email && username) {
        throw new Error("Please provide either email or username, not both");
      }

      const { user, token } = await AuthService.login(req.body);
      res.status(200).send({
        status: "success",
        message: "User logged in successfully",
        data: {
          user: {
            email: user.email,
            username: user.username,
          },
          token,
        },
      });
    } catch (error: any) {
      res.status(400).send({
        status: "failed",
        message: error.message,
        data: {},
      });
    }
  },
};
