import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import BlogCard from "./BlogCard";
import axios from "../utils/axios";
import { BlogContext } from "../context/BlogContext";
import Pagination from "@material-ui/lab/Pagination";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  landingContainer: {
    paddingTop: theme.spacing(5),
  },
  section: {
    paddingTop: theme.spacing(5),
  },
  pagination: {
    marginTop: theme.spacing(4),
  },
}));
export default function Landing() {
  const classes = useStyles();
  const [totalBlogs, setTotalBlogs] = useState(0);
  const { blogState, blogDispatch } = useContext(BlogContext);

  async function fetchBlogs(page, per_page, sort = "DESC") {
    try {
      const { data } = await axios.get(
        `/api/blog?page=${page}&per_page=${per_page}&sort=${sort}`
      );
      blogDispatch({ type: "BLOGS_LOADED", payload: data.blogs });
      setTotalBlogs(data.results);
    } catch (err) {
      blogDispatch({ type: "BLOG_ERROR", payload: "Internal Server Error" });
    }
  }

  useEffect(() => {
    fetchBlogs(1, 7);
    //eslint-disable-next-line
  }, []);

  const handlePagination = (ev, page) => {
    fetchBlogs(page, 7);
    window.scrollTo(0, 0);
  };

  // 20 blogs
  // per_page = 5
  return (
    <div className={classes.landingContainer}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item md={6} sm={6}>
            <img
              src="https://images.unsplash.com/photo-1625588196422-53bee986db86?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              style={{ width: "100%", maxHeight: 450 }}
              alt="This is heading"
            />
          </Grid>
          <Grid item md={6} sm={6}>
            <Link to={`/blog/${blogState.blogs[0]?._id}`}>
              <Typography variant="h4" color="primary" wrap gutterBottom>
                {ReactHtmlParser(blogState.blogs[0]?.topic)}
              </Typography>{" "}
            </Link>

            <Typography paragraph>
              {ReactHtmlParser(blogState.blogs[0]?.content.slice(0, 1000))} ....
            </Typography>
          </Grid>
        </Grid>
        <section className={classes.section}>
          <Grid container spacing={1}>
            {blogState.blogs.slice(1).map((blog) => {
              return (
                <Grid item md={4} sm={6} xs={12} key={blog._id}>
                  <BlogCard blog={blog} />
                </Grid>
              );
            })}
          </Grid>
          <Grid
            container
            justifyContent="center"
            className={classes.pagination}
          >
            <Grid item>
              <Pagination
                count={Math.ceil(totalBlogs / 7)}
                shape="rounded"
                onChange={handlePagination}
              />
            </Grid>
          </Grid>
        </section>
      </Container>
    </div>
  );
}
