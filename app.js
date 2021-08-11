const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dbInit = require("./config/db");
const helmet = require("helmet");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "40mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(logger("dev"));

// api routes
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const reviewRoutes = require("./routes/review");

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/review", reviewRoutes);

//admin api routes
const adminBlogRoutes = require("./routes/admin/blog");
const adminReviewRoutes = require("./routes/admin/review");
const adminUserRoutes = require("./routes/admin/user");

app.use("/api/admin/blog", adminBlogRoutes);
app.use("/api/admin/review", adminReviewRoutes);
app.use("/api/admin/users", adminUserRoutes);

// heroku Deployment

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "./client/build")));

  app.get("*", function (req, res) {
    res.send(path.resolve(__dirname, "./client/build", "index.html"));
  });
}
// DB
dbInit();

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});
