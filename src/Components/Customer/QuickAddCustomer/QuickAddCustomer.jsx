import React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  TextField,
  DialogContent,
  Container,
  Stack,
} from "@mui/material";
import UseForm from "../../EditForm/UseForm";

function QuickAddCustomer(props) {
  const { setOpen } = props;

  const { customerhandleSubmit, values, errors, handleOnchange } = UseForm([]);

  return (
    <div>
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
              <p style={{ color: "red" }}>{errors?.customer_name}</p>
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
              <p style={{ color: "red" }}>{errors?.address}</p>
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
                name="mobile_no"
                label="Mobile No"
                variant="outlined"
                onChange={(e) => handleOnchange(e)}
                value={values?.hsn}
                autoComplete="off"
              />
              <p style={{ color: "red" }}>{errors?.mobile_no}</p>
              <br />
              <TextField
                name="email"
                required
                id="outlined-Email"
                label="Email id"
                autoComplete="off"
                onChange={(e) => handleOnchange(e)}
              />
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
