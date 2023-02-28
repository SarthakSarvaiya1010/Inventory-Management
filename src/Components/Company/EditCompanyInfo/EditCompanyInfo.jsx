import React, { useEffect } from "react";
import {
  Stack,
  TextField,
  DialogContent,
  Container,
  Box,
  Fab,
  Button,
} from "@mui/material";
import UseForm from "../../EditForm/useForm";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../../Helpers/Header/Header";
import { CompanyInfoByIdAction } from "../../../Store/Action/CompanyAction/index";
import { useParams } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";

function EditCompanyInfo() {
  const params = useParams();

  const CompanyInfoData = useSelector((state) => state?.CompanyInfo);
  let CompanyInfo = CompanyInfoData?.CompanyInfoId || {};

  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const dispatch = useDispatch();
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  const accessTokenData =
    successLoginData?.LoginData?.accessToken || accessToken?.accessToken;
  const { id } = params;
  let company_id = parseInt(
    localStorage?.getItem("CompanyId") || accessToken?.company_id
  );
  useEffect(() => {
    dispatch(CompanyInfoByIdAction(accessTokenData, company_id));
    if (id) {
      localStorage.setItem("CompanyId", id);
    }
  }, [accessTokenData, company_id, dispatch, id]);

  const imageUploader = React.useRef(null);
  const uploadedImage = React.useRef(null);
  const [image, setImage] = React.useState(null);

  const showToastMessage = () => {
    toast.success("Data Updata  Success  !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const { companyhandleSubmit, values, errors, handleOnchange } = UseForm(
    CompanyInfo,
    showToastMessage,
    image
  );
  console.log("errors", errors, CompanyInfo);

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
      {CompanyInfo.length || Object.keys(CompanyInfo).length ? (
        <Container fixed>
          <Header name={"Company Info"} SearchBar={false} />
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
                    error={errors?.product_name ? true : null}
                    name="
                  company_name"
                    id="outlined-company_name"
                    label="Company Name"
                    autoComplete="off"
                    defaultValue={CompanyInfo?.company_name}
                    onChange={(e) => handleOnchange(e)}
                  />
                  <p style={{ color: "red" }}>{errors?.product_name}</p>
                  <br />
                  <TextField
                    id="outlined-Product"
                    label="Website"
                    name="website"
                    autoComplete="off"
                    type="textarea"
                    defaultValue={CompanyInfo?.website}
                    onChange={(e) => handleOnchange(e)}
                  />
                  <br />
                  <TextField
                    error={errors?.product_type ? true : null}
                    id="outlined-select-currency-native"
                    type="number"
                    name="phone_no"
                    label="Phone No."
                    defaultValue={parseInt(CompanyInfo?.phone_no)}
                    onChange={(e) => handleOnchange(e)}
                  ></TextField>
                  <p style={{ color: "red" }}>{errors?.product_type}</p>
                  <br />
                  <TextField
                    error={errors?.weight ? true : null}
                    required
                    type="number"
                    name="mobile_no"
                    label="Mobile No."
                    defaultValue={parseInt(CompanyInfo?.mobile_no)}
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
                    type="textarea"
                    multiline
                    name="company_address"
                    label="Company Address"
                    defaultValue={CompanyInfo?.company_address}
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.hsn}
                    autoComplete="off"
                  />
                  <p style={{ color: "red" }}>{errors?.hsn}</p>
                  <TextField
                    error={errors?.hsn ? true : null}
                    required
                    name="tin_gst_no"
                    label="TIN GST NO."
                    defaultValue={CompanyInfo?.tin_gst_no}
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.hsn}
                    autoComplete="off"
                  />
                  <p style={{ color: "red" }}>{errors?.hsn}</p>
                  <TextField
                    error={errors?.hsn ? true : null}
                    required
                    name="terms_condition"
                    type="textarea"
                    multiline
                    label="Terms & Condition"
                    defaultValue={CompanyInfo?.terms_condition}
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.hsn}
                    autoComplete="off"
                  />
                  <p style={{ color: "red" }}>{errors?.hsn}</p>
                  <TextField
                    error={errors?.hsn ? true : null}
                    required
                    type="number"
                    name="fax_no"
                    label="Fax No."
                    defaultValue={CompanyInfo?.fax_no}
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.hsn}
                    autoComplete="off"
                  />
                  <p style={{ color: "red" }}>{errors?.hsn}</p>
                  <img
                    alt=""
                    ref={uploadedImage}
                    style={{
                      height: "120px",
                      width: "120px",
                      display:
                        image || CompanyInfo?.image_src ? "flex" : "none",
                    }}
                    src={
                      CompanyInfo?.image_src
                        ? `http://localhost:3200/${CompanyInfo?.image_src}`
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
                    Update
                  </Button>
                </Stack>
              </Box>
              <ToastContainer />
            </DialogContent>
          </Container>
        </Container>
      ) : null}
    </div>
  );
}

export default EditCompanyInfo;
