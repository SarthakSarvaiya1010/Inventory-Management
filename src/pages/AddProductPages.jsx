import React, { useEffect } from "react";
import AddProduct from "../Components/Product/AddProduct/AddProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function AddProductPage() {
  const ProductEditData = useSelector((state) => state?.ProductList);
  const showToastMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  useEffect(() => {
    if (ProductEditData?.SucessAddProduct?.statusCode === "200") {
      showToastMessage(ProductEditData?.SucessAddProduct?.message);
    }
  }, [
    ProductEditData?.SucessAddProduct?.message,
    ProductEditData?.SucessAddProduct?.statusCode,
  ]);
  useEffect(() => {
    if (ProductEditData?.SucessEditProduct?.statusCode === "200") {
      showToastMessage(ProductEditData?.SucessEditProduct?.message);
    }
  }, [
    ProductEditData?.SucessEditProduct?.message,
    ProductEditData?.SucessEditProduct?.statusCode,
  ]);
  return (
    <div>
      <ToastContainer />
      <AddProduct />
    </div>
  );
}

export default AddProductPage;
