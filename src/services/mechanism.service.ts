import { Book } from "../models/book.model";

export const MechanismService = {
  async borrow(id: string) {
    try {
      const book = await Book.findById(id);

      if (!book) {
        throw new Error("Book not found");
      }

      if (book.qty === 0) {
        throw new Error("Book not available / out of stock");
      }

      book.qty -= 1;
      await book.save();

      return book.qty;
    } catch (err) {
      throw err;
    }
  },

  async returnBook(id: string) {
    try {
      const book = await Book.findById(id);

      if (!book) {
        throw new Error("Book not found");
      }

      book.qty += 1;

      if (book.qty > book.initialQty) {
        throw new Error("Invalid return book, book qty exceeded initial qty");
      }

      await book.save();

      return book.qty;
    } catch (err) {
      throw err;
    }
  },
};
