import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
export default function DashboardCard(props) {
  return (
    <Paper style={{ padding: 20 }}>
      <Grid container justifyContent="space-between">
        <Grid item>{props.icon}</Grid>
        <Grid item>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.title}
          </Typography>
          <Typography variant="h5" color="primary">
            {props.value}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
