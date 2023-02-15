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
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { GetinvoiceAddPageAction } from "../../../Store/Action/InvoiceAction";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

function AddInvoice() {
  const dispatch = useDispatch();
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  const invoivepagedata = JSON.parse(
    localStorage.getItem("InvoiceAddPageData")
  );

  console.log("accessToken====>", accessToken?.accessToken);
  const [CustomerListData, setCustomerListData] = useState({
    customer_name: "",
    address: "",
    gst_no: "",
  });
  const [productListData, setProductListData] = useState({
    hsn: "",
  });

  const [test, setTest] = useState();
  const [bill_value, setBill_value] = useState([]);

  const hedalchengeInt = (e) => {
    let name = e.target.name.split(" ", 2);
    let dummy = bill_value[parseInt(name[1]) - 1];
    console.log("name, dummy", name, dummy, dummy.index);
    // setTest({ ...test, [name[0]]: e.target.value });
    // setBill_value([{ ...bill_value, [name[0]]: e.target.value }]);

    bill_value.splice(0, 1, {
      [name[0]]: e.target.value,
      index: dummy.index,
      product_id: dummy.product_id,
      weight: dummy.weight,
    });
  };
  // {
  //   [name[0]]: e.target.value,
  //   product_id: dummy.product_id,
  //   index: dummy.index,
  // }
  // const [value, setValue] = useState(new Date());
  // const CustomerData = useSelector((state) => state?.CustomerList);
  const InvoicePageData = useSelector((state) => state?.InvoiceData);

  const [addtable, setAddTable] = useState(1);
  const [product, setProduct] = useState([]);
  console.log("bill_value", bill_value, test);

  const testData = InvoicePageData?.GetInvoicePagData.length
    ? InvoicePageData?.GetInvoicePagData
    : invoivepagedata;

  const handleChange = (event) => {
    const data = InvoicePageData?.GetInvoicePagData[0]?.CustomerList?.find(
      (e) => e.customer_id === event.target.value
    );
    setCustomerListData(data);
  };

  const handleChangeProduct = (fieldName, value) => {
    let existingweight = product.filter((ans) => ans?.weight);
    let existingrate = product.filter((ans) => ans?.rate);

    if (existingweight.length > 0 && existingrate.length <= 0) {
      existingweight.forEach((f) => {
        let ansDataInd = product.findIndex((e) => e.weight === f.weight);
        product[ansDataInd].weight = value;
      });
      setProduct([...product]);
    } else {
      if (existingrate.length > 0 && existingweight.length <= 0) {
        existingrate.forEach((f) => {
          let ansDataInd = product.findIndex((e) => e.rate === f.rate);
          product[ansDataInd].rate = value;
        });
        setProduct([...product]);
      } else {
        setProduct([...product, { [fieldName]: value }]);
      }
    }
    //  else {
    //   setProduct([...product, { [fieldName]: value }]);
    // }

    // if (fieldName.weight) {
    //   setProduct([...product, { [fieldName.weight]: value }]);
    // } else {
    //   setProduct([...product, { [fieldName]: value }]);
    // }
  };
  console.log("product_Data", product);

  // const { sx, ...other } = props;
  const commonStyles = {
    p: 2,
    border: 1,
  };

  const handleDelete = () => {
    setAddTable((prev) => prev - 1);
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

  return (
    <div>
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
                <Item sx={{ pt: 6, pb: 6 }}>
                  <Stack spacing={4}>
                    <TextField
                      id="standard-basic-3"
                      label="Bill_no"
                      variant="standard"
                      value={testData?.bill_no || 0}
                      sx={{ width: 1 }}
                      name="bill_no"
                      onChange={(e) => handleChange(e)}
                    />
                    <br />
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                              onClick={() => {
                                setAddTable((prev) => prev + 1);
                              }}
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
                            <FormControl variant="standard" sx={{ width: 250 }}>
                              <InputLabel id="demo-simple-select-standard-label">
                                Select Product
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                //   value={age}
                                onChange={(e) =>
                                  handleChangeProduct(
                                    "product_id",
                                    e.target.value
                                  )
                                }
                                label=" Select Product"
                                name={ind}
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
                              value={productListData?.hsn}
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
                                handleChangeProduct("weight", e.target.value)
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
                              onChange={(e) =>
                                handleChangeProduct("rate", e.target.value)
                              }
                            />
                          </TableCell>
                          <TableCell colSpan={2}>
                            <TextField
                              id="standard-basic-8"
                              label="Amount"
                              variant="standard"
                              value={parseInt(
                                bill_value?.["Weight" + ind] * bill_value?.rate
                              ).toFixed(2)}
                            />
                          </TableCell>
                          <TableCell>
                            {i > 0 ? (
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={handleDelete}
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
                            // label="Amount"
                            variant="standard"
                            defaultValue={0}
                            value={
                              bill_value?.Weight
                                ? parseInt(bill_value[0]?.Weight).toFixed(2)
                                : 0
                            }
                            sx={{ width: 200 }}
                          />
                        </TableCell>
                        <TableCell colSpan={1}>
                          <TextField
                            id="standard-basic-01"
                            // label="Amount"
                            variant="standard"
                            value={
                              bill_value?.rate
                                ? parseInt(bill_value?.rate).toFixed(2)
                                : 0
                            }
                            defaultValue={0}
                          />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <TextField
                            id="standard-basic-02"
                            // label="Amount"
                            variant="standard"
                            defaultValue={0}
                            value={parseInt(
                              bill_value?.Weight * bill_value?.rate
                            ).toFixed(2)}
                          />
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                  <Box sx={{ p: 2, m: 3 }}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={4}></TableCell>
                          <TableCell>TAXABLE AMOUNT</TableCell>
                          <TableCell>
                            <TextField
                              id="standard-basic"
                              label="TaxableAmount"
                              variant="standard"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={4}></TableCell>

                          <TableCell>SGST(1.50%)</TableCell>
                          <TableCell>
                            <TextField
                              id="standard-basic-03"
                              label="SGST"
                              variant="standard"
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
                            />
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      {/* <TableBody>
                        <TableRow
                          // key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>
                            <TextField
                              id="standard-basic"
                              label="TaxableAmount"
                              variant="standard"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id="standard-basic"
                              label="SGST"
                              variant="standard"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id="standard-basic"
                              label="CGST"
                              variant="standard"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id="standard-basic"
                              label="Discount"
                              variant="standard"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id="standard-basic"
                              label="Bill Amount"
                              variant="standard"
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody> */}
                    </Table>
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
          </Box>
        </Container>
      </Container>
    </div>
  );
}
export default AddInvoice;
