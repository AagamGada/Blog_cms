const express = require("express");
const router = express.Router();
const BlogController = require("../controller/blog");
/**
 * @method GET
 * @route /api/blog
 */
router.get("/", BlogController.getBlogsPaginated);
/**
 * @method GET
 * @route /api/blog/:blogId
 */
router.get("/:blogId", BlogController.getSpecificBlog);
module.exports = router;
