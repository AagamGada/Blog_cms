import React from "react";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  reviewCard: {
    padding: theme.spacing(2),
    border: "1px solid #ccc",
    "& > p": {
      paddingTop: theme.spacing(2),
    },
    marginTop: theme.spacing(1),
  },
}));

export default function ReviewCard(props) {
  const classes = useStyles();
  let month = new Date(props.review.createdAt).toLocaleString("default", {
    month: "short",
  });
  let day = new Date(props.review.createdAt).getDate();
  return (
    <div className={classes.reviewCard}>
      <h4>{props.review.author.name}</h4>
      <p>{props.review.content}</p>
      <p>{`${month} ${day}`}</p>
    </div>
  );
}
