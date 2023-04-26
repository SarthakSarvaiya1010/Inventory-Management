import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField, DialogContent, Container, Fab } from "@mui/material";
import Header from "../../../Helpers/Header/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import useForm from "../../EditForm/UseForm";
import { useDispatch, useSelector } from "react-redux";
import { ProductEditAction } from "../../../Redux/ProductRedux/ProductThunk";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";

const currencies = [
  {
    value: "Tax",
    label: "Tax",
  },
];

function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const ProductEditData = useSelector((state) => state?.ProductList);
  const { id } = params;
  const imageUploader = React.useRef(null);
  const uploadedImage = React.useRef(null);
  const [image, setImage] = React.useState(null);
  const Product_data = ProductEditData?.productEdit;

  useEffect(() => {
    if (id) {
      dispatch(ProductEditAction(id));
    }
  }, [dispatch, id]);

  const { producthandleSubmit, values, errors, handleOnchange } = useForm(
    Product_data,
    image
  );

  const handleCancle = () => {
    localStorage.setItem("NavigateItemName", "productlist");
    navigate("/productlist");
  };

  const hedalImgChage = (event) => {
    const [file] = event.target.files;

    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;

      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    setImage(file);
  };
  console.log("Product_data.quantity", Product_data.quantity);
  return (
    <div>
      {!ProductEditData.isLoading || !id ? (
        // Object.keys(Product_data).length ? (
        <Container fixed>
          <Header
            name={id ? "Edit product" : "Add Product"}
            SearchBar={false}
          />
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
                    name="product_name"
                    // {...register("product_name")}
                    error={errors?.product_name ? true : null}
                    id="outlined-Product"
                    label="Product Name"
                    autoComplete="off"
                    defaultValue={id ? Product_data?.product_name : ""}
                    value={values?.product_name}
                    onChange={(e) => handleOnchange(e)}
                  />
                  <p style={{ color: "red" }}>{errors?.product_name}</p>
                  <br />
                  <TextField
                    name="description"
                    id="outlined-Product"
                    label="Description"
                    autoComplete="off"
                    type="textarea"
                    defaultValue={id ? Product_data.description : ""}
                    value={values?.description}
                    onChange={(e) => handleOnchange(e)}
                  />
                  <br />
                  <TextField
                    name="product_type"
                    error={errors?.product_type ? true : null}
                    id="outlined-select-currency-native"
                    select
                    label="Product Type"
                    defaultValue={id ? Product_data?.product_type : ""}
                    SelectProps={{
                      native: true,
                    }}
                    value={values?.product_type}
                    onChange={(e) => handleOnchange(e)}
                  >
                    <option value={null}>
                      <em>None</em>
                    </option>
                    {currencies.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <p style={{ color: "red" }}>{errors?.product_type}</p>
                  <br />
                  <TextField
                    name="unit"
                    error={errors?.unit ? true : null}
                    id="outlined-select-currency-native"
                    select
                    label="Unit"
                    defaultValue={id ? Product_data?.unit : ""}
                    SelectProps={{
                      native: true,
                    }}
                    onChange={(e) => handleOnchange(e)}
                    value={values?.unit}
                  >
                    <option value={null}>
                      <em>None</em>
                    </option>
                    <option value={"kilogram"}>
                      <em>Kilogram</em>
                    </option>
                    <option value={"gram"}>
                      <em>Gram</em>
                    </option>
                    <option value={"nos"}>
                      <em>Nos</em>
                    </option>
                  </TextField>
                  <p style={{ color: "red" }}>{errors?.unit}</p>
                  <br />
                  <TextField
                    name="quantity"
                    error={errors?.quantity ? true : null}
                    required
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    label="Quantity "
                    defaultValue={id ? Product_data.quantity : ""}
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.quantity}
                    autoComplete="off"
                  />
                  <p style={{ color: "red" }}>{errors?.quantity}</p>
                  <br />
                  <TextField
                    name="weight"
                    error={errors?.weight ? true : null}
                    required
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    label="Weight"
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
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    name="hsn"
                    label="HSN"
                    defaultValue={id ? Product_data.hsn : ""}
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.hsn}
                    autoComplete="off"
                  />
                  <p style={{ color: "red" }}>{errors?.hsn}</p>
                  <br />
                  <img
                    alt=""
                    ref={uploadedImage}
                    style={{
                      height: "120px",
                      width: "120px",
                      display:
                        image || ProductEditData?.productEdit?.image_src
                          ? "flex"
                          : "none",
                    }}
                    src={
                      ProductEditData?.productEdit?.image_src
                        ? `data:image/png;base64,${ProductEditData?.productEdit?.image_src}`
                        : "src/"
                    }
                  />
                  <br />
                  <label htmlFor="upload-photo">
                    <input
                      style={{ display: "none" }}
                      id="upload-photo"
                      name="image_src"
                      ref={imageUploader}
                      onChange={hedalImgChage}
                      type="file"
                    />

                    <Fab
                      color="secondary"
                      size="small"
                      component="span"
                      aria-label="add"
                      variant="extended"
                    >
                      <AddIcon /> Upload product photo
                    </Fab>
                  </label>
                  ;
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

export default AddProduct;
