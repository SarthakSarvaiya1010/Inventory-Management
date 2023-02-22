/* eslint-disable no-self-assign */
import React, { useEffect, useState } from "react";
import {
  TextField,
  // DialogContent,
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "../../../Helpers/Header/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import {
  GetinvoiceAddPageAction,
  GetinvoiceEditDataAction,
} from "../../../Store/Action/InvoiceAction";
import { useParams } from "react-router";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));
const commonStyles = {
  p: 2,
  border: 1,
};
function InvoiceEdit() {
  const dispatch = useDispatch();
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  const invoivepagedata = JSON.parse(
    localStorage.getItem("InvoiceEditPageData")
  );
  const params = useParams();
  const { id } = params;
  console.log("idididid", id);
  useEffect(() => {
    dispatch(GetinvoiceEditDataAction(accessToken?.accessToken, id));
    dispatch(GetinvoiceAddPageAction(accessToken?.accessToken));
  }, [accessToken?.accessToken, dispatch, id]);

  const [CustomerListData, setCustomerListData] = useState();

  const [discount, setDiscount] = useState();

  const InvoicePageData = useSelector((state) => state?.InvoiceData);

  const testData = InvoicePageData?.invoiceEdit?.length
    ? InvoicePageData?.invoiceEdit
    : invoivepagedata
    ? invoivepagedata
    : [{}];
  const [addtable, setAddTable] = useState(
    testData[0]?.productlistdata?.length || 1
  );
  console.log("addtable", addtable);
  const [product, setProduct] = useState(testData[0]?.productlistdata || [{}]);
  console.log("testData======?", testData);

  const handleChangeProduct = (name, value) => {
    let nameIndex = name.split(" ", 2);
    let index = parseInt(nameIndex[1]) - 1;
    console.log("product", index);
    let fieldName = nameIndex[0];
    let existingweight = product.filter((ans) => ans?.weight);
    let existingrate = product.filter((ans) => ans?.rate);
    let existingProduct = product.filter((ans) => ans?.product_id);
    let hsn_data;

    if (fieldName === "product_id") {
      let hsn_data_1 =
        InvoicePageData?.GetInvoicePagData[0]?.productList.filter(
          (e) => e?.product_id === value
        );
      hsn_data = hsn_data_1[0]?.hsn;
    }

    if (existingweight.length > 0 && fieldName === "weight") {
      existingweight.forEach((f) => {
        product[index].product_id = product[index]?.product_id;
        product[index].hsn = product[index]?.hsn;
        product[index].weight = value;
        product[index].rate = product[index]?.rate;
        product[index].amount =
          value && product[index]?.rate
            ? parseFloat(value) * parseFloat(product[index]?.rate)
            : 0;
      });
      setProduct([...product]);
    } else {
      if (existingrate.length > 0 && fieldName === "rate") {
        existingrate.forEach((f) => {
          product[index].product_id = product[index]?.product_id;
          product[index].hsn = product[index]?.hsn;
          product[index].weight = product[index]?.weight;
          product[index].rate = value;
          product[index].amount =
            product[0]?.weight && value
              ? parseFloat(product[index]?.weight) * parseFloat(value)
              : 0;
        });
        setProduct([...product]);
      } else {
        if (
          existingProduct.length > addtable - 1 &&
          fieldName === "product_id"
        ) {
          existingrate.forEach((f) => {
            product[index].product_id = value;
            product[index].hsn = hsn_data;
            product[index].weight = product[index]?.weight;
            product[index].rate = product[index]?.rate;
          });
          setProduct([...product]);
        } else {
          if (addtable > 1) {
            setProduct([
              ...product,
              {
                product_id: product[index]?.product_id,
                hsn: product[index]?.hsn || hsn_data,
                weight: product[index]?.weight,
                rate: product[index]?.rate,
                amount:
                  product[index]?.weight && product[index]?.rate
                    ? parseFloat(product[index]?.weight) *
                      parseFloat(product[index]?.rate)
                    : 0,
                [fieldName]: value,
              },
            ]);
          } else {
            setProduct([
              {
                product_id: product[index]?.product_id,
                hsn: product[index]?.hsn || hsn_data,
                weight: product[index]?.weight,
                rate: product[index]?.rate,
                amount:
                  product[index]?.weight && product[index]?.rate
                    ? parseFloat(product[index]?.weight) *
                      parseFloat(product[index]?.rate)
                    : 0,
                [fieldName]: value,
              },
            ]);
          }
        }
      }
    }
  };

  // const { sx, ...other } = props;
  console.log("product", product, CustomerListData);

  const handleCreate = () => {
    console.log("product", product, CustomerListData);
  };

  let totalAmount = 0;
  let totalweight = 0;
  let totalrate = 0;

  product?.forEach((sum) => {
    totalAmount += sum.amount;
    totalweight += sum.weight;
    totalrate += sum.rate;
  });

  console.log("weight===>", totalweight);

  console.log("totalAmount==>", totalAmount, typeof totalAmount);
  let SGST = totalAmount
    ? ((1.5 / 100) * totalAmount).toFixed(2) === "0.00"
      ? null
      : ((1.5 / 100) * totalAmount).toFixed(2)
    : null;
  let CGST = totalAmount
    ? ((1.5 / 100) * totalAmount).toFixed(2) === "0.00"
      ? null
      : ((1.5 / 100) * totalAmount).toFixed(2)
    : null;
  console.log("SGST,CGST", CGST, typeof CGST);
  const Bill_Amount =
    totalAmount && SGST && CGST
      ? totalAmount +
        parseFloat(SGST) +
        parseFloat(CGST) -
        (discount ? discount : 0)
      : null;

  const handleChange = (event) => {
    const data = InvoicePageData?.GetInvoicePagData[0]?.CustomerList?.find(
      (e) => e.customer_id === event.target.value
    );
    setCustomerListData(data);
  };
  const [dateData, setDateData] = useState();
  const handleChangeDate = (event) => {
    console.log(event.$d);
    setDateData(event.$d);
  };
  console.log("dateData", dateData);

  const handleDelete = () => {
    setAddTable((prev) => prev - 1);
    product.splice(addtable - 1, 1);
  };

  const handleAdd = () => {
    setAddTable((prev) => prev + 1);
  };

  useEffect(() => {
    if (InvoicePageData?.invoiceEdit.length) {
      localStorage.setItem(
        "InvoiceEditPageData",
        JSON.stringify(InvoicePageData?.invoiceEdit)
      );
    }
  }, [InvoicePageData?.invoiceEdit]);

  console.log("InvoicePageData", InvoicePageData);

  return (
    <div>
      {testData[0]?.productlistdata && product.length > 0 ? (
        <Container>
          <Header name={"AddInvoice"} SearchBar={false} />
          <Container sx={{ backgroundColor: "#EAEFF2", p: 2 }}>
            <Box
              sx={{
                ...commonStyles,
                borderColor: "grey.400",
                textAlign: "center",
                borderRadius: "10px",
                display: "flex",
              }}
            >
              <Box sx={{ marginLeft: "auto" }}>
                <Typography
                  sx={{ color: "#008080", fontWeight: "bold", fontSize: 17 }}
                >
                  Tax Invoice
                </Typography>
                <Typography sx={{ fontWeight: "bold", m: 1 }}>
                  SILVER PLACE
                </Typography>
                <Typography>Nikol , Ahmedabad</Typography>
              </Box>
              <Box sx={{ marginLeft: "30%" }}>
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
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Item>
                    <Stack spacing={1}>
                      <FormControl variant="standard" sx={{ width: 1 }}>
                        <InputLabel id="demo-simple-select-standard-label">
                          Mobile no
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard-01"
                          onChange={(e) => handleChange(e)}
                          label="Mobile_no*"
                          name="mobileNo"
                          defaultValue={testData[0]?.customer_id}
                        >
                          <MenuItem value={null}>
                            <em>None</em>
                          </MenuItem>
                          {InvoicePageData?.GetInvoicePagData[0]?.CustomerList?.map(
                            (e, index) => {
                              return (
                                <MenuItem value={e.customer_id} key={index}>
                                  {e.mobile_no}
                                </MenuItem>
                              );
                            }
                          )}
                        </Select>
                        <br />
                        <TextField
                          id="standard-basic"
                          label="Address"
                          variant="standard"
                          name="customer_address"
                          multiline
                          rows={2}
                          defaultValue={testData[0]?.customer_address}
                          // maxRows={4}
                          sx={{ width: 1 }}
                          onChange={(e) => handleChange(e)}
                          value={CustomerListData?.customer_address}
                        />
                        <br />
                        <TextField
                          id="standard-basic-1"
                          label="Customer_Gst_No"
                          variant="standard"
                          sx={{ width: 1 }}
                          name="Customer_Gst_No"
                          onChange={(e) => handleChange(e)}
                        />
                        <br />

                        <TextField
                          id="standard-basic-2"
                          label="Name "
                          variant="standard"
                          defaultValue={testData[0]?.customer_name}
                          sx={{ width: 1 }}
                          name="customer_name"
                          value={CustomerListData?.customer_name}
                          onChange={(e) => handleChange(e)}
                        />

                        <br />
                      </FormControl>
                    </Stack>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item sx={{ pt: 6, pb: 6 }}>
                    <Stack spacing={4}>
                      <TextField
                        id="standard-basic-3"
                        label="Bill_no"
                        variant="standard"
                        value={
                          testData[0]?.bill_no > 9
                            ? testData[0]?.bill_no
                            : `0${testData[0]?.bill_no}`
                        }
                        sx={{ width: 1 }}
                        name="bill_no"
                        onChange={(e) => handleChange(e)}
                      />
                      <br />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date"
                          value={dateData}
                          defaultValue={testData[0]?.invoice_date}
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
                        onChange={(e) => handleChange(e)}
                      />
                    </Stack>
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>SR_NO</TableCell>
                          <TableCell>ITEM DESCIPTION</TableCell>
                          <TableCell>HSN</TableCell>
                          <TableCell>NET WEIGHT[IN GRAMS]</TableCell>
                          <TableCell>RATE</TableCell>
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
                                onClick={() => handleAdd()}
                              >
                                <AddIcon />
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      {Array.from({ length: addtable }, (_, i, ind = i + 1) => (
                        <TableBody>
                          <TableRow
                            // key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
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
                                sx={{ width: 250 }}
                              >
                                <InputLabel id="demo-simple-select-standard-label">
                                  Select Product
                                </InputLabel>

                                <Select
                                  labelId="demo-simple-select-standard-label"
                                  id="demo-simple-select-standard"
                                  //   value={age}
                                  onChange={(e) =>
                                    handleChangeProduct(
                                      "product_id " + ind,
                                      e.target.value
                                    )
                                  }
                                  label=" Select Product"
                                  defaultValue={
                                    testData[0]?.productlistdata[ind - 1]
                                      ?.product_id
                                  }
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  {InvoicePageData?.GetInvoicePagData[0]?.productList?.map(
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
                              </FormControl>
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="standard-basic-5"
                                label="Hsn"
                                variant="standard"
                                type="number"
                                defaultValue={
                                  testData[0]?.productlistdata[ind - 1]?.hsn ||
                                  0
                                }
                                // value={product[ind - 1]?.hsn || 0 }
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="standard-basic-6"
                                name={`weight ${ind}`}
                                label="Weight"
                                variant="standard"
                                type="number"
                                defaultValue={
                                  testData[0]?.productlistdata[ind - 1]?.weight
                                }
                                // value={product[ind - 1]?.weight}
                                onChange={(e) =>
                                  handleChangeProduct(
                                    "weight " + ind,
                                    parseFloat(e.target.value)
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="standard-basic-7"
                                label="Rate"
                                variant="standard"
                                type="number"
                                name={`rate ${ind}`}
                                defaultValue={
                                  testData[0]?.productlistdata[ind - 1]?.rate
                                }
                                // value={product[ind - 1]?.rate}
                                onChange={(e) =>
                                  handleChangeProduct(
                                    "rate " + ind,
                                    parseFloat(e.target.value)
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell colSpan={2}>
                              {product.length > ind - 1 ? (
                                <TextField
                                  id="standard-basic-8"
                                  label="Amount"
                                  variant="standard"
                                  defaultValue={
                                    testData[0]?.productlistdata[ind - 1]
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
                                  id="standard-basic-8"
                                  label="Amount"
                                  variant="standard"
                                  defaultValue={
                                    testData[0]?.productlistdata[ind - 1]
                                      ?.amount || 0
                                  }
                                  value={product[ind - 1]?.amount?.toFixed(2)}
                                />
                              )}
                            </TableCell>
                            <TableCell>
                              {i > 0 ? (
                                <Button
                                  variant="outlined"
                                  color="error"
                                  onClick={(ind) => handleDelete(ind)}
                                >
                                  <ClearIcon />
                                </Button>
                              ) : (
                                ""
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      ))}
                      <TableFooter>
                        <TableRow>
                          <TableCell colSpan={1} />
                          <TableCell
                            colSpan={2}
                            style={{ borderRight: "1px solid green" }}
                          >
                            <Typography>Total:</Typography>
                          </TableCell>
                          <TableCell colSpan={1}>
                            <TextField
                              id="standard-basic-9"
                              label="Total weight"
                              variant="standard"
                              // defaultValue={
                              //   testData[0]?.productlistdata[ind - 1]?.amount
                              // }
                              value={totalweight ? totalweight : 0}
                              sx={{ width: 200 }}
                            />
                          </TableCell>
                          <TableCell colSpan={1}>
                            <TextField
                              id="standard-basic-01"
                              label="Total rate"
                              variant="standard"
                              value={totalrate ? totalrate : 0}
                            />
                          </TableCell>
                          <TableCell colSpan={2}>
                            <TextField
                              id="standard-basic-02"
                              label="Total Amount"
                              variant="standard"
                              defaultValue={0}
                              value={totalAmount?.toFixed(2)}
                            />
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                    <Box sx={{ p: 2, m: 3 }}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell colSpan={8}></TableCell>
                            <TableCell rowSpan={2}>
                              <TableRow>
                                <TableCell>TAXABLE AMOUNT</TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    label="TaxableAmount"
                                    variant="standard"
                                    value={totalAmount?.toFixed(2)}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>SGST(1.50%)</TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic-03"
                                    label="SGST"
                                    variant="standard"
                                    defaultValue={testData[0]?.sgst}
                                    value={SGST}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>CGST(1.50%)</TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic-04"
                                    label="CGST"
                                    variant="standard"
                                    defaultValue={testData[0]?.cgst}
                                    value={CGST}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>DISCOUNT</TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic-05"
                                    label="Discount"
                                    variant="standard"
                                    defaultValue={testData[0]?.discount}
                                    value={discount}
                                    onChange={(e) =>
                                      setDiscount(e.target.value)
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>BILL AMOUNT</TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic-06"
                                    label="Bill Amount"
                                    variant="standard"
                                    defaultValue={testData[0]?.bill_amount}
                                    value={Bill_Amount?.toFixed(2)}
                                  />
                                </TableCell>
                              </TableRow>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
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
                      sx={{ pl: 2 }}
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
                          textAlign: "center",
                          bottom: 0,
                          position: "absolute",
                          left: 0,
                          width: "100%",
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
                      height: 150,
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
                        bottom: 0,
                        position: "absolute",
                        left: 0,
                        width: "100%",
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
                onClick={() => handleCreate()}
                href="https://localhost:3200/Invoice/pdf"
              >
                Create And Print
              </Button>
            </Box>
          </Container>
        </Container>
      ) : null}
    </div>
  );
}
export default InvoiceEdit;
