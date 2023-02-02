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
  const Product_data = CustomerEditData.customerEdit;

  console.log("params", id, CustomerEditData);
  // const [values, setvalues] = useState(null);

  const { handleSubmit, values, errors, handleOnchange } =
    UseForm(Product_data);

  console.log(values);

  const handleCancle = () => {
    console.log("done");
    navigate("/ProductList");
  };
  useEffect(() => {
    if (id) {
      dispatch(
        CustomerEditAction(successLoginData?.LoginData?.accessToken, id)
      );
    }
  }, [dispatch, id, successLoginData?.LoginData?.accessToken]);
  return (
    <div>
      {CustomerEditData.loder || !id ? (
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
                    error={errors?.product_name ? true : null}
                    name="customer_name"
                    id="outlined-Product"
                    label="Customer Name"
                    autoComplete="off"
                    defaultValue={
                      id ? CustomerEditData.customerEdit.product_name : ""
                    }
                    onChange={(e) => handleOnchange(e)}
                  />
                  <p style={{ color: "red" }}>{errors?.product_name}</p>
                  <br />
                  <TextField
                    required
                    id="outlined-Product"
                    label="Customer Address"
                    name="customer_address"
                    autoComplete="off"
                    type="textarea"
                    onChange={(e) => handleOnchange(e)}
                    defaultValue={
                      id ? CustomerEditData.customerEdit.product_name : ""
                    }
                  />
                  <br />
                  <TextField
                    error={errors?.weight ? true : null}
                    required
                    type="text"
                    name="customer_tin_no"
                    label="customer_tin_no"
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.weight}
                    autoComplete="off"
                    defaultValue={
                      id ? CustomerEditData.customerEdit.product_name : ""
                    }
                  />
                  <p style={{ color: "red" }}>{errors?.weight}</p>

                  <br />
                  <TextField
                    error={errors?.hsn ? true : null}
                    required
                    type="number"
                    name="mobile_no"
                    label="Mobile No"
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.hsn}
                    autoComplete="off"
                    defaultValue={
                      id ? CustomerEditData.customerEdit.product_name : ""
                    }
                  />
                  <p style={{ color: "red" }}>{errors?.hsn}</p>
                  <TextField
                    required
                    name="email_id"
                    id="outlined-Email"
                    label="Email id"
                    autoComplete="off"
                    onChange={(e) => handleOnchange(e.target.value)}
                    defaultValue={id ? Product_data.product_name : ""}
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
                    onClick={handleSubmit}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
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
