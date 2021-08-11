import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "../utils/axios";
import { UserContext } from "../context/UserContext";
import { useSnackbar } from "notistack";
export default function Login() {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { userDispatch } = useContext(UserContext);
  const [loginValues, setloginValues] = useState({
    email: "",
    password: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (ev) => {
    setloginValues((prev) => ({
      ...prev,
      [ev.target.id]: ev.target.value,
    }));
  };
  const handleLogin = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/login", loginValues);
      userDispatch({ type: "LOGIN_USER", payload: data.payload });
      console.log(data)
      let accessToken = data.accessToken;
      localStorage.setItem("auth-token", accessToken);
      enqueueSnackbar("Logged in Successfully", { variant: "success" });
      setOpen(false);
    } catch (err) {
      userDispatch({ type: "USER_ERROR", payload: err.response.data.msg });
      enqueueSnackbar(err.response.data.msg, { variant: "error" });
      console.log(err);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleLogin}>
          <DialogTitle id="form-dialog-title">LOGIN</DialogTitle>
          <DialogContent>
            <DialogContentText>Login with your credentials</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              value={loginValues.email}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password..."
              type="password"
              fullWidth
              onChange={handleChange}
              value={loginValues.password}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ background: "#388e3c" }}
            >
              Login
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
