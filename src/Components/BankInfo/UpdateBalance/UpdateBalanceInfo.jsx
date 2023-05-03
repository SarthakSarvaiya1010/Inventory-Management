import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  TextField,
  DialogContent,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "../../../Helpers/Header/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import {
  BankInfoListAction,
  UpdateBalanceAction,
} from "../../../Redux/BankInfoRedux/BankInfoThunk";

function UpdateBalanceInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setvalues] = useState(null);
  const [errors, setErrors] = useState({});
  const BankInfoData = useSelector((state) => state?.BankInfoData);

  useEffect(() => {
    dispatch(BankInfoListAction());
  }, [dispatch]);

  const handleOnchange = useCallback(
    (e) =>
      setvalues((values) => {
        const newValues = {
          ...values,
          [e.target.name]: e.target.value,
        };
        return newValues;
      }),
    []
  );

  const producthandleUpdate = () => {
    let data = {
      bank_name: values?.bank_name || null,
      balance: values?.balance || null,
    };

    if (!data?.bank_name) {
      setErrors({ bank_name: "select bank name" });
    } else if (!data?.balance) {
      setErrors({ balance: "eneter amout" });
    } else {
      dispatch(UpdateBalanceAction(data));
      setErrors({});
    }
  };

  return (
    <div>
      {!BankInfoData.isLoading ? (
        <Container fixed>
          <Header name={"Update Bank Balance"} SearchBar={false} />
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
                  <FormControl variant="standard" sx={{ width: 450 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Bank Name
                    </InputLabel>
                    <Select
                      error={errors?.bank_name ? true : null}
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard-01"
                      onChange={(e) => handleOnchange(e)}
                      label="Bank Name"
                      name="bank_name"
                    >
                      <MenuItem value={null}>
                        <em>None</em>
                      </MenuItem>
                      {BankInfoData?.BankInfoList.map((e, index) => {
                        return (
                          <MenuItem value={e.bank_name} key={index}>
                            {e.bank_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <p style={{ color: "red" }}>{errors?.bank_name}</p>
                  <br />
                  <TextField
                    name="balance"
                    type="number"
                    error={errors?.balance ? true : null}
                    id="outlined-Product"
                    label="Balance"
                    autoComplete="off"
                    onChange={(e) => handleOnchange(e)}
                  />
                  <p style={{ color: "red" }}>{errors?.balance}</p>
                  <br />
                </Stack>
              </Box>
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
                  onClick={producthandleUpdate}
                >
                  Update
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    navigate("/bank_info");
                  }}
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

export default UpdateBalanceInfo;
