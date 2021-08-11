import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Container, Menu, MenuItem } from "@material-ui/core";
import Login from "./Login";
import Register from "./Register";
import { UserContext } from "../context/UserContext";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    background: "#fff",
    color: "black",
    boxShadow: "0 4px 12px 0 rgb(0 0 0 /5%)",
  },
  toolbar: {
    padding: 0,
    gap: 8,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const history = useHistory();
  const { userState, userDispatch } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              THS Blog
            </Typography>
            {userState.authenticated ? (
              <>
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        history.push("/");
                        userDispatch({ type: "LOGOUT_USER" });
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
                {userState.isAdmin ? (
                  <IconButton
                    onClick={() => {
                      history.push("/admin/dashboard");
                    }}
                  >
                    <DashboardIcon />
                  </IconButton>
                ) : (
                  ""
                )}
                <div> {userState.user.name}</div>
              </>
            ) : (
              <>
                <Login />
                <Register />
              </>
            )}
          </Toolbar>{" "}
        </Container>
      </AppBar>
    </div>
  );
}
