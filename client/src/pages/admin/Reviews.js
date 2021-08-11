import React, { useEffect, useContext } from "react";
import axios from "../../utils/axios";
import MuiDataTable from "mui-datatables";
import { BlogContext } from "./../../context/BlogContext";
import { IconButton } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import AdminLayout from "../../components/admin/AdminLayout";
export default function Users() {
  const { blogState, blogDispatch } = useContext(BlogContext);
  async function getAllReviews() {
    try {
      const { data } = await axios.get("/api/admin/review");
      blogDispatch({ type: "REVIEWS_LOADED", payload: data.reviews });
    } catch (err) {
      blogDispatch({ type: "BLOG_ERROR", payload: "Internal Server Error" });
    }
  }
  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`/api/admin/review/${reviewId}`);
      getAllReviews();
    } catch (err) {
      blogDispatch({ type: "BLOG_ERROR", payload: "Internal Server Error" });
    }
  };
  useEffect(() => {
    getAllReviews();
    //eslint-disable-next-line
  }, []);

  const columns = [
    {
      name: "Author",
      options: {
        customBodyRenderLite: (dataIndex) => {
          return <p>{blogState.reviews[dataIndex].author.name}</p>;
        },
      },
    },

    { name: "_id", label: "Review Id" },
    {
      name: "Blog",
      options: {
        customBodyRenderLite: (dataIndex) => {
          return <p>{blogState.reviews[dataIndex].blog.topic}</p>;
        },
      },
    },

    { name: "content", label: "Content" },

    { name: "createdAt", label: "Created At" },
    {
      name: "Actions",
      options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <IconButton
              onClick={() => {
                handleDeleteReview(blogState.reviews[dataIndex]._id);
              }}
            >
              <DeleteForever />
            </IconButton>
          );
        },
      },
    },
  ];
  return (
    <AdminLayout>
      {/* <h1>Users</h1> */}
      {blogState.reviews && (
        <MuiDataTable
          title={"List of Reviews"}
          columns={columns}
          data={blogState.reviews}
        />
      )}
    </AdminLayout>
  );
}
