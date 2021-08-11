const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: { type: Schema.Types.ObjectID, ref: "User" },
    isPublished: {
      type: Boolean,
      default: false,
    },
    category: {
      type: [String],
      default: ["Uncategorized"],
    },
    blogAvatar: {
      type: String,
      default:
        "https://via.placeholder.com/150/000000/FFFFFF/?text=No_Blog_Image",
    },
  },
  { timestamps: true }
);

blogSchema.index({ topic: 1 });

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
