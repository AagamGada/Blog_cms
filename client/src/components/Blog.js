import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  makeStyles,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import ReviewCard from "./ReviewCard";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import { BlogContext } from "../context/BlogContext";
import Spinner from "./spinner.gif";
import ReactHtmlParser from "react-html-parser";

const useStyles = makeStyles((theme) => ({
  reviewBox: {
    width: "100%",
    resize: "none",
    background: "#f5f5f5",
    fontSize: 16,
    padding: theme.spacing(2),
    outline: "none",
    "&:focus": {
      border: "2px solid #3d506E",
    },
  },
  reviewsContainer: {
    marginTop: theme.spacing(4),
  },
}));
export default function Blog() {
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [reviewContent, setReviewContent] = useState("");
  const { blogState, blogDispatch } = useContext(BlogContext);
  const classes = useStyles();

  useEffect(() => {
    const fetchBlogAndReview = async () => {
      try {
        const blogId = params.blogId;
        blogDispatch({ type: "BLOG_LOADING", payload: true });
        const [blogdata, reviewdata] = await Promise.all([
          axios.get(`/api/blog/${blogId}`),
          axios.get(`api/review/${blogId}`),
        ]);
        blogDispatch({ type: "BLOG_LOADED", payload: blogdata.data.blog });
        blogDispatch({
          type: "REVIEWS_LOADED",
          payload: reviewdata.data.reviews,
        });
      } catch (err) {
        blogDispatch({ type: "BLOG_ERROR", payload: "Internal Server Error" });
      }
    };
    fetchBlogAndReview();

    return () => {
      blogDispatch({ type: "BLOG_UNLOADED" });
    };
  }, []);

  const handleReviewSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/api/review", {
        blogId: params.blogId,
        content: reviewContent,
      });
      blogDispatch({ type: "POST_REVIEW", payload: data.newReview });
    } catch (err) {
      enqueueSnackbar("Login in to leave a review", { variant: "error" });

      blogDispatch({ type: "BLOG_ERROR", payload: "Internal Server Error" });
    }
  };
  return (
    <div style={{ padding: "2.5rem 0" }}>
      <Container maxWidth="sm">
        {blogState.loading ? (
          <img src={Spinner} alt="loader" />
        ) : (
          <>
            <Typography variant="h4">{blogState.blog?.topic}</Typography>
            <p>{ReactHtmlParser(blogState.blog?.content)}</p>
          </>
        )}

        <Divider style={{ marginTop: 10 }} />

        <div className={classes.reviewsContainer}>
          <Typography variant="h5">Discussions</Typography>
          <form onSubmit={handleReviewSubmit}>
            <textarea
              rows={5}
              className={classes.reviewBox}
              value={reviewContent}
              onChange={(ev) => {
                setReviewContent(ev.target.value);
              }}
            />
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </form>
        </div>

        {blogState.reviews.map((data) => {
          return <ReviewCard review={data} />;
        })}
      </Container>
    </div>
  );
}
