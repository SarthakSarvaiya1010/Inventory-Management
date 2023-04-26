import React, { useEffect } from "react";
import AddProduct from "../../Components/Product/AddProduct/AddProduct";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SanckBar from "../../Helpers/SanckBar/SanckBar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddProductPage() {
  const ProductEditData = useSelector((state) => state?.ProductList);
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  useEffect(() => {
    if (ProductEditData?.SucessMessage?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/productlist");
      }, 2000);
    }
  }, [ProductEditData?.SucessMessage?.statusCode, navigate]);

  useEffect(() => {
    if (ProductEditData?.ErrorMessage?.statusCode === "400") {
      setState({ open: true, vertical: "top", horizontal: "center" });
    }
  }, [ProductEditData?.ErrorMessage?.statusCode]);
  console.log(
    "ProductEditData?.ErrorMessage?.statusCode",
    ProductEditData?.ErrorMessage
  );
  return (
    <div>
      <SanckBar
        alertMessage={ProductEditData?.SucessMessage?.message}
        alertErrorMessage={ProductEditData?.ErrorMessage?.message}
        state={state}
        setState={setState}
      />

      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        {ProductEditData?.SucessMessage?.message ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {ProductEditData?.SucessMessage?.message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {ProductEditData?.ErrorMessage?.message}
          </Alert>
        )}
      </Snackbar>
      <AddProduct />
    </div>
  );
}

export default AddProductPage;
