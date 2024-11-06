import { type NextFunction, type Request, type Response } from "express";

import { MechanismService } from "../services/mechanism.service";

export const MechanismController = {
  async borrow(req: Request, res: Response, next: NextFunction) {
    try {
      const currentQty = await MechanismService.borrow(req.params.id);

      res.status(200).send({
        status: "success",
        message: "Successfully borrowed book",
        data: {
          currentQty,
        },
      });
    } catch (error: any) {
      res.status(400).send({
        status: "error",
        message: error.message,
        data: {},
      });
    }
  },

  async returnBook(req: Request, res: Response, next: NextFunction) {
    try {
      const currentQty = await MechanismService.returnBook(req.params.id);

      res.status(200).send({
        status: "success",
        message: "Successfully returned book",
        data: {
          currentQty,
        },
      });
    } catch (error: any) {
      res.status(400).send({
        status: "error",
        message: error.message,
        data: {},
      });
    }
  },
};
