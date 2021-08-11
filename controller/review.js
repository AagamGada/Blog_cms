//  implement postReview and getReviewbyBlog
const Review = require("../models/review");
const { validationResult } = require("express-validator");

module.exports = {
  async postReview(req, res) {
    try {
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      let review = new Review({
        blog: req.body.blogId,
        author: req.user._id,
        content: req.body.content,
      });
      let newReview = await review.save();

      newReview = await newReview
        .populate("author", { name: 1, email: 1 })
        .execPopulate();

      return res.status(201).json({ newReview });
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
  async getReviewByBlog(req, res) {
    try {
      const { blogId } = req.params;
      const reviews = await Review.find({ blog: blogId }).populate("author", {
        name: 1,
      });
      return res.status(200).json({ reviews });
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
};
