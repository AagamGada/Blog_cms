import React from "react";
import { Grid, makeStyles, Container } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(8),
    background: "#f9f9f9",
    padding: "4rem 0",
  },
  footerItem: {
    display: "flex",
    "& > div": {
      padding: "0 10px",
      [theme.breakpoints.down("sm")]: { padding: "4px 0px" },
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

  socialIcons: {
    fontSize: 24,
    "& > *": {
      marginLeft: 20,
    },
  },
}));
export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container justifyContent="space-between">
          <Grid item>
            <div className={classes.footerItem}>
              <div>Privacy Policy</div>
              <div>Terms and Condition</div>
              <div>Advertise with us</div>
              <div>License</div>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.socialIcons}>
              <FacebookIcon />
              <LinkedInIcon />
              <TwitterIcon />
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
