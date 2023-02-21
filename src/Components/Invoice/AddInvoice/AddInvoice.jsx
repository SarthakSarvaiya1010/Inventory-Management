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
  AddInvoiceData,
  GetinvoiceAddPageAction,
} from "../../../Store/Action/InvoiceAction";
import { convert } from "../../../Helpers/misc";
import { ToWords } from "to-words";

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
function AddInvoice() {
  const commonStyles = {
    p: 2,
    border: 1,
  };
  const dispatch = useDispatch();
  const toWords = new ToWords();
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  const invoivepagedata = JSON.parse(
    localStorage.getItem("InvoiceAddPageData")
  );

  const InvoicePageData = useSelector((state) => state?.InvoiceData);
  const testData = InvoicePageData?.GetInvoicePagData.length
    ? InvoicePageData?.GetInvoicePagData
    : invoivepagedata
    ? invoivepagedata
    : [{}];
  console.log("accessToken====>", accessToken?.accessToken);
  const [CustomerListData, setCustomerListData] = useState({
    customer_name: "",
    address: "",
    gst_no: "",
  });

  const [addtable, setAddTable] = useState(1);
  const [product, setProduct] = useState([]);
  const [discount, setDiscount] = useState();
  const [finalinvoicedata, setFinalInvoiceData] = useState(null);

  console.log("invoicepdf", InvoicePageData?.InvoicePdf);
  console.log("CustomerListData", CustomerListData);

  console.log("discount==>", discount);
  console.log("product_Data", product);

  const handleChangeProduct = (name, value) => {
    let nameIndex = name.split(" ", 2);
    let index = parseInt(nameIndex[1]) - 1;
    console.log("index===?", index, value);
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
      console.log("weightblockhere");
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
            product[index]?.weight && value
              ? parseFloat(product[index]?.weight) * parseFloat(value)
              : 0;
        });
        setProduct([...product]);
      } else {
        if (existingProduct.length > index && fieldName === "product_id") {
          console.log("productidhere");
          existingProduct.forEach((f) => {
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
                product_id: product[0]?.product_id,
                hsn: product[0]?.hsn || hsn_data,
                weight: product[0]?.weight,
                rate: product[0]?.rate,
                amount:
                  product[0]?.weight && product[0]?.rate
                    ? parseFloat(product[0]?.weight) *
                      parseFloat(product[0]?.rate)
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
  console.log("product", product);

  let totalAmount = 0;
  let totalweight = 0;
  let totalrate = 0;
  product.forEach((sum, index) => {
    totalAmount += sum.amount;
    totalweight += parseFloat(sum.weight);
    totalrate += parseFloat(sum.rate);
  });
  let SGST = ((1.5 / 100) * totalAmount).toFixed(2);
  let CGST = ((1.5 / 100) * totalAmount).toFixed(2);
  console.log("SGST,CGST", parseFloat(SGST), parseFloat(CGST));
  const Bill_Amount =
    totalAmount && SGST && CGST
      ? totalAmount +
        parseFloat(SGST) +
        parseFloat(CGST) -
        (discount ? discount : 0)
      : 0;

  var b64;
  console.log(
    "InvoicePageData?.InvoicePdf?.InvoicePdf",
    InvoicePageData?.InvoicePdf?.invoicePdf
  );
  if (InvoicePageData?.InvoicePdf?.invoicePdf) {
    b64 = InvoicePageData?.InvoicePdf?.invoicePdf;
  }

  // Decode Base64 to binary and show some information about the PDF file (note that I skipped all checks)
  if (b64) {
    // var bin = atob(b64);

    // Embed the PDF into the HTML page and show it to the user
    var obj = document.createElement("object");
    obj.style.width = "100%";
    obj.style.height = "1000pt";
    obj.type = "application/pdf";
    obj.data = "data:application/pdf;base64," + b64;
    document.body.appendChild(obj);

    // Insert a link that allows the user to download the PDF file
    var link = document.createElement("a");
    link.innerHTML = "Download PDF file";
    link.download = "invoice.pdf";
    link.href = "data:application/octet-stream;base64," + b64;
    document.body.appendChild(link);
    window.open(link);
  }
  const handleChange = (event) => {
    const data = InvoicePageData?.GetInvoicePagData[0]?.CustomerList?.find(
      (e) => e.customer_id === event.target.value
    );
    setCustomerListData(data);
  };

  const handleDelete = (index) => {
    setAddTable((prev) => prev - 1);
    product.splice(addtable - 1, 1);
  };
  useEffect(() => {
    dispatch(GetinvoiceAddPageAction(accessToken?.accessToken));
  }, [accessToken?.accessToken, dispatch]);

  useEffect(() => {
    if (InvoicePageData?.GetInvoicePagData.length) {
      localStorage.setItem(
        "InvoiceAddPageData",
        JSON.stringify(InvoicePageData?.GetInvoicePagData)
      );
    }
  }, [InvoicePageData?.GetInvoicePagData]);

  const handleAddInvoiceData = () => {
    const finalinvoicedata = {
      bill_no: testData[0]?.bill_no,
      invoice_date: convert(new Date()),
      customer_id: CustomerListData ? CustomerListData.customer_id : "",
      taxable_amount: totalAmount ? totalAmount.toFixed(2) : 0,
      sgst: parseFloat(SGST),
      cgst: parseFloat(CGST),
      discount: parseFloat(discount) ? parseFloat(discount) : 0,
      bill_amount: parseFloat(Bill_Amount.toFixed(2)),
      productdata: product,
    };
    dispatch(AddInvoiceData(accessToken?.accessToken, finalinvoicedata));
  };
  return (
    <div>
      <Container>
        <Header name={"AddInvoice"} SearchBar={false} />
        <a href="https://codingbeautydev.com" target="_blank" rel="noreferrer">
          Coding Beauty
        </a>
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
                        //   value={age}
                        onChange={(e) => handleChange(e)}
                        label="Mobile_no*"
                        name="customer_mobileNo"
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
                        multiline
                        rows={2}
                        // maxRows={4}
                        sx={{ width: 1 }}
                        value={
                          CustomerListData?.address === ""
                            ? ""
                            : CustomerListData?.address
                        }
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
                        value={CustomerListData?.customer_name}
                        sx={{ width: 1 }}
                        name="Customer_Name"
                        onChange={(e) => handleChange(e)}
                      />

                      <br />
                    </FormControl>
                  </Stack>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ pt: 5, pb: 5 }}>
                  <Stack spacing={2.5}>
                    <TextField
                      id="standard-basic-3"
                      label="Bill_no"
                      variant="standard"
                      value={testData[0]?.bill_no || 0}
                      sx={{ width: 1 }}
                      name="bill_no"
                      onChange={(e) => handleChange(e)}
                    />
                    {/* <br />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date"
                          value={testData[0]?.date}
                          name="date"
                          onChange={(e) => handleChange(e)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider> */}
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
                            <FormControl variant="standard" sx={{ width: 240 }}>
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
                              value={
                                product[ind - 1]?.hsn
                                  ? product[ind - 1]?.hsn
                                  : 0
                              }
                              sx={{ width: 70 }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id="standard-basic-6"
                              name={`weight ${ind}`}
                              label="Weight"
                              variant="standard"
                              type="number"
                              onChange={(e) =>
                                handleChangeProduct(
                                  "weight " + ind,
                                  parseFloat(e.target.value)
                                )
                              }
                              sx={{ w: 50 }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id="standard-basic-7"
                              label="Rate"
                              variant="standard"
                              type="number"
                              name={`rate ${ind}`}
                              sx={{ width: 100 }}
                              onChange={(e) =>
                                handleChangeProduct(
                                  "rate " + ind,
                                  parseFloat(e.target.value)
                                )
                              }
                            />
                          </TableCell>
                          <TableCell colSpan={1}>
                            {product.length > ind - 1 ? (
                              <TextField
                                id="standard-basic-8"
                                label="Amount"
                                variant="standard"
                                sx={{ width: 100 }}
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
                                sx={{ width: 100, p: 0 }}
                                value={
                                  typeof product[ind - 1]?.amount !==
                                  "undefined"
                                    ? (product[ind - 1]?.amount).toFixed(2)
                                    : 0
                                }
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {i > 0 ? (
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={(ind) => handleDelete(ind)}
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
                    ))}
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
                            sx={{ width: 100 }}
                          />
                        </TableCell>
                        <TableCell colSpan={1}>
                          <TextField
                            id="standard-basic-01"
                            label="Total rate"
                            variant="standard"
                            sx={{ width: 100 }}
                            value={totalrate ? totalrate.toFixed(2) : 0}
                          />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <TextField
                            id="standard-basic-02"
                            label="Total Amount"
                            variant="standard"
                            defaultValue={0}
                            sx={{ width: 120 }}
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
                            {toWords.convert(Bill_Amount.toFixed(2))}{" "}
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
                    sx={{ color: "#008080", fontWeight: "bold", fontSize: 14 }}
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
              onClick={() => handleAddInvoiceData()}
            >
              Create And Print
            </Button>
          </Box>
        </Container>
      </Container>
    </div>
  );
}
export default AddInvoice;
