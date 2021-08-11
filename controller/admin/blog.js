const Blog = require("./../../models/blog");
const { validationResult } = require("express-validator");

module.exports = {
  async postBlog(req, res) {
    try {
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const blogExist = await Blog.findOne({ topic: req.body.topic });
      if (blogExist) {
        return res.status(400).json({ msg: "Blog with title already exists" });
      }
      let blog = new Blog({ ...req.body, author: req.user._id });
      blog = await blog.save();
      res.status(201).json({ blog });
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },

  async getAllBlogs(req, res) {
    try {
      let blogs = await Blog.find({});
      res.status(200).json(blogs);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
  async deleteBlog(req, res) {
    try {
      const { blogId } = req.params;
      await Blog.findByIdAndDelete(blogId);
      res.status(200).json({ msg: `Blog ${blogId} deleted` });
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },

  async updateBlog(req, res) {
    try {
      const { blogId } = req.params;
      let topic = await Blog.findOne({ topic: req.body.topic });
      if (topic) {
        return res.status(400).json({ msg: "Topic already exists" });
      }

      const blog = await Blog.findOneAndUpdate(
        { _id: blogId },
        {
          $set: { ...req.body },
        },
        { new: true }
      );
      res.status(200).json({ blog });
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
};
