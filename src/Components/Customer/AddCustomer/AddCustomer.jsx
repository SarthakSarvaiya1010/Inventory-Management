import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField, DialogContent, Container } from "@mui/material";
import Header from "../../../Helpers/Header/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { CustomerEditAction } from "../../../Store/Action/CustomerAction/index";

import UseForm from "../../EditForm/UseForm";

function AddCustomer() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;

  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const CustomerEditData = useSelector((state) => state?.CustomerEdit);
  const Customer_data = CustomerEditData.customerEdit[0];

  console.log(
    "params",
    id,
    // CustomerEditData.customerEdit,
    Customer_data,
    Customer_data?.customer_name,
    CustomerEditData.loder
  );
  // const [values, setvalues] = useState(null);

  const { customerhandleSubmit, values, errors, handleOnchange } =
    UseForm(Customer_data);

  console.log(values);

  const handleCancle = () => {
    navigate("/customerList");
  };
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  useEffect(() => {
    if (id) {
      dispatch(
        CustomerEditAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
          id
        )
      );
    }
  }, [
    accessToken?.accessToken,
    dispatch,
    id,
    successLoginData?.LoginData?.accessToken,
  ]);
  return (
    <div>
      {!CustomerEditData.loder || !id ? (
        <Container fixed>
          <Header name={"Add Customer"} SearchBar={false} />
          <Container fixed sx={{ backgroundColor: "#EAEFF2" }}>
            <DialogContent>
              <br />
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "50ch" },
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
                    defaultValue={id ? Customer_data?.customer_name : ""}
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
                    defaultValue={id ? Customer_data?.address : ""}
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
                    defaultValue={id ? Customer_data?.tin_no : ""}
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
                    defaultValue={id ? Customer_data?.mobile_no : ""}
                  />
                  <p style={{ color: "red" }}>{errors?.mobile_no}</p>
                  <TextField
                    name="email"
                    id="outlined-Email"
                    label="Email id"
                    autoComplete="off"
                    onChange={(e) => handleOnchange(e)}
                    defaultValue={id ? Customer_data?.email : ""}
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
                {id ? (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={customerhandleSubmit}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={customerhandleSubmit}
                  >
                    Submit
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleCancle()}
                >
                  cancel
                </Button>
              </Stack>
              <br />
            </DialogContent>
          </Container>
        </Container>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddCustomer;
