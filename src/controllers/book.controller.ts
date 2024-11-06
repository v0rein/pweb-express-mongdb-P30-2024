import { type NextFunction, type Request, type Response } from "express";

import {
  BookService,
  type CreateBookRequest,
  type UpdateBookRequest,
} from "../services/book.service";

export const BookController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { books } = await BookService.getAll();

      res.status(200).send({
        status: "success",
        message: "Successfully get all books",
        data: [...books],
      });
    } catch (error: any) {
      res.status(400).send({
        status: "error",
        message: error.message,
        data: {},
      });
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { book } = await BookService.getById(req.params.id);

      if (!book) {
        res.status(404).send({
          status: "failed",
          message: "Book not found",
          data: {},
        });
        return;
      } else {
        res.status(200).send({
          status: "success",
          message: "Successfully get book by id",
          data: book,
        });
      }
    } catch (error: any) {
      res.status(400).send({
        status: "error",
        message: error.message,
        data: {},
      });
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { book } = await BookService.create(req.body as CreateBookRequest);

      res.status(201).send({
        status: "success",
        message: "Book added successfully",
        data: {
          book,
        },
      });
    } catch (error: any) {
      if (error.name === "ValidationError") {
        res.status(400).send({
          status: "failed",
          message: error.message,
          data: {},
        });
      } else {
        res.status(400).send({
          status: "failed",
          message: error.message,
          data: {},
        });
      }
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { book } = await BookService.update(
        req.body as UpdateBookRequest,
        req.params.id
      );

      res.status(200).send({
        status: "success",
        message: "Book updated successfully",
        data: {
          book,
        },
      });
    } catch (error: any) {
      if (error.name === "ValidationError") {
        res.status(400).send({
          status: "failed",
          message: error.message,
          data: {},
        });
      } else {
        res.status(400).send({
          status: "failed",
          message: error.message,
          data: {},
        });
      }
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { book } = await BookService.delete(req.params.id);

      if (!book) {
        res.status(404).send({
          status: "failed",
          message: "Book not found",
        });
      } else {
        res.status(200).send({
          status: "success",
          message: "Successfully remove book",
        });
      }
    } catch (error: any) {
      res.status(400).send({
        status: "error",
        message: error.message,
        data: {},
      });
    }
  },
};
