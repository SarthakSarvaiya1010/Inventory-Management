import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField, DialogContent, Container, Fab } from "@mui/material";
import Header from "../../../Helpers/Header/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import UseForm from "../../EditForm/UseForm";
import { useDispatch, useSelector } from "react-redux";
import { userGetByuuidAction } from "../../../Redux/UserReduk/UserThunk";
import { CompanyInfoAction } from "../../../Redux/CompanyRedux/CompanyThunk";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIcon from "@mui/icons-material/Add";

const Role = [
  {
    value: 1,
    label: "Master Admin",
  },
  {
    value: 2,
    label: "Admin",
  },
];
function AddUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const User = useSelector((state) => state?.User);
  const CompanyInfo = useSelector((state) => state?.CompanyInfo);

  const CompanyListData = CompanyInfo?.CompanyInfo;

  const { id } = params;

  const imageUploader = React.useRef(null);
  const uploadedImage = React.useRef(null);
  const [image, setImage] = React.useState(null);

  const User_data = User?.UserDataByuuid;

  useEffect(() => {
    if (id) {
      dispatch(userGetByuuidAction(id));
    }
    dispatch(CompanyInfoAction());
  }, [dispatch, id]);

  const { UserhandleSubmit, values, errors, handleOnchange } = UseForm(
    User_data,
    image
  );

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
      {!User?.isLoading || !id ? (
        <Container fixed>
          <Header name={id ? "Edit User" : "Add User"} SearchBar={false} />
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
                    error={errors?.name ? true : null}
                    type="text"
                    name="name"
                    id="outlined-name-text"
                    label="Name"
                    autoComplete="off"
                    defaultValue={id ? User_data?.name : ""}
                    onChange={(e) => handleOnchange(e)}
                    value={values?.name}
                  />
                  <p style={{ color: "red" }}>{errors?.name}</p>
                  <br />
                  <TextField
                    error={errors?.mobile_no ? true : null}
                    required
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    name="mobile_no"
                    label="Mobile No"
                    defaultValue={id ? User_data.mobile_no : ""}
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.mobile_no}
                    autoComplete="off"
                  />
                  <p style={{ color: "red" }}>{errors?.mobile_no}</p>
                  <br />
                  <TextField
                    error={errors?.company_id ? true : null}
                    id="outlined-select-currency-native"
                    select
                    name="company_id"
                    label="Company Name"
                    // defaultValue="select One"
                    defaultValue={id ? User_data.company_id : "select One"}
                    SelectProps={{
                      native: true,
                    }}
                    onChange={(e) => handleOnchange(e)}
                  >
                    <option>Select The Company</option>
                    {CompanyListData?.map((option) => (
                      <option key={option.value} value={option.company_id}>
                        {option.company_name}
                      </option>
                    ))}
                  </TextField>
                  <p style={{ color: "red" }}>{errors?.company_id}</p>
                  <br />
                  <TextField
                    error={errors?.role_id ? true : null}
                    id="outlined-select-currency-native-role_id"
                    select
                    name="role_id"
                    label="Role"
                    // defaultValue="select One"
                    defaultValue={id ? User_data.role_id : "select One"}
                    SelectProps={{
                      native: true,
                    }}
                    onChange={(e) => handleOnchange(e)}
                    value={values?.role_id}
                  >
                    <option>Select The Role </option>
                    {Role?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <p style={{ color: "red" }}>{errors?.role_id}</p>
                  <br />
                  <TextField
                    error={errors?.address ? true : null}
                    required
                    type="textarea"
                    name="address"
                    label="address"
                    defaultValue={id ? User_data.address : ""}
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.address}
                    autoComplete="off"
                  />
                  <p style={{ color: "red" }}>{errors?.address}</p>
                  <br />
                  <TextField
                    label="Email"
                    error={errors?.email ? true : null}
                    id="outlined-email-text"
                    name="email"
                    required
                    autoComplete="off"
                    type="text"
                    defaultValue={id ? User_data.email : ""}
                    onChange={(e) => handleOnchange(e)}
                    value={values?.email}
                  />
                  <p style={{ color: "red" }}>{errors?.email}</p>
                  <br />
                  <TextField
                    error={errors?.password ? true : null}
                    required
                    type="password"
                    name="password"
                    label="Password"
                    defaultValue={id ? User_data.password : ""}
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.password}
                    autoComplete="off"
                  />
                  <p style={{ color: "red" }}>{errors?.password}</p>
                  <br />
                  <TextField
                    error={errors?.confrom_password ? true : null}
                    required
                    type="password"
                    name="confrom_password"
                    label="Confrom Password"
                    defaultValue={id ? User_data?.confrom_password : ""}
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.confrom_password}
                    autoComplete="off"
                  />
                  <p style={{ color: "red" }}>{errors?.confrom_password}</p>
                  <br />
                  <img
                    alt=""
                    ref={uploadedImage}
                    style={{
                      height: "120px",
                      width: "120px",
                      display:
                        image || User_data?.productEdit?.image_src
                          ? "flex"
                          : "none",
                    }}
                    src={
                      User_data?.productEdit?.image_src
                        ? `http://localhost:3200/${User_data?.productEdit?.image_src}`
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
                      <AddIcon /> Upload User photo
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
                    onClick={UserhandleSubmit}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={UserhandleSubmit}
                  >
                    Submit
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    navigate("/userlist");
                  }}
                >
                  cancel
                </Button>
              </Stack>
              <br />
            </DialogContent>
            <ToastContainer limit={1} />
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

export default AddUser;
