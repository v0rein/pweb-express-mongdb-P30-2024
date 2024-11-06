import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    publishedDate: {
      type: String,
      required: true,
      validate(val: any) {
        const dateRegex =
          /^(0[1-9]|[12][0-9]|3[01]) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/;
        const longDateRegex =
          /^(0[1-9]|[12][0-9]|3[01]) (January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/;
        if (!dateRegex.test(val) && !longDateRegex.test(val)) {
          throw new Error("Invalid date format");
        }
      },
    },
    publisher: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    rating: {
      average: { type: Number, required: true },
      count: { type: Number, required: true },
    },
    tags: [{ type: String, required: true }],
    initialQty: { type: Number, required: true },
    qty: { type: Number, required: true },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export { Book };
