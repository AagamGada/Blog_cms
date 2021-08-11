import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { UserContext } from "../context/UserContext";
import { useSnackbar } from "notistack";
import axios from "../utils/axios";
export default function Register() {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { userState, userDispatch } = useContext(UserContext);
  const [registerValues, setRegisterValues] = useState({
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
  });

  const handleRegister = async (ev) => {
    ev.preventDefault();
    try {
      if (registerValues.password !== registerValues.repeatPassword) {
        return enqueueSnackbar("Password Doesn't match", { variant: "error" });
      }
      const { data } = await axios.post("/api/auth/register", registerValues);
      let accessToken = data.accessToken;
      localStorage.setItem("auth-token", accessToken);
      userDispatch({ type: "REGISTER_USER", payload: data.payload });
      enqueueSnackbar("Registered Successfully", { variant: "success" });
      setOpen(false);
    } catch (err) {
      userDispatch({ type: "USER_ERROR", payload: err.response.data.error });
      // userState.error?.forEach((data) => {
        enqueueSnackbar("error", { variant: "error" });
      // });
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChange = (ev) => {
    setRegisterValues((prev) => ({
      ...prev,
      [ev.target.id]: ev.target.value,
    }));
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Register
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleRegister}>
          <DialogTitle id="form-dialog-title">
            Register for a account.
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Register to write blogs!</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              required
              value={registerValues.name}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              value={registerValues.email}
              type="email"
              required
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              required
              value={registerValues.password}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              required
              id="repeatPassword"
              label="Repeat Password"
              value={registerValues.repeatPassword}
              type="password"
              onChange={handleChange}
              fullWidth
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
              Register
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
