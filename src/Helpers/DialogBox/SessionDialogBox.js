import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const { open, DialogText } = props;

  const navigate = useNavigate();
  const handleClose = () => {};
  const headalLogin = () => {
    window.localStorage.clear();
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 500);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{DialogText}</DialogTitle>

        <DialogActions>
          <Button onClick={headalLogin}>LogIn</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
