import React, { useEffect, useState } from "react";
import {
  TextField,
  DialogContent,
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
import { textAlign } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  padding: 30,
  color: theme.palette.text.secondary,
}));
function AddInvoice(props) {
  const { accessToken, testData } = props;
  console.log("accessToken====>", accessToken?.accessToken);
  console.log("testData", testData);
  const [age, setAge] = React.useState("");
  const [value, setValue] = React.useState(new Date());
  const [addtable, setAddTable] = useState(1);
  console.log("addtable", addtable);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const { sx, ...other } = props;
  const commonStyles = {
    p: 2,
    border: 1,
  };

  const handleDelete = () => {
    setAddTable((prev) => prev - 1);
  };

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
                        Mobile_no
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        //   value={age}
                        onChange={handleChange}
                        label="Mobile_no*"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>

                      <br />
                      <TextField
                        id="standard-basic"
                        label="Address"
                        variant="standard"
                        multiline
                        rows={2}
                        maxRows={4}
                        sx={{ width: 1 }}
                      />
                      <br />
                      <TextField
                        id="standard-basic"
                        label="Customer_Gst_No"
                        variant="standard"
                        sx={{ width: 1 }}
                      />
                      <br />
                      <TextField
                        id="standard-basic"
                        label="Name "
                        variant="standard"
                        sx={{ width: 1 }}
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
                      id="standard-basic"
                      label="Bill_no"
                      variant="standard"
                      value={testData[0]?.bill_no}
                      sx={{ width: 1 }}
                    />
                    <br />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date"
                        value={testData[0]?.date}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    <br />
                    <TextField
                      id="standard-basic"
                      label="Gst_No"
                      variant="standard"
                      sx={{ width: 1 }}
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
                                onChange={handleChange}
                                label=" Select Product"
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <TextField
                              id="standard-basic"
                              label="Hsn"
                              variant="standard"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id="standard-basic"
                              label="Weight"
                              variant="standard"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id="standard-basic"
                              label="Rate"
                              variant="standard"
                            />
                          </TableCell>
                          <TableCell colSpan={2}>
                            <TextField
                              id="standard-basic"
                              label="Amount"
                              variant="standard"
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
                            id="standard-basic"
                            // label="Amount"
                            variant="standard"
                            defaultValue={0}
                            sx={{ width: 200 }}
                          />
                        </TableCell>
                        <TableCell colSpan={1}>
                          <TextField
                            id="standard-basic"
                            // label="Amount"
                            variant="standard"
                            defaultValue={0}
                          />
                        </TableCell>
                        <TableCell colSpan={2}>
                          <TextField
                            id="standard-basic"
                            // label="Amount"
                            variant="standard"
                            defaultValue={0}
                          />
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                  <Box sx={{ p: 2, m: 3 }}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>TAXABLE AMOUNT</TableCell>
                          <TableCell>SGST(1.50%)</TableCell>
                          <TableCell>CGST(1.50%)</TableCell>
                          <TableCell>DISCOUNT</TableCell>
                          <TableCell>BILL AMOUNT</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
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
                      </TableBody>
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
