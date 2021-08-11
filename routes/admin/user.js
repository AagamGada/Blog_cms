const express = require("express");
const router = express.Router();
const AdminUserController = require("../../controller/admin/user");
const authMiddleware = require("../../config/auth");
const adminMiddleware = require("../../config/admin");
/**
 * @method GET
 * @route /api/admin/users
 */

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  AdminUserController.getAllUsers
);
/**
 * @method DELETE
 * @route /api/admin/users/:userId
 */

router.delete(
  "/:userId",
  authMiddleware,
  adminMiddleware,
  AdminUserController.deleteUser
);

/**
 * @method PUT
 * @route /api/admin/users/:userId
 */

router.put(
  "/:userId",
  authMiddleware,
  adminMiddleware,
  AdminUserController.updateUser
);

module.exports = router;
