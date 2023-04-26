import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  TextField,
  DialogContent,
  Container,
  Stack,
} from "@mui/material";
import UseForm from "../../EditForm/UseForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SanckBar from "../../../Helpers/SanckBar/SanckBar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
      snackMessage={"Wrong info"}
    />
  );
});

function QuickAddCustomer(props) {
  const { setOpen } = props;

  const { customerhandleSubmit, values, errors, handleOnchange } = UseForm([]);

  const CustomerData = useSelector((state) => state?.CustomerList);
  console.log("CustomerData)*(&", CustomerData.SucessMessage, errors);
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  useEffect(() => {
    if (CustomerData.SucessMessage.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/addinvoice");
        window.location.reload();
        setOpen(false);
      }, 2000);
    }
  }, [CustomerData.SucessMessage.statusCode, navigate, setOpen]);

  useEffect(() => {
    if (CustomerData?.ErrorMessage?.data?.statusCode === "400") {
      setState({ open: true, vertical: "top", horizontal: "center" });
    }
  }, [CustomerData?.ErrorMessage?.data?.statusCode]);
  return (
    <div>
      <SanckBar
        alertMessage={CustomerData?.SucessMessage?.message}
        alertErrorMessage={CustomerData?.ErrorMessage?.data?.message}
        state={state}
        setState={setState}
      />

      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        {CustomerData?.SucessMessage?.message ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {CustomerData?.SucessMessage?.message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {CustomerData?.ErrorMessage?.data?.message}
          </Alert>
        )}
      </Snackbar>
      <Container fixed sx={{ backgroundColor: "#EAEFF2" }}>
        <DialogContent>
          <br />
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                marginTop: 0,
                marginBottom: 0,
                width: "50ch",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <TextField
                required
                error={errors?.customer_name ? true : null}
                name="customer_name"
                id="outlined-Product"
                label="Customer Name"
                autoComplete="off"
                onChange={(e) => handleOnchange(e)}
              />
              <p style={{ color: "red", fontSize: 12 }}>
                {errors?.customer_name}
              </p>
              <br />
              <TextField
                required
                error={errors?.address ? true : null}
                id="outlined-Product"
                label="Customer Address"
                name="address"
                autoComplete="off"
                type="textarea"
                onChange={(e) => handleOnchange(e)}
              />
              <p style={{ color: "red", fontSize: 12 }}>{errors?.address}</p>
              <br />
              <TextField
                type="text"
                name="tin_no"
                label="customer Tin No"
                variant="outlined"
                onChange={(e) => handleOnchange(e)}
                value={values?.weight}
                autoComplete="off"
              />
              <br />
              <TextField
                error={errors?.mobile_no ? true : null}
                required
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                name="mobile_no"
                label="Mobile No"
                variant="outlined"
                onChange={(e) => handleOnchange(e)}
                value={values?.hsn}
                autoComplete="off"
              />
              <p style={{ color: "red", fontSize: 12 }}>{errors?.mobile_no}</p>
              <br />
              <TextField
                required
                error={errors?.email ? true : null}
                name="email"
                id="outlined-Email"
                label="Email id"
                autoComplete="off"
                onChange={(e) => handleOnchange(e)}
              />
              <p style={{ color: "red", fontSize: 12 }}>{errors?.email}</p>
            </Stack>
          </Box>
          <br />
          <br />
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Button
              variant="contained"
              color="success"
              onClick={customerhandleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpen(false)}
            >
              cancel
            </Button>
          </Stack>
        </DialogContent>
        {/* </Container> */}
      </Container>
    </div>
  );
}

export default QuickAddCustomer;
