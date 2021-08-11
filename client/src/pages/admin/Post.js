import React, { useEffect, useContext } from "react";
import axios from "../../utils/axios";
import MuiDataTable from "mui-datatables";
import { BlogContext } from "./../../context/BlogContext";
import { IconButton, Button, Grid, Typography } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
export default function Post() {
  const { blogState, blogDispatch } = useContext(BlogContext);
  const history = useHistory();
  async function getAllPosts() {
    try {
      const { data } = await axios.get("/api/admin/blog");
      blogDispatch({ type: "BLOGS_LOADED", payload: data });
    } catch (err) {
      blogDispatch({ type: "BLOG_ERROR", payload: "Internal Server Error" });
    }
  }
  const handleDeletePost = async (blogId) => {
    try {
      await axios.delete(`/api/admin/blog/${blogId}`);
      getAllPosts();
    } catch (err) {
      blogDispatch({ type: "BLOG_ERROR", payload: "Internal Server Error" });
    }
  };
  useEffect(() => {
    getAllPosts();
    //eslint-disable-next-line
  }, []);

  const columns = [
    {
      name: "blogAvatar",
      options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <img
              src={blogState.blogs[dataIndex].blogAvatar}
              alt={blogState.blogs[dataIndex].topic}
              width="100px"
              height="100px"
            />
          );
        },
      },
    },
    { name: "_id", label: "BlogId" },
    {
      name: "topic",
      label: "Topic",
    },

    { name: "createdAt", label: "Created At" },
    {
      name: "Actions",
      options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <>
              <IconButton
                onClick={() => {
                  handleDeletePost(blogState.blogs[dataIndex]._id);
                }}
              >
                <DeleteForever />
              </IconButton>
              <IconButton
                onClick={() => {
                  history.push(
                    `/admin/editPost/${blogState.blogs[dataIndex]._id}`
                  );
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  history.push(
                    `/admin/post/preview/${blogState.blogs[dataIndex]._id}`
                  );
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </>
          );
        },
      },
    },
  ];
  return (
    <AdminLayout>
      <Grid
        container
        justifyContent="space-between"
        style={{ padding: "20px 0" }}
      >
        <Grid item>
          <Typography variant="h5">POSTS</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              history.push("/admin/addPost");
            }}
            style={{ background: "#3D506E", color: "white" }}
          >
            Add Post
          </Button>
        </Grid>
      </Grid>
      {blogState.blogs && (
        <MuiDataTable
          title={"List of Posts"}
          columns={columns}
          data={blogState.blogs}
        />
      )}
    </AdminLayout>
  );
}
