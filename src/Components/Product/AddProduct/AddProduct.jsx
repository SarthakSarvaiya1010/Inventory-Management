import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField, DialogContent, Container } from "@mui/material";

import Header from "../../../Helpers/Header/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import UseForm from "../../EditForm/UseForm";
import { useDispatch, useSelector } from "react-redux";
import { ProductEditAction } from "../../../Store/Action/ProductAction/index";
import CircularProgress from "@mui/material/CircularProgress";

const currencies = [
  {
    value: "Tax",
    label: "Tax",
  },
  {
    value: "select ",
    label: "One",
  },
];

function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const ProductEditData = useSelector((state) => state?.ProductEdit);
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const { id } = params;

  const Product_data = ProductEditData?.productEdit;
  // console.log("params", id, Product_data);
  // const [values, setvalues] = useState(null);
  console.log("params", Product_data, Object.keys(Product_data).length);
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  const accessTokenData =
    successLoginData?.LoginData?.accessToken || accessToken?.accessToken;

  useEffect(() => {
    if (id) {
      dispatch(ProductEditAction(accessTokenData, id));
    }
  }, [accessTokenData, dispatch, id, successLoginData.LoginData.accessToken]);

  const { handleSubmit, values, errors, handleOnchange } =
    UseForm(Product_data);

  console.log(values);

  const handleCancle = () => {
    console.log("done");
    navigate("/ProductList");
  };

  return (
    <div>
      {!ProductEditData.loder || !id ? (
        // Object.keys(Product_data).length ? (
        <Container fixed>
          <Header name={"Add Product"} SearchBar={false} />
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
                    name="product_name"
                    id="outlined-Product"
                    label="Product Name"
                    autoComplete="off"
                    defaultValue={id ? Product_data.product_name : ""}
                    onChange={(e) => handleOnchange(e)}
                  />
                  <p style={{ color: "red" }}>{errors?.product_name}</p>
                  <br />
                  <TextField
                    id="outlined-Product"
                    label="Description"
                    name="Description"
                    autoComplete="off"
                    type="textarea"
                    defaultValue={id ? Product_data.description : ""}
                    onChange={(e) => handleOnchange(e)}
                  />
                  <br />
                  <TextField
                    error={errors?.product_type ? true : null}
                    id="outlined-select-currency-native"
                    select
                    name="product_type"
                    label="Product Type"
                    defaultValue="select One"
                    // defaultValue={id ? Product_data.description : ""}

                    SelectProps={{
                      native: true,
                    }}
                    onChange={(e) => handleOnchange(e)}
                  >
                    {currencies.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <p style={{ color: "red" }}>{errors?.product_type}</p>
                  <br />
                  <TextField
                    error={errors?.weight ? true : null}
                    required
                    type="number"
                    name="weight"
                    label="Weight [In Grams]"
                    defaultValue={id ? Product_data.weight : ""}
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.weight}
                    autoComplete="off"
                  />
                  <p style={{ color: "red" }}>{errors?.weight}</p>

                  <br />
                  <TextField
                    error={errors?.hsn ? true : null}
                    required
                    type="number"
                    name="hsn"
                    label="HSN"
                    defaultValue={id ? Product_data.hsn : ""}
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.hsn}
                    autoComplete="off"
                  />
                  <p style={{ color: "red" }}>{errors?.hsn}</p>
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

export default AddProduct;
