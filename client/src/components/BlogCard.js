import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "black",
    textDecoration: "none",
    cursor: "pointer",
  },
}));
export default function BlogCard(props) {
  const classes = useStyles();
  return (
    <div>
      <img
        src={`${props.blog.blogAvatar}`}
        style={{ width: "100%", height: "clamp(200px,250px,300px)" }}
        alt="This is heading"
      />
      <Link to={`/blog/${props.blog._id}`} className={classes.link}>
        <Typography variant="h5">{props.blog?.topic}</Typography>
      </Link>
      <Typography paragraph>
        {ReactHtmlParser(props.blog?.content.slice(0, 40))}
      </Typography>
    </div>
  );
}
