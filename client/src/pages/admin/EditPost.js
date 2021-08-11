import React, { useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import { TextField, makeStyles, Button, Paper } from "@material-ui/core";
import axios from "../../utils/axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  postContainer: {
    height: "fit-content",
    padding: theme.spacing(4),
    width: "100%",
    "& >div": {
      margin: "15px 0",
    },
  },
}));

const config = {
  readonly: false,
  height: 600,
  uploader: {
    insertImageAsBase64URI: true,
  },
  style: {
    fontFamily: "charter",
    fontSize: 18,
  },
};
export default function EditPost() {
  const params = useParams();
  const [content, setContent] = useState("");
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [blogValues, setBlogValues] = useState({
    topic: "",
    blogAvatar: "",
    isPublished: true,
  });

  const handleChange = async (ev) => {
    setBlogValues((prev) => ({
      ...prev,
      [ev.target.id]: ev.target.value,
    }));
  };

  useEffect(() => {
    const getBlog = async () => {
      try {
        const { data } = await axios.get(`/api/blog/${params.blogId}`);
        setContent(data.blog?.content);
        setBlogValues((prevState) => ({
          ...prevState,
          topic: data.blog?.topic,
          blogAvatar: data.blog?.blogAvatar,
        }));
      } catch (err) {
        enqueueSnackbar("Error", { variant: "error" });
      }
    };
    getBlog();
    // eslint-disable-next-line
  }, []);
  const handlePostBlog = async (ev) => {
    try {
      ev.preventDefault();
      await axios.put(`/api/admin/blog/${params.blogId}`, {
        ...blogValues,
        content,
      });
      enqueueSnackbar("Blog Updated", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Error", { variant: "error" });
    }
  };
  return (
    <AdminLayout>
      <h1>Post</h1>
      <form onSubmit={handlePostBlog}>
        <Paper>
          <div className={classes.postContainer}>
            <TextField
              type="text"
              placeholder="Topic"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange}
              id="topic"
              value={blogValues.topic}
            />
            <TextField
              type="text"
              placeholder="Blog Avatar URL"
              variant="outlined"
              fullWidth
              id="blogAvatar"
              onChange={handleChange}
              value={blogValues.blogAvatar}
              required
            />

            <JoditEditor
              config={config}
              value={content}
              // onBlur={(newContent) => setContent(newContent)}
              tabIndex={1} // tabIndex of textarea
              onChange={(newContent) => {
                setContent(newContent);
              }}
            />
            <div>
              <Button
                type="submit"
                variant="contained"
                style={{ background: "#3D506E", color: "white" }}
              >
                Update Blog
              </Button>
            </div>
          </div>{" "}
        </Paper>
      </form>
    </AdminLayout>
  );
}
