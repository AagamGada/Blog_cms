const express = require("express");
const router = express.Router();
const { validatePostBlog } = require("../../config/validator");
const AdminBlogController = require("../../controller/admin/blog");
const authMiddleware = require("../../config/auth");
const adminMiddleware = require("../../config/admin");

/**
 * @method POST
 * @route /api/admin/blog
 */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validatePostBlog,
  AdminBlogController.postBlog
);
/**
 * @method GET
 * @route /api/admin/blog
 */
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  AdminBlogController.getAllBlogs
);
/**
 * @method DELETE
 * @route /api/admin/blog/:blogId
 */
router.delete(
  "/:blogId",
  authMiddleware,
  adminMiddleware,
  AdminBlogController.deleteBlog
);

/**
 * @method PUT
 * @route /api/admin/blog/:blogId
 */
router.put(
  "/:blogId",
  authMiddleware,
  adminMiddleware,
  AdminBlogController.updateBlog
);
module.exports = router;
