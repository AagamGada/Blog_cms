import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminRoute from "./utils/AdminRoute";
import "./App.css";
import MainLanding from "./pages/MainLanding";
import MainBlog from "./pages/MainBlog";
import { UserProvider } from "./context/UserContext";
import { BlogProvider } from "./context/BlogContext";
import {
  Dashboard,
  Users,
  Post,
  AddPost,
  Reviews,
  EditPost,
  PostPreview,
} from "./pages/admin";

export default function App() {
  return (
    <Router>
      <UserProvider>
        <BlogProvider>
          <Switch>
            <Route exact path="/" component={MainLanding}></Route>
            <Route exact path="/blog/:blogId" component={MainBlog}></Route>
            <AdminRoute
              exact
              path="/admin/dashboard"
              component={Dashboard}
            ></AdminRoute>
            <AdminRoute exact path="/admin/post" component={Post}></AdminRoute>
            <AdminRoute
              exact
              path="/admin/users"
              component={Users}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/admin/addPost"
              component={AddPost}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/admin/editPost/:blogId"
              component={EditPost}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/admin/reviews"
              component={Reviews}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/admin/post/preview/:blogId"
              component={PostPreview}
            ></AdminRoute>
          </Switch>
        </BlogProvider>
      </UserProvider>
    </Router>
  );
}
