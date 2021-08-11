import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { Paper, Container, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

export default function PostPreview() {
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();

  async function getBlog() {
    try {
      const { data } = await axios.get(`/api/blog/${params.blogId}`);
      setBlog(data.blog);
    } catch (err) {
      setError(err.response.data);
    }
  }

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <AdminLayout>
      <Container maxWidth="sm">
        <Paper style={{ height: "100vh", padding: 20 }}>
          <Typography variant="h5">{blog?.topic}</Typography>
          {ReactHtmlParser(blog?.content)}
        </Paper>
      </Container>
    </AdminLayout>
  );
}
