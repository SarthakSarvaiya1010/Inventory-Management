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
  TableFooter,
  styled,
  CircularProgress,
  Dialog,
} from "@mui/material";
import Header from "../../../Helpers/Header/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { GetpurchaseAddPageAction } from "../../../Redux/PurchaseBillRedux/PurchaseBillThank";

import {
  UpdatePurchaseData,
  GetPurchaseEditDataAction,
} from "../../../Redux/PurchaseBillRedux/PurchaseBillThank";
// import { InvoiceValidate } from "../../Invoice/InvoiceFormValidation";
import { convert } from "../../../Helpers/misc";
import { ToWords } from "to-words";
import { Transition } from "../../../Helpers/BootstrapButton/BootstrapButton";
import QuickAddCustomer from "../../Customer/QuickAddCustomer/QuickAddCustomer";
import { useParams } from "react-router";
import { PurcharsEditValidate } from "../../Invoice/InvoiceFormValidation";

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
function EditPurchaseBill(props) {
  const { testData, EditInvoiceSucessMessage } = props;

  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const toWords = new ToWords();

  const PurchasePageData = useSelector((state) => state?.PurchaseData);

  const [CustomerListData, setCustomerListData] = useState();
  const [dateData, setDateData] = useState();
  const [addtable, setAddTable] = useState();
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(null);
  const [discount, setDiscount] = useState();
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [Payment, setPayment] = useState();
  const handleClose = () => {
    setOpen(false);
  };

  const [findErrors, setFindErrors] = useState(false);

  if (EditInvoiceSucessMessage && disabled) {
    setDisabled(false);
    setProduct([]);
    setCustomerListData(null);
  }

  let totalAmount = 0;
  let totalweight = 0;
  let totalrate = 0;
  product?.forEach((sum, index) => {
    totalAmount += sum.amount;
    totalweight += sum.weight ? parseFloat(sum.weight) : 0;
    totalrate += sum.rate ? parseFloat(sum.rate) : 0;
  });
  let SGST = ((1.5 / 100) * totalAmount).toFixed(2);
  let CGST = ((1.5 / 100) * totalAmount).toFixed(2);
  const Bill_Amount =
    totalAmount && SGST && CGST
      ? totalAmount +
        parseFloat(SGST) +
        parseFloat(CGST) -
        (discount ? discount : 0)
      : 0;
  const handleChangeProduct = (name, value) => {
    let nameIndex = name.split(" ", 2);
    let index = parseInt(nameIndex[1]) - 1;
    let fieldName = nameIndex[0];
    let existingweight = product.filter((ans) => ans?.weight);
    let existingrate = product.filter((ans) => ans?.rate);
    let existingProduct = product.filter((ans) => ans?.product_id);
    let existingquantity = product.filter((ans) => ans?.quantity);
    let hsn_data;
    let unit_data;
    if (fieldName === "product_id") {
      let hsn_data_1 =
        PurchasePageData?.GetPurchasePagData[0]?.productList.filter(
          (e) => e?.product_id === value
        );
      let unit_data_1 =
        PurchasePageData?.GetPurchasePagData[0]?.productList.filter(
          (e) => e?.product_id === value
        );
      hsn_data = hsn_data_1[0]?.hsn;
      unit_data = unit_data_1[0]?.unit;
    }
    if (existingweight.length > 0 && fieldName === "weight") {
      existingweight.forEach((f) => {
        product[index].product_id = product[index]?.product_id;
        product[index].quantity = product[index]?.quantity;
        product[index].hsn = product[index]?.hsn;
        product[index].weight = value;
        product[index].rate = product[index]?.rate;
        product[index].amount =
          value && product[index]?.rate
            ? parseFloat(value) *
              parseFloat(product[index]?.rate) *
              parseFloat(product[index]?.quantity)
            : parseFloat(value) *
              parseFloat(product[index]?.rate) *
              parseFloat(product[index]?.quantity);
      });
      setProduct([...product]);
    } else {
      if (existingrate.length > 0 && fieldName === "rate") {
        existingrate.forEach((f) => {
          product[index].product_id = product[index]?.product_id;
          product[index].quantity = product[index]?.quantity;
          product[index].hsn = product[index]?.hsn;
          product[index].weight = product[index]?.weight;
          product[index].rate = value;
          product[index].amount =
            value && product[index]?.weight
              ? parseFloat(product[index]?.weight) *
                parseFloat(value) *
                parseFloat(product[index]?.quantity)
              : parseFloat(product[index]?.weight) *
                parseFloat(value) *
                parseFloat(product[index]?.quantity);
        });
        setProduct([...product]);
      } else {
        if (existingProduct.length > index && fieldName === "product_id") {
          existingProduct.forEach((f) => {
            product[index].product_id = value;
            product[index].hsn = hsn_data;
            product[index].quantity = product[index]?.quantity;
            product[index].unit = unit_data;
            product[index].weight = product[index]?.weight;
            product[index].rate = product[index]?.rate;
          });
          setProduct([...product]);
        } else {
          if (existingquantity.length > 0 && fieldName === "quantity") {
            existingquantity.forEach((f) => {
              product[index].product_id = product[index]?.product_id;
              product[index].hsn = product[index]?.hsn;
              product[index].weight = product[index]?.weight;
              product[index].rate = product[index]?.rate;
              product[index].quantity = value;
              product[index].amount =
                value && product[index]?.quantity
                  ? parseFloat(product[index]?.weight) *
                    parseFloat(value) *
                    parseFloat(product[index]?.rate)
                  : parseFloat(product[index]?.weight) *
                    parseFloat(value) *
                    parseFloat(product[index]?.rate);
            });
            setProduct([...product]);
          } else {
            if (addtable > 1) {
              setProduct([
                ...product,
                {
                  product_id: product[index]?.product_id,
                  hsn: product[index]?.hsn || hsn_data,
                  unit: product[index]?.unit || unit_data,
                  weight: product[index]?.weight,
                  rate: product[index]?.rate,
                  quantity: product[index]?.quantity || 0,
                  amount:
                    product[index]?.weight && product[index]?.rate
                      ? parseFloat(product[index]?.weight) *
                        parseFloat(product[index]?.rate) *
                        parseFloat(product[index]?.quantity)
                      : 0,
                  [fieldName]: value,
                },
              ]);
            } else {
              setProduct([
                {
                  product_id: product[0]?.product_id || 0,
                  hsn: product[0]?.hsn || hsn_data || 0,
                  unit: product[0]?.unit || unit_data || 0,
                  weight: product[0]?.weight || 0,
                  rate: product[0]?.rate || 0,
                  quantity: product[0]?.quantity || 0,
                  amount:
                    product[0]?.weight &&
                    product[0]?.rate &&
                    product[0]?.quantity
                      ? parseFloat(product[0]?.weight) *
                        parseFloat(product[0]?.rate) *
                        parseFloat(product[0]?.quantity)
                      : product[0]?.weight &&
                        product[0]?.rate &&
                        fieldName === "quantity"
                      ? parseFloat(product[0]?.weight) *
                        parseFloat(product[0]?.rate) *
                        value
                      : product[0]?.weight &&
                        product[0]?.quantity &&
                        fieldName === "rate"
                      ? parseFloat(product[0]?.weight) *
                        parseFloat(product[0]?.quantity) *
                        value
                      : product[0]?.rate &&
                        product[0]?.quantity &&
                        fieldName === "weight"
                      ? parseFloat(product[0]?.quantity) *
                        parseFloat(product[0]?.rate) *
                        value
                      : 0,
                  [fieldName]: value,
                },
              ]);
            }
          }
        }
      }
    }
  };

  // const { sx, ...other } = props;

  const handleDelete = (index) => {
    setAddTable((prev) => prev - 1);
    product.splice(index, 1);
  };
  useEffect(() => {
    dispatch(GetpurchaseAddPageAction());
    dispatch(GetPurchaseEditDataAction(id));
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
  const UpdatedData = {
    bill_no: testData?.bill_no,
    purchase_date: convert(dateData ? dateData : testData?.purchase_date),
    customer_id: CustomerListData
      ? CustomerListData?.customer_id
      : testData?.customer_id,
    taxable_amount: totalAmount
      ? parseFloat(totalAmount.toFixed(2))
      : testData?.taxable_amount,
    sgst: SGST ? parseFloat(SGST) : testData?.sgst,
    cgst: CGST ? parseFloat(CGST) : testData?.cgst,
    discount: parseFloat(discount) ? parseFloat(discount) : 0,
    bill_amount: Bill_Amount
      ? parseFloat(Bill_Amount.toFixed(2))
      : testData?.bill_amount,
    productdata: product,
    company_id: 1,
    payment: Payment,
  };
  const handleChangePayment = (name, value) => {
    setPayment(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleUpdate = () => {
    const invoice_id = testData?.purchase_id;
    setFindErrors(true);
    setErrors(PurcharsEditValidate(UpdatedData, addtable));
    window.scroll(0, 0);

    if (
      Object.keys(errors).length === 0 &&
      UpdatedData?.customer_id &&
      UpdatedData?.productdata?.length > 0
    ) {
      localStorage.setItem("purchaseId", invoice_id);

      dispatch(UpdatePurchaseData(UpdatedData));

      if (UpdatedData) {
        setDisabled(true);
      }
    }
  };
  useEffect(() => {
    setErrors(PurcharsEditValidate(UpdatedData, addtable));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findErrors, CustomerListData?.customer_id, product]);

  const handleChangeDate = (event) => {
    setDateData(event.$d);
  };
  useEffect(() => {
    if (
      testData?.productlistdata?.length &&
      testData?.productlistdata?.length !== addtable
    ) {
      setAddTable(testData?.productlistdata?.length);
      setProduct(testData?.productlistdata);
      setDiscount(testData?.discount);
      setPayment(testData?.payment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testData?.discount, testData?.productlistdata?.length]);

  return (
    <div>
      {testData?.productlistdata?.length && addtable ? (
        <Container>
          <Header name={"EditPurchaseBill"} SearchBar={false} />
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
                  Purchase Bill
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
                          disabled
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
                          value={CustomerListData?.address || null}
                          disabled
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
                          value={
                            CustomerListData?.tin_no === "" ||
                            !CustomerListData?.tin_no
                              ? ""
                              : CustomerListData?.tin_no
                          }
                          disabled
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
                          disabled
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
                        value={testData?.bill_no || testData[0]?.bill_no || 0}
                        sx={{ width: 1 }}
                        name="bill_no"
                        disabled
                      />
                      <br />
                      <TextField
                        id="standard-basic-3"
                        label="Deliver Note"
                        variant="standard"
                        value={testData?.bill_no || testData[0]?.bill_no || 0}
                        sx={{ width: 1 }}
                        name="challan_no"
                        disabled
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
                          disabled
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
                        disabled
                      />
                    </Stack>
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>SR NO</TableCell>
                          <TableCell>ITEM DESCIPTION</TableCell>
                          <TableCell>HSN</TableCell>
                          <TableCell>NET WEIGHT</TableCell>
                          <TableCell>RATE</TableCell>
                          <TableCell>Per</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>AMOUNT</TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                "& > :not(style)": {
                                  m: 2,
                                },
                              }}
                            >
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() => setAddTable((prev) => prev + 1)}
                                disabled={
                                  product[addtable - 1]?.product_id &&
                                  product[addtable - 1]?.rate &&
                                  product[addtable - 1]?.weight
                                    ? ""
                                    : true
                                }
                              >
                                <AddIcon />
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      {Array.from({ length: addtable }, (_, i, ind = i + 1) => {
                        return (
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
                                sx={{ width: "10px" }}
                              >
                                {ind}
                              </TableCell>
                              <TableCell>
                                <FormControl
                                  variant="standard"
                                  sx={{ width: 200 }}
                                >
                                  <InputLabel id="demo-simple-select-standard-label">
                                    Select Product
                                  </InputLabel>
                                  <Select
                                    error={
                                      !product[ind - 1]?.product_id
                                        ? errors?.product_id
                                          ? true
                                          : null
                                        : ""
                                    }
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    // value={
                                    //   product[ind - 1]?.product_id
                                    //     ? product[ind - 1]?.product_id
                                    //     : null
                                    // }
                                    defaultValue={
                                      testData?.productlistdata[ind - 1]
                                        ?.product_id
                                    }
                                    onChange={(e) =>
                                      handleChangeProduct(
                                        "product_id " + ind,
                                        e.target.value
                                      )
                                    }
                                    label="Select Product"
                                    disabled={
                                      testData?.productlistdata?.length >= ind
                                        ? true
                                        : false
                                    }
                                  >
                                    <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem>
                                    {PurchasePageData?.GetPurchasePagData[0]?.productList?.map(
                                      (e, index) => {
                                        return (
                                          <MenuItem
                                            value={e.product_id}
                                            key={index}
                                          >
                                            {e.product_name}
                                          </MenuItem>
                                        );
                                      }
                                    )}
                                  </Select>
                                  <p style={{ color: "red", margin: 0 }}>
                                    {!product[ind - 1]?.product_id
                                      ? errors?.product_id
                                      : ""}
                                  </p>
                                </FormControl>
                              </TableCell>
                              <TableCell>
                                <TextField
                                  id="standard-basic-5"
                                  label="Hsn"
                                  variant="standard"
                                  type="number"
                                  InputProps={{
                                    inputProps: { min: 0 },
                                  }}
                                  defaultValue={
                                    testData?.productlistdata[ind - 1]?.hsn || 0
                                  }
                                  value={
                                    product[ind - 1]?.hsn
                                      ? product[ind - 1]?.hsn
                                      : null
                                  }
                                  sx={{ width: 70 }}
                                  disabled={
                                    testData?.productlistdata?.length >= ind
                                      ? true
                                      : false
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  error={
                                    !product[ind - 1]?.weight
                                      ? errors?.weight
                                        ? true
                                        : null
                                      : ""
                                  }
                                  id="standard-basic-6"
                                  name={`weight ${ind}`}
                                  label="Weight"
                                  variant="standard"
                                  defaultValue={
                                    testData?.productlistdata[ind - 1]?.weight
                                  }
                                  type="number"
                                  InputProps={{
                                    inputProps: { min: 0 },
                                  }}
                                  value={product[ind - 1]?.weight}
                                  disabled={
                                    testData?.productlistdata?.length >= ind
                                      ? true
                                      : false
                                  }
                                  onChange={(e) =>
                                    handleChangeProduct(
                                      "weight " + ind,
                                      parseFloat(e.target.value)
                                    )
                                  }
                                  sx={{ width: 80 }}
                                />
                                <p style={{ color: "red", margin: 0 }}>
                                  {!product[ind - 1]?.weight
                                    ? errors?.weight
                                    : ""}
                                </p>
                              </TableCell>
                              <TableCell>
                                <TextField
                                  error={
                                    !product[ind - 1]?.rate
                                      ? errors?.rate
                                        ? true
                                        : null
                                      : ""
                                  }
                                  id="standard-basic-7"
                                  label="Rate"
                                  variant="standard"
                                  type="number"
                                  InputProps={{
                                    inputProps: { min: 0 },
                                  }}
                                  disabled={
                                    testData?.productlistdata?.length >= ind
                                      ? true
                                      : false
                                  }
                                  name={`rate ${ind}`}
                                  sx={{ width: 80 }}
                                  value={product[ind - 1]?.rate}
                                  defaultValue={
                                    testData?.productlistdata[ind - 1]?.rate
                                  }
                                  onChange={(e) =>
                                    handleChangeProduct(
                                      "rate " + ind,
                                      parseFloat(e.target.value)
                                    )
                                  }
                                />
                                <p style={{ color: "red", margin: 0 }}>
                                  {!product[ind - 1]?.rate ? errors?.rate : ""}
                                </p>
                              </TableCell>
                              <TableCell>
                                <TextField
                                  id="standard-basic-17"
                                  label="Per"
                                  variant="standard"
                                  disabled={
                                    testData?.productlistdata?.length >= ind
                                      ? true
                                      : false
                                  }
                                  name={`unit ${ind}`}
                                  sx={{ width: 70 }}
                                  value={
                                    product[ind - 1]?.unit
                                      ? product[ind - 1]?.unit
                                      : ""
                                  }
                                  defaultValue={
                                    testData?.productlistdata[ind - 1]?.unit
                                  }
                                />

                                <p style={{ color: "red", margin: 0 }}>
                                  {!product[ind - 1]?.unit ? errors?.unit : ""}
                                </p>
                              </TableCell>
                              <TableCell>
                                <TextField
                                  error={
                                    !product[ind - 1]?.rate
                                      ? errors?.rate
                                        ? true
                                        : null
                                      : ""
                                  }
                                  id="standard-basic-7"
                                  label="Quantity"
                                  variant="standard"
                                  type="number"
                                  disabled={
                                    testData?.productlistdata?.length >= ind
                                      ? true
                                      : false
                                  }
                                  InputProps={{
                                    inputProps: { min: 0 },
                                  }}
                                  name={`quantity ${ind}`}
                                  sx={{ width: 80 }}
                                  value={product[ind - 1]?.quantity}
                                  onChange={(e) =>
                                    handleChangeProduct(
                                      "quantity " + ind,
                                      parseFloat(e.target.value)
                                    )
                                  }
                                />
                                <p style={{ color: "red", margin: 0 }}>
                                  {!product[ind - 1]?.quantity
                                    ? errors?.quantity
                                    : ""}
                                </p>
                              </TableCell>
                              <TableCell colSpan={1}>
                                {product.length > ind - 1 ? (
                                  <TextField
                                    error={
                                      !product[ind - 1]?.amount
                                        ? errors?.amount
                                          ? true
                                          : null
                                        : ""
                                    }
                                    id="standard-basic-8"
                                    label="Amount"
                                    variant="standard"
                                    disabled={
                                      testData?.productlistdata?.length >= ind
                                        ? true
                                        : false
                                    }
                                    sx={{ width: 80 }}
                                    defaultValue={
                                      testData?.productlistdata[ind - 1]
                                        ?.amount || 0
                                    }
                                    value={
                                      product[ind - 1]?.amount === "NaN"
                                        ? 0
                                        : product[ind - 1]?.amount?.toFixed(2)
                                    }
                                  />
                                ) : (
                                  <TextField
                                    error={
                                      !product[ind - 1]?.amount
                                        ? errors?.amount
                                          ? true
                                          : null
                                        : ""
                                    }
                                    id="standard-basic-8"
                                    label="Amount"
                                    disabled={
                                      testData?.productlistdata?.length >= ind
                                        ? true
                                        : false
                                    }
                                    variant="standard"
                                    sx={{ width: 80, p: 0 }}
                                    defaultValue={
                                      testData?.productlistdata[ind - 1]
                                        ?.amount || 0
                                    }
                                    value={
                                      typeof product[ind - 1]?.amount !==
                                      "undefined"
                                        ? (product[ind - 1]?.amount).toFixed(2)
                                        : 0
                                    }
                                  />
                                )}
                                <p style={{ color: "red", margin: 0 }}>
                                  {!product[ind - 1]?.amount
                                    ? errors?.amount
                                    : ""}
                                </p>
                              </TableCell>
                              <TableCell>
                                {ind > testData?.productlistdata?.length ? (
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleDelete(i)}
                                    sx={{ ml: 2 }}
                                  >
                                    <ClearIcon />
                                  </Button>
                                ) : (
                                  ""
                                )}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        );
                      })}
                      <TableFooter>
                        <TableRow>
                          <TableCell colSpan={1} />
                          <TableCell colSpan={2}>
                            <Typography>Total:</Typography>
                          </TableCell>
                          <TableCell colSpan={1}>
                            <TextField
                              id="standard-basic-9"
                              label="Total weight"
                              variant="standard"
                              value={totalweight ? totalweight.toFixed(2) : 0}
                              sx={{ width: 80 }}
                            />
                          </TableCell>
                          <TableCell colSpan={1}>
                            <TextField
                              id="standard-basic-01"
                              label="Total rate"
                              variant="standard"
                              sx={{ width: 80 }}
                              value={totalrate ? totalrate.toFixed(2) : 0}
                            />
                          </TableCell>
                          <TableCell colSpan={1}></TableCell>
                          <TableCell colSpan={1}></TableCell>
                          <TableCell colSpan={1}>
                            <TextField
                              id="standard-basic-02"
                              label="Total Amount"
                              variant="standard"
                              defaultValue={0}
                              sx={{ width: 100 }}
                              value={totalAmount?.toFixed(2)}
                            />
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                    <Box sx={{ p: 2, m: 3 }}>
                      {/* <div className="TableOfData" style={{maxWidth:"100%", alignItems:"right"}}> */}
                      <Table aria-label="simple table">
                        <TableHead>
                          {/* <TableCell> */}
                          <TableRow>
                            <TableCell colSpan={4}></TableCell>
                            <TableCell colSpan={1}>TAXABLE AMOUNT</TableCell>
                            <TableCell colSpan={3}>
                              <TextField
                                id="standard-basic"
                                label="TaxableAmount"
                                variant="standard"
                                value={totalAmount.toFixed(2)}
                              />
                            </TableCell>
                          </TableRow>
                          {/* </TableCell> */}
                          <TableRow>
                            <TableCell colSpan={4}></TableCell>

                            <TableCell>SGST(1.50%)</TableCell>
                            <TableCell>
                              <TextField
                                id="standard-basic-03"
                                label="SGST"
                                variant="standard"
                                value={SGST}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={4}></TableCell>

                            <TableCell>CGST(1.50%)</TableCell>
                            <TableCell>
                              <TextField
                                id="standard-basic-04"
                                label="CGST"
                                variant="standard"
                                value={CGST}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={4}></TableCell>
                            <TableCell>DISCOUNT</TableCell>
                            <TableCell>
                              <TextField
                                id="standard-basic-05"
                                label="Discount"
                                variant="standard"
                                value={discount ? discount : 0}
                                onChange={(e) => setDiscount(e.target.value)}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={4}>
                              Rs IN WORDS :{" "}
                              {Bill_Amount
                                ? toWords.convert(Bill_Amount.toFixed(2))
                                : "Zero"}{" "}
                            </TableCell>

                            <TableCell>BILL AMOUNT</TableCell>
                            <TableCell>
                              <TextField
                                id="standard-basic-06"
                                label="Bill Amount"
                                variant="standard"
                                value={Bill_Amount ? Bill_Amount.toFixed(2) : 0}
                              />
                            </TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                      {/* </div> */}
                    </Box>
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
              <FormControl
                variant="standard"
                sx={{ width: 240, marginTop: 2, marginLeft: 4 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Payment
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  // sx={{ width: 200 }}
                  defaultValue={testData.payment}
                  onChange={(e) =>
                    handleChangePayment("payment", e.target.value)
                  }
                  label="Payment"
                >
                  <MenuItem value={1}>
                    <em>Yes</em>
                  </MenuItem>
                  <MenuItem value={0}>
                    <em>No</em>
                  </MenuItem>
                </Select>
              </FormControl>
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

export default EditPurchaseBill;
