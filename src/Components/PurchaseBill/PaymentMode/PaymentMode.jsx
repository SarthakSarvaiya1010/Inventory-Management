/* eslint-disable no-self-assign */
import React, { useEffect, useState } from "react";
import {
  TextField,
  Container,
  Stack,
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  styled,
  CircularProgress,
  Dialog,
} from "@mui/material";
import Header from "../../../Helpers/Header/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { GetpurchaseAddPageAction } from "../../../Redux/PurchaseBillRedux/PurchaseBillThank";
import { GetPurchaseEditDataAction } from "../../../Redux/PurchaseBillRedux/PurchaseBillThank";

import { Transition } from "../../../Helpers/BootstrapButton/BootstrapButton";
import QuickAddCustomer from "../../Customer/QuickAddCustomer/QuickAddCustomer";
import { useParams } from "react-router";
import {
  AddBankInfoAction,
  BankInfoBypurchase_idAction,
} from "../../../Redux/BankRedux/BankThunk";
import { BankInfoListAction } from "../../../Redux/BankInfoRedux/BankInfoThunk";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2.5),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));
const commonStyles = {
  p: 2,
  border: 1,
};

function PaymentMode(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const PurchasePageData = useSelector((state) => state?.PurchaseData);
  const PurchaseData = useSelector((state) => state?.PurchaseData);
  const BankData = useSelector((state) => state?.BankData);
  const BankInfoData = useSelector((state) => state?.BankInfoData);

  console.log("BankInfoData)&&-0", BankData);

  //   const invoivepagedata = JSON.parse(
  //     localStorage.getItem("InvoiceEditPageData")
  //   );

  const testData = PurchaseData?.PurchaseEdit?.length
    ? PurchaseData?.PurchaseEdit[0]
    : [{}];

  const [CustomerListData, setCustomerListData] = useState();
  const [dateData, setDateData] = useState();

  const [open, setOpen] = useState(null);

  const [errors, setErrors] = useState({});
  const [Payment, setPayment] = useState({});
  const [showchaque, setShowchaque] = useState(false);
  const [showAmout, setShowAmout] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeProduct = (name, value) => {
    console.log("name", name, value);
    setPayment({ ...Payment, [name]: value });
    if (value === "chaque") {
      setShowchaque(true);
    }
    if (value === "cash") {
      setShowchaque(false);
    }
    if (value === "partial") {
      setShowAmout(true);
    }
    if (value === "full") {
      setShowAmout(false);
    }
  };

  // const { sx, ...other } = props;

  useEffect(() => {
    dispatch(GetpurchaseAddPageAction());
    dispatch(GetPurchaseEditDataAction(id));
    dispatch(BankInfoBypurchase_idAction(id));
    dispatch(BankInfoListAction());
  }, [dispatch, id]);

  useEffect(() => {
    if (PurchasePageData?.GetPurchasePagData.length) {
      localStorage.setItem(
        "InvoiceAddPageData",
        JSON.stringify(PurchasePageData?.GetPurchasePagData)
      );
    }
  }, [PurchasePageData?.GetPurchasePagData]);

  const handleChange = (event) => {
    const data = PurchasePageData?.GetPurchasePagData[0]?.CustomerList?.find(
      (e) => e.customer_id === event.target.value
    );
    setCustomerListData(data);
  };

  const handleUpdate = () => {
    let data = {
      bank_name: Payment?.bank_name,
      chaque_no: Payment?.chaque_no,
      fullpayment: Payment?.partial_full_payment === "full" ? 1 : 0,
      purchase_id: testData?.purchase_id,
      totalamout: parseInt(testData?.bill_amount),
      paidamount:
        Payment?.partial_full_payment === "full"
          ? BankData?.BankInfoBypurchase_id?.remainingamount
            ? parseInt(BankData?.BankInfoBypurchase_id?.remainingamount)
            : parseInt(testData?.bill_amount)
          : Payment?.amout,
      remainingamount: BankData?.BankInfoBypurchase_id?.remainingamount
        ? parseInt(BankData?.BankInfoBypurchase_id?.remainingamount) -
          (Payment?.amout || BankData?.BankInfoBypurchase_id?.remainingamount)
        : parseInt(testData?.bill_amount) -
          parseInt(
            Payment?.amout ||
              BankData?.BankInfoBypurchase_id?.remainingamount ||
              testData?.bill_amount
          ),
    };
    console.log("data()&*&_)&", data);

    if (showchaque) {
      if (Payment?.chaque_no) {
        if (showAmout) {
          if (Payment?.amout) {
            dispatch(AddBankInfoAction(data));
          } else {
            setErrors({ amout: "eneter amout" });
          }
        } else {
          dispatch(AddBankInfoAction(data));
        }
      } else {
        setErrors({ chaque_no: "eneter chaque no" });
      }
    } else if (showAmout) {
      if (Payment?.amout) {
        if (showchaque) {
          if (Payment?.chaque_no) {
            dispatch(AddBankInfoAction(data));
          } else {
            setErrors({ chaque_no: "eneter chaque no" });
          }
        } else {
          dispatch(AddBankInfoAction(data));
        }
      } else {
        setErrors({ amout: "eneter amout" });
      }
    } else if (!Payment?.bank_name) {
      setErrors({ bank_name: "please select" });
    } else if (!Payment?.partial_full_payment) {
      setErrors({ payment_full: "please select" });
    } else if (!Payment?.payment_mode) {
      setErrors({ payment: "please select" });
    } else {
      dispatch(AddBankInfoAction(data));
    }
  };

  const handleChangeDate = (event) => {
    console.log(event.$d);
    setDateData(event.$d);
  };
  console.log("BankData", BankData.BankInfoBypurchase_id?.paidamount);
  return (
    <div>
      {testData?.productlistdata?.length && !BankData?.isLoading ? (
        <Container>
          <Header name={"Payment Mode"} SearchBar={false} />
          <Container sx={{ backgroundColor: "#EAEFF2", p: 2 }}>
            <Box
              sx={{
                ...commonStyles,
                borderColor: "grey.400",
                textAlign: "right",
                borderRadius: "10px",
                flexWrap: "wrap",
                display: "flex",
              }}
            >
              <Box sx={{ textAlign: "center", width: "100%" }}>
                <Typography
                  sx={{ color: "#008080", fontWeight: "bold", fontSize: 17 }}
                >
                  Payment Mode
                </Typography>
              </Box>

              <Box sx={{ textAlign: "left", width: "50%" }}>
                <Typography>Buyer</Typography>
                <Typography sx={{ fontWeight: "bold", m: 1 }}>
                  SILVER PLACE
                </Typography>
                <Typography>Nikol , Ahmedabad</Typography>

                <Typography
                  sx={{ color: "#008080", fontWeight: "bold", fontSize: 14 }}
                >
                  Phone: 9727434537
                </Typography>
                <Typography
                  sx={{ color: "#008080", fontWeight: "bold", fontSize: 14 }}
                >
                  Mobile: 9727434537
                </Typography>
              </Box>

              <Box sx={{ width: "50%" }}>
                <Typography>Seller</Typography>
                <Typography sx={{ fontWeight: "bold", m: 1 }}>
                  SILVER PLACE
                </Typography>
                <Typography>Nikol , Ahmedabad</Typography>

                <Typography
                  sx={{ color: "#008080", fontWeight: "bold", fontSize: 14 }}
                >
                  Phone: 9727434537
                </Typography>
                <Typography
                  sx={{ color: "#008080", fontWeight: "bold", fontSize: 14 }}
                >
                  Mobile: 9727434537
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: "100%", mt: 2 }}>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Item>
                    <Stack>
                      <br />
                      <FormControl variant="standard" sx={{ width: 1 }}>
                        <InputLabel id="demo-simple-select-standard-label">
                          Mobile no
                        </InputLabel>
                        <br />
                        <Select
                          error={errors?.customer_id ? true : null}
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard-01"
                          onChange={(e) => handleChange(e)}
                          label="Mobile_no*"
                          name="customer_mobileNo"
                          defaultValue={testData?.customer_id}
                        >
                          <MenuItem value={null}>
                            <em>None</em>
                          </MenuItem>
                          {PurchasePageData?.GetPurchasePagData[0]?.CustomerList?.map(
                            (e, index) => {
                              return (
                                <MenuItem value={e.customer_id} key={index}>
                                  {e.mobile_no}
                                </MenuItem>
                              );
                            }
                          )}
                        </Select>
                        <p style={{ color: "red", margin: 0 }}>
                          {errors?.customer_id}
                        </p>
                        <br />
                        <TextField
                          error={errors?.customer_address ? true : null}
                          id="standard-basic"
                          label="Address"
                          variant="standard"
                          multiline
                          sx={{ width: 1 }}
                          defaultValue={testData?.customer_address}
                          value={CustomerListData?.address}
                        />
                        <br />
                        <p style={{ color: "red", margin: 0 }}>
                          {errors?.customer_address}
                        </p>
                        <br />
                        <TextField
                          id="standard-basic-12"
                          label="Customer Gst No"
                          variant="standard"
                          sx={{ width: 1 }}
                          // value={
                          //   CustomerListData?.tin_no === ""
                          //     ? ""
                          //     : CustomerListData?.tin_no
                          // }
                        />
                        <br />
                        <br />

                        <TextField
                          error={errors?.customer_name ? true : null}
                          id="standard-basic-2"
                          label="Name "
                          variant="standard"
                          defaultValue={testData?.customer_name}
                          value={CustomerListData?.customer_name}
                          sx={{ width: 1 }}
                          name="Customer_Name"
                          onChange={(e) => handleChange(e)}
                        />
                        <p style={{ color: "red", margin: 0 }}>
                          {errors?.customer_name}
                        </p>
                        <br />
                      </FormControl>
                    </Stack>
                  </Item>
                </Grid>

                <Grid item xs={6}>
                  <Item sx={{ pt: 5.5, pb: 4 }}>
                    <Stack spacing={2}>
                      <TextField
                        id="standard-basic-3"
                        label="Bill No"
                        variant="standard"
                        value={testData?.bill_no || 0}
                        sx={{ width: 1 }}
                        name="bill_no"
                        onChange={(e) => handleChange(e)}
                      />
                      <br />
                      <TextField
                        id="standard-basic-3"
                        label="Deliver Note"
                        variant="standard"
                        value={testData?.bill_no || 0}
                        sx={{ width: 1 }}
                        name="challan_no"
                        onChange={(e) => handleChange(e)}
                      />
                      <br />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date"
                          value={dateData}
                          defaultValue={testData?.purchase_date}
                          name="date"
                          onChange={(e) => handleChangeDate(e)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                      <br />
                      <TextField
                        id="standard-basic-4"
                        label="Gst_No"
                        variant="standard"
                        sx={{ width: 1 }}
                        name="Gst_No"
                        value={"24BWOPP9863M2ZF"}
                        // onChange={(e) => handleChange(e)}
                      />
                    </Stack>
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell> Amout</TableCell>
                          <TableCell>Remaining Amount</TableCell>
                          <TableCell>Paid Amount</TableCell>
                          <TableCell>Select Bank</TableCell>
                          <TableCell>Payment Mode</TableCell>
                          <TableCell>Partial/Full Payment</TableCell>
                          {showchaque ? <TableCell>Chaque No</TableCell> : null}
                          {showAmout ? <TableCell>AMOUNT</TableCell> : null}
                          <TableCell>Total AMOUNT</TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                "& > :not(style)": {
                                  m: 2,
                                },
                              }}
                            ></Box>
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        <TableRow
                          // key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ width: 150 }}
                          >
                            {testData?.bill_amount}
                          </TableCell>

                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              width: 200,
                            }}
                          >
                            {BankData?.BankInfoBypurchase_id?.remainingamount
                              ? BankData?.BankInfoBypurchase_id?.remainingamount
                              : BankData?.BankInfoBypurchase_id
                                  ?.remainingamount === 0
                              ? 0
                              : testData?.bill_amount}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              width: 200,
                            }}
                          >
                            {BankData?.BankInfoBypurchase_id?.paidamount || 0}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              width: 200,
                            }}
                          >
                            <FormControl variant="standard" sx={{ width: 150 }}>
                              <InputLabel id="demo-simple-select-standard-label">
                                Select Bank
                              </InputLabel>
                              <Select
                                error={errors?.bank_name ? true : null}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                onChange={(e) =>
                                  handleChangeProduct(
                                    "bank_name",
                                    e.target.value
                                  )
                                }
                                label="Select Bank"
                              >
                                <MenuItem value="">
                                  <em>non</em>
                                </MenuItem>
                                {BankInfoData?.BankInfoList?.map((e, index) => {
                                  return (
                                    <MenuItem value={e.bank_name} key={index}>
                                      {e.bank_name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                              <p style={{ color: "red", margin: 0 }}>
                                {errors?.bank_name}
                              </p>
                            </FormControl>
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              width: 200,
                            }}
                          >
                            <FormControl variant="standard" sx={{ width: 150 }}>
                              <InputLabel id="demo-simple-select-standard-label">
                                Payment Mode
                              </InputLabel>
                              <Select
                                error={errors?.payment ? true : null}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                onChange={(e) =>
                                  handleChangeProduct(
                                    "payment_mode",
                                    e.target.value
                                  )
                                }
                                label="Select Product"
                              >
                                <MenuItem value="cash">
                                  <em>Cash</em>
                                </MenuItem>
                                <MenuItem value="chaque">
                                  <em>Chaque</em>
                                </MenuItem>
                              </Select>
                              <p style={{ color: "red", margin: 0 }}>
                                {errors?.payment}
                              </p>
                            </FormControl>
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              width: 150,
                            }}
                          >
                            <FormControl variant="standard" sx={{ width: 200 }}>
                              <InputLabel id="demo-simple-select-standard-label">
                                Partial/Full Payment
                              </InputLabel>
                              <Select
                                error={errors?.payment_full ? true : null}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                onChange={(e) =>
                                  handleChangeProduct(
                                    "partial_full_payment",
                                    e.target.value
                                  )
                                }
                                label="Partial/Full Payment"
                              >
                                <MenuItem value="partial">
                                  <em>Partial Payment</em>
                                </MenuItem>
                                <MenuItem value="full">
                                  <em>Full Payment</em>
                                </MenuItem>
                              </Select>
                              <p style={{ color: "red", margin: 0 }}>
                                {errors?.payment_full}
                              </p>
                            </FormControl>
                          </TableCell>
                          {showchaque ? (
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{
                                width: 150,
                              }}
                            >
                              <TextField
                                error={errors?.chaque_no ? true : null}
                                id="standard-basic-7"
                                label="Chaque No"
                                variant="standard"
                                type="number"
                                name={`chaque_no`}
                                sx={{ width: 100 }}
                                value={Payment?.chaque_no}
                                onChange={(e) =>
                                  handleChangeProduct(
                                    "chaque_no",
                                    parseFloat(e.target.value)
                                  )
                                }
                              />
                            </TableCell>
                          ) : null}
                          {showAmout ? (
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{
                                width: 150,
                              }}
                            >
                              <TextField
                                error={errors?.amout ? true : null}
                                id="standard-basic-7"
                                label="Amout"
                                variant="standard"
                                type="number"
                                name={`amout`}
                                sx={{ width: 100 }}
                                value={Payment?.amout}
                                onChange={(e) =>
                                  handleChangeProduct(
                                    "amout",
                                    parseFloat(e.target.value)
                                  )
                                }
                              />
                            </TableCell>
                          ) : null}
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              width: 100,
                            }}
                          >
                            {Payment?.partial_full_payment === "full"
                              ? BankData?.BankInfoBypurchase_id?.remainingamount
                                ? BankData?.BankInfoBypurchase_id
                                    ?.remainingamount
                                : testData?.bill_amount
                              : Payment?.amout ||
                                BankData?.BankInfoBypurchase_id
                                  ?.remainingamount ||
                                testData?.bill_amount}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={7}>
                  <Item sx={{ p: 2, position: "relative" }}>
                    <Typography
                      sx={{
                        color: "#008080",
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
                    >
                      Terms And Conditions
                    </Typography>
                    <Box
                      component="ul"
                      aria-labelledby="category-a"
                      sx={{ pl: 2, pb: 5 }}
                    >
                      <li>
                        Payment will not be refunded once the bill is generated
                      </li>
                      <li>No gurantee will be given any 92.5 jewellery</li>
                      <li>Ahmedabad will be jurisdiction for any process</li>
                      <li>Apologies for mistakes</li>

                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: 14,
                          textAlign: "right",
                          bottom: 3,
                          position: "absolute",
                          left: 0,
                          width: "100%",
                          padding: "20px  20px 0  0",
                        }}
                      >
                        Customer Signature
                      </Typography>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={5}>
                  <Item
                    sx={{
                      height: 200,
                      position: "relative",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      spacing={2}
                      sx={{
                        color: "#008080",
                        fontWeight: "bold",
                        fontSize: 14,
                        textAlign: "center",
                      }}
                    >
                      For Silver Place
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: 14,
                        textAlign: "center",
                        bottom: 3,
                        position: "absolute",
                        left: 0,
                        width: "100%",
                        padding: "20px  0 0  0",
                      }}
                    >
                      Authorised Signatory
                    </Typography>
                  </Item>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="success"
                sx={{ marginTop: 4 }}
                onClick={() => handleUpdate()}
                // href="https://localhost:3200/Invoice/pdf"
              >
                Update
              </Button>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <QuickAddCustomer setOpen={setOpen} />
              </Dialog>
            </Box>
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

export default PaymentMode;
