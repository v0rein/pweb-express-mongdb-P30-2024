import { Book } from "../models/book.model";

interface CreateBookRequest {
  title: string;
  author: string;
  publishedDate: string;
  publisher: string;
  description: string;
  coverImage: string;
  rating: {
    average: number;
    count: number;
  };
  tags: string[];
  initialQty: number;
  qty: number;
}

interface UpdateBookRequest {
  title?: string;
  author?: string;
  publishedDate?: string;
  publisher?: string;
  description?: string;
  coverImage?: string;
  rating?: {
    average?: number;
    count?: number;
  };
  tags?: string[];
  initialQty?: number;
  qty?: number;
}

export type { CreateBookRequest, UpdateBookRequest };

export const BookService = {
  async getAll() {
    try {
      const books = await Book.find();
      return { books };
    } catch (err) {
      throw err;
    }
  },

  async getById(id: string) {
    try {
      const book = await Book.findById(id);
      return { book };
    } catch (err) {
      throw err;
    }
  },

  async delete(id: string) {
    try {
      const book = await Book.findByIdAndDelete(id);
      return { book };
    } catch (err) {
      throw err;
    }
  },

  async create(request: CreateBookRequest) {
    const newBook = new Book(request);

    try {
      const savedBook = await newBook.save();
      return { book: savedBook };
    } catch (err) {
      throw err;
    }
  },

  async update(request: UpdateBookRequest, id: string) {
    try {
      const bookFound = await Book.findById(id);

      if (!bookFound) {
        throw new Error("Book not found");
      }

      Object.keys(request).forEach((key) => {
        const keyTyped = key as keyof UpdateBookRequest;
        if (request[keyTyped]) {
          (bookFound[keyTyped] as any) = request[keyTyped];
        }
      });

      const updatedBook = await bookFound.save();
      return { book: updatedBook };
    } catch (err) {
      throw err;
    }
  },
};
