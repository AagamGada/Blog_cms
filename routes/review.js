const express = require("express");
const router = express.Router();
const { validatePostReview } = require("../config/validator");
const authMiddleware = require("../config/auth");
const ReviewController = require("../controller/review");

/**
 * @method POST
 * @route /api/review
 */
router.post(
  "/",
  authMiddleware,
  validatePostReview,
  ReviewController.postReview
);
/**
 * @method GET
 * @route /api/review/:blogId
 */
router.get("/:blogId", ReviewController.getReviewByBlog);

module.exports = router;
