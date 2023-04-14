import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { TextField, DialogContent, Container } from "@mui/material";
import Header from "../../../Helpers/Header/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { ProductEditAction } from "../../../Redux/ProductRedux/ProductThunk";
import CircularProgress from "@mui/material/CircularProgress";
import { AddBankInfoAction } from "../../../Redux/BankInfoRedux/BankInfoThunk";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function AddBank() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [values, setvalues] = useState(null);
  const [errors, setErrors] = useState({});
  const ProductEditData = useSelector((state) => state?.ProductList);
  const BankInfoData = useSelector((state) => state?.BankInfoData);
  const { id } = params;
  console.log("BankInfoData", BankInfoData);

  const BankInfoDataEdit = BankInfoData?.BankInfoList[0];

  useEffect(() => {
    if (id) {
      dispatch(ProductEditAction(id));
    }
  }, [dispatch, id]);

  const handleOnchange = useCallback(
    (e) =>
      setvalues((values) => {
        if (e.target.name === "primary_bank") {
          const newValues = {
            ...values,
            [e.target.name]: e.target.checked,
          };
          return newValues;
        } else {
          const newValues = {
            ...values,
            [e.target.name]: e.target.value,
          };
          return newValues;
        }
      }),
    []
  );

  console.log("values()&(*&", values);
  const producthandleSubmit = () => {
    dispatch(AddBankInfoAction(values));
    setErrors({});
  };

  const handleCancle = () => {
    navigate("/bank_info");
  };

  return (
    <div>
      {!ProductEditData.isLoading || !id ? (
        // Object.keys(Product_data).length ? (
        <Container fixed>
          <Header name={id ? "Edit Bank" : "Add Bank"} SearchBar={false} />
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
                    name="bank_name"
                    // {...register("product_name")}
                    error={errors?.bank_name ? true : null}
                    id="outlined-Product"
                    label="Bank Name"
                    autoComplete="off"
                    defaultValue={id ? BankInfoDataEdit?.bank_name : ""}
                    onChange={(e) => handleOnchange(e)}
                  />
                  <p style={{ color: "red" }}>{errors?.bank_name}</p>
                  <br />
                  <TextField
                    name="balance"
                    type="number"
                    error={errors?.bank_name ? true : null}
                    id="outlined-Product"
                    label="Balance"
                    autoComplete="off"
                    defaultValue={id ? BankInfoDataEdit?.balance : ""}
                    onChange={(e) => handleOnchange(e)}
                  />
                  <p style={{ color: "red" }}>{errors?.balance}</p>
                  <br />

                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => handleOnchange(e)}
                          name="primary_bank"
                        />
                      }
                      label="Primary Bank"
                    />
                  </FormGroup>
                </Stack>
              </Box>
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
                    onClick={producthandleSubmit}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={producthandleSubmit}
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

export default AddBank;
