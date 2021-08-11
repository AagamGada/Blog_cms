import React, { useEffect, useState, useContext } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { UserContext } from "../../context/UserContext";
import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";
import axios from "../../utils/axios";
import StarsIcon from "@material-ui/icons/Stars";
import BookIcon from "@material-ui/icons/Book";
import AdbIcon from "@material-ui/icons/Adb";
import AdminBarChart from "../../components/admin/AdminBarChart";
import AdminPieChart from "../../components/admin/AdminPieChart";
import PeopleIcon from "@material-ui/icons/People";
import DashboardCard from "../../components/admin/DashboardCard";

const useStyles = makeStyles((theme) => ({
  chartsContainer: {
    marginTop: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));
export default function Dashboard() {
  const { userState } = useContext(UserContext);
  const classes = useStyles();
  const [metrics, setMetrics] = useState({
    users: null,
    reviews: null,
    blogs: null,
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getMetrics() {
      try {
        const [data1, data2, data3] = await Promise.all([
          axios.get("/api/admin/users"),
          axios.get("/api/admin/review"),
          axios.get("/api/admin/blog"),
        ]);
        setMetrics({
          users: data1.data.user,
          reviews: data2.data.reviews,
          blogs: data3.data,
        });
      } catch (err) {
        setError("Fetch failed");
      }
    }
    getMetrics();
  }, []);

  return (
    <AdminLayout>
      <Typography variant="h5" color="primary" style={{ paddingBottom: 20 }}>
        Welcome to Dashboard , {userState.user.name}
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={3} sm={6} xs={12}>
          <DashboardCard
            title="Users"
            icon={<PeopleIcon fontSize="large" />}
            value={metrics.users?.length}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <DashboardCard
            title="Reviews"
            icon={<StarsIcon fontSize="large" />}
            value={metrics.reviews?.length}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <DashboardCard
            title="Blogs"
            icon={<BookIcon fontSize="large" />}
            value={metrics.blogs?.length}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <DashboardCard
            title="Admin"
            icon={<AdbIcon fontSize="large" />}
            value={
              metrics.users?.filter((user) => user.role === "admin").length
            }
          />
        </Grid>
      </Grid>
      {/* charts*/}

      <Grid container className={classes.chartsContainer} spacing={3}>
        <Grid item md={9} lg={9} xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5" color="primary">
              Dashboard Metrics
            </Typography>
            <AdminBarChart data={metrics} />{" "}
          </Paper>
        </Grid>
        <Grid item md={3} lg={3} xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5" color="primary">
              User vs Admin
            </Typography>

            <AdminPieChart data={metrics} />
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
