const Review = require("../../models/review");

module.exports = {
  async deleteReview(req, res) {
    try {
      const { reviewId } = req.params;
      await Review.findByIdAndDelete(reviewId);
      res.status(200).json({ msg: `Review ${reviewId} deleted` });
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },

  async getAllReviews(req, res) {
    try {
      const reviews = await Review.find({})
        .populate("author", {
          name: 1,
          email: 1,
        })
        .populate("blog", { topic: 1 });
      res.status(200).json({ reviews });
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
};
