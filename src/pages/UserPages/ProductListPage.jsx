import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductLisit from "../../Components/Product/ProductList/ProductList";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProductListPage() {
  const productData = useSelector((state) => state?.ProductList);
  const navigate = useNavigate();
  const [openD, setOpenD] = React.useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  useEffect(() => {
    if (productData?.SuccessMessageProductDelete?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/productlist");
        window.location.reload();
      }, 2000);
    }
  }, [productData?.SuccessMessageProductDelete?.statusCode, navigate]);

  useEffect(() => {
    if (productData?.ErrorMessage?.statusCode === "403") {
      setOpenD(true);
    }
  }, [productData?.ErrorMessage?.statusCode, navigate]);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {productData?.SuccessMessageProductDelete?.message}
        </Alert>
      </Snackbar>
      <DialogBox open={openD} DialogText={"Session is expired please logIn"} />
      {openD ? null : <ProductLisit />}
    </div>
  );
}

export default ProductListPage;
