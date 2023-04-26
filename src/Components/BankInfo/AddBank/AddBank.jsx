import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { TextField, DialogContent, Container } from "@mui/material";
import Header from "../../../Helpers/Header/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import {
  AddBankInfoAction,
  BankInfoEditAction,
  BankInfoEditDataAction,
} from "../../../Redux/BankInfoRedux/BankInfoThunk";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { BankValidate } from "../../EditForm/formValidation";

function AddBank() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [values, setvalues] = useState(null);
  const [errors, setErrors] = useState({});
  const [findErrors, setFindErrors] = useState(null);
  const BankInfoData = useSelector((state) => state?.BankInfoData);
  const BankInfoDataEdit = BankInfoData?.BankInfoEdit;
  const { id } = params;
  console.log("errors*&(", errors);
  useEffect(() => {
    if (id) {
      dispatch(BankInfoEditAction(id));
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
  useEffect(() => {
    if (findErrors === "BankInfo") {
      setErrors(BankValidate(values));
    }
  }, [findErrors, values]);

  const producthandleSubmit = () => {
    setErrors(BankValidate(values));
    setFindErrors("BankInfo");
    if (Object.keys(errors).length === 0) {
      dispatch(AddBankInfoAction(values));
    }
  };

  useEffect(() => {
    if (BankInfoDataEdit?.bank_name) {
      setvalues(BankInfoDataEdit);
    }
  }, [BankInfoDataEdit]);

  const producthandleUpdate = () => {
    setErrors(BankValidate(values));
    setFindErrors("BankInfo");
    let data = {
      bank_name: values?.bank_name,
      balance: values?.balance,
      primary_bank: values?.primary_bank,
    };
    if (Object.keys(errors).length === 0) {
      localStorage.setItem("bank_id", id);
      dispatch(BankInfoEditDataAction(data));
    }
  };

  const handleCancle = () => {
    navigate("/bank_info");
  };

  return (
    <div>
      {!BankInfoData.isLoading || !id ? (
        Object.keys(BankInfoDataEdit).length || !id ? (
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
                      required
                      error={errors?.bank_name ? true : null}
                      id="outlined-Product"
                      label="Bank Name"
                      autoComplete="off"
                      defaultValue={id ? BankInfoDataEdit?.bank_name : null}
                      onChange={(e) => handleOnchange(e)}
                      value={values?.bank_name}
                    />
                    <p style={{ color: "red" }}>{errors?.bank_name}</p>
                    <br />
                    <TextField
                      required
                      name="balance"
                      type="number"
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                      error={errors?.balance ? true : null}
                      id="outlined-Product"
                      label="Balance"
                      autoComplete="off"
                      defaultValue={id ? BankInfoDataEdit?.balance : null}
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
                            defaultChecked={BankInfoDataEdit?.primary_bank}
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
                      onClick={producthandleUpdate}
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
        )
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
