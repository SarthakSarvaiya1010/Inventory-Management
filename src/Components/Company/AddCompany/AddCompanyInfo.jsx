import React from "react";
import {
  Stack,
  TextField,
  DialogContent,
  Container,
  Box,
  Fab,
  Button,
} from "@mui/material";
import UseForm from "../../EditForm/UseForm";
import Header from "../../../Helpers/Header/Header";

import AddIcon from "@mui/icons-material/Add";
import { ToastContainer } from "react-toastify";

function AddCompanyInfo() {
  const imageUploader = React.useRef(null);
  const uploadedImage = React.useRef(null);
  const [image, setImage] = React.useState(null);

  let test;
  const { companyhandleSubmit, values, errors, handleOnchange } = UseForm(
    test,
    image
  );
  console.log("errors)_(", errors);
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
  return (
    <div>
      <Container fixed>
        <Header name={"Add Company  "} SearchBar={false} />
        <Container fixed sx={{ backgroundColor: "#EAEFF2" }}>
          <DialogContent>
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
                  error={errors?.company_name ? true : null}
                  name="company_name"
                  id="outlined-company_name"
                  label="Company Name"
                  autoComplete="off"
                  onChange={(e) => handleOnchange(e)}
                />
                <p style={{ color: "red" }}>{errors?.company_name}</p>
                <br />
                <TextField
                  error={errors?.website ? true : null}
                  required
                  id="outlined-Product"
                  label="Website"
                  name="website"
                  autoComplete="off"
                  type="textarea"
                  onChange={(e) => handleOnchange(e)}
                />
                <p style={{ color: "red" }}>{errors?.website}</p>
                <br />
                <TextField
                  error={errors?.phone_no ? true : null}
                  id="outlined-select-currency-native"
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  name="phone_no"
                  required
                  label="Phone No."
                  onChange={(e) => handleOnchange(e)}
                ></TextField>
                <p style={{ color: "red" }}>{errors?.phone_no}</p>
                <br />
                <TextField
                  error={errors?.mobile_no ? true : null}
                  required
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  name="mobile_no"
                  label="Mobile No."
                  variant="outlined"
                  onChange={(e) => handleOnchange(e)}
                  value={values?.mobile_no}
                  autoComplete="off"
                />
                <p style={{ color: "red" }}>{errors?.mobile_no}</p>
                <br />
                <TextField
                  error={errors?.company_address ? true : null}
                  required
                  type="textarea"
                  multiline
                  name="company_address"
                  label="Company Address"
                  variant="outlined"
                  onChange={(e) => handleOnchange(e)}
                  value={values?.company_address}
                  autoComplete="off"
                />
                <p style={{ color: "red" }}>{errors?.company_address}</p>
                <br />
                <TextField
                  error={errors?.tin_gst_no ? true : null}
                  required
                  name="tin_gst_no"
                  label="TIN GST NO."
                  variant="outlined"
                  onChange={(e) => handleOnchange(e)}
                  value={values?.tin_gst_no}
                  autoComplete="off"
                />
                <p style={{ color: "red" }}>{errors?.tin_gst_no}</p>
                <br />
                <TextField
                  error={errors?.terms_condition ? true : null}
                  required
                  name="terms_condition"
                  type="textarea"
                  multiline
                  label="Terms & Condition"
                  variant="outlined"
                  onChange={(e) => handleOnchange(e)}
                  value={values?.terms_condition}
                  autoComplete="off"
                />
                <p style={{ color: "red" }}>{errors?.terms_condition}</p>
                <br />
                <TextField
                  error={errors?.fax_no ? true : null}
                  required
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  name="fax_no"
                  label="Fax No."
                  variant="outlined"
                  onChange={(e) => handleOnchange(e)}
                  value={values?.hsn}
                  autoComplete="off"
                />
                <p style={{ color: "red" }}>{errors?.fax_no}</p>
                <br />
                <img
                  alt=""
                  ref={uploadedImage}
                  style={{
                    height: "120px",
                    width: "120px",
                    display: image ? "flex" : "none",
                  }}
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
                    <AddIcon /> Upload company logo
                  </Fab>
                </label>
                ;
              </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={companyhandleSubmit}
                >
                  Add Company
                </Button>
              </Stack>
            </Box>
            <ToastContainer limit={1} />
          </DialogContent>
        </Container>
      </Container>
    </div>
  );
}

export default AddCompanyInfo;
