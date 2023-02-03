import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import {
  TextField,
  DialogContent,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

import Header from "../../../Helpers/Header/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import UseForm from "../../EditForm/UseForm";
import { useDispatch, useSelector } from "react-redux";
import { TaxEditAction } from "../../../Store/Action/TaxAction/index";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTax() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const TaxData = useSelector((state) => state?.TaxData);
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const { id } = params;

  const Tax_data = TaxData?.TaxEdit;

  console.log(
    "params",
    id,
    TaxData?.TaxEdit,
    Tax_data?.tax_name,
    TaxData.loder
  );
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  const accessTokenData =
    successLoginData?.LoginData?.accessToken || accessToken?.accessToken;

  const showToastMessage = () => {
    toast.success("Data Updata  Success  !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    if (id) {
      dispatch(TaxEditAction(accessTokenData, id));
    }
  }, [accessTokenData, dispatch, id, successLoginData.LoginData.accessToken]);

  const { handleSubmit, values, errors, handleOnchange } = UseForm(
    Tax_data,
    showToastMessage
  );

  console.log(values);

  const handleCancle = () => {
    console.log("done");
    navigate("/TaxList");
  };

  return (
    <div>
      {!TaxData.loder || !id ? (
        // Object.keys(Product_data).length ? (
        <Container fixed>
          <Header name={"Add Tax"} SearchBar={false} />
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
                    name="tax_name"
                    id="outlined-Product"
                    label="Tax Name"
                    autoComplete="off"
                    defaultValue={id ? TaxData?.TaxEdit[0]?.tax_name : ""}
                    onChange={(e) => handleOnchange(e)}
                  />
                  <p style={{ color: "red" }}>{errors?.product_name}</p>
                  <br />
                  <TextField
                    error={errors?.weight ? true : null}
                    required
                    type="number"
                    name="tax_rate"
                    label="Tax Rate [ In % ]"
                    defaultValue={id ? TaxData?.TaxEdit[0]?.tax_rate : ""}
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.weight}
                    autoComplete="off"
                  />
                  <p style={{ color: "red" }}>{errors?.weight}</p>

                  <br />
                  <TextField
                    required
                    error={errors?.product_name ? true : null}
                    name="tax_country"
                    id="outlined-Product"
                    label="Tax County"
                    autoComplete="off"
                    defaultValue={id ? TaxData?.TaxEdit[0]?.tax_country : ""}
                    onChange={(e) => handleOnchange(e)}
                  />
                  <p style={{ color: "red" }}>{errors?.hsn}</p>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Active
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={id ? TaxData?.TaxEdit[0]?.isactive : "NO"}
                    >
                      <FormControlLabel
                        value="YES"
                        control={<Radio />}
                        label="YES"
                      />
                      <FormControlLabel
                        value="NO"
                        control={<Radio />}
                        label="NO"
                      />
                    </RadioGroup>
                  </FormControl>
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
            <ToastContainer />
          </Container>
        </Container>
      ) : (
        // ) : (
        //   <h1>done 1</h1>
        // )
        <Stack
          sx={{ color: "grey.500", height: "80vh" }}
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="success" size="5rem" />
        </Stack>
      )}
    </div>
  );
}

export default AddTax;
