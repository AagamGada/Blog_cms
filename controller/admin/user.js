const User = require("../../models/user");
module.exports = {
  async getAllUsers(req, res) {
    try {
      const user = await User.find({}, { password: 0 });
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },

  async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      if (req.user._id === userId) {
        res.status(401).json({ msg: "You are not authorized" });
      }
      //find the user
      // if user.role == admin , throw out an error
      await User.findByIdAndDelete(userId);
      res.status(200).send(`User ${userId} deleted.`);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
  async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: { ...req.body },
        },
        {
          new: true,
          projection: {
            password: 0,
          },
        }
      );
      res.status(200).json({ user });
    } catch (err) {
      //   console.log(err);
      res.status(500).send("Internal Server Error");
    }
  },
};
