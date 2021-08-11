const express = require("express");
const router = express.Router();
const AdminReviewController = require("../../controller/admin/review");
const authMiddleware = require("../../config/auth");
const adminMiddleware = require("../../config/admin");
/**
 * @method GET
 * @route /api/admin/review
 */

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  AdminReviewController.getAllReviews
);
/**
 * @method DELETE
 * @route /api/admin/review/:reviewId
 */

router.delete(
  "/:reviewId",
  authMiddleware,
  adminMiddleware,
  AdminReviewController.deleteReview
);

module.exports = router;
