import React, { useEffect } from "react";
// import data from "../../../dummy/data.json";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductListAction,
  ProductDeleteAction,
} from "../../../Store/Action/ProductAction/index";
import CircularProgress from "@mui/material/CircularProgress";

function ProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const productData = useSelector((state) => state?.ProductList);
  console.log("successLoginData", productData);
  const tableData = [];
  const findActiveproduct = productData?.productList.filter(
    (data) => data.delete_flag === "1"
  );
  // eslint-disable-next-line array-callback-return
  findActiveproduct?.map((e) => {
    let test = {};
    test["Product Name"] = e.product_name;
    test["HSN"] = e.hsn;
    test["Weight [In Grams]"] = e.weight;
    tableData.push(test);
  });
  console.log(findActiveproduct, "test");
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  useEffect(() => {
    if (successLoginData?.LoginData?.accessToken || accessToken?.accessToken) {
      dispatch(
        ProductListAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken
        )
      );
    }
  }, [
    accessToken?.accessToken,
    dispatch,
    successLoginData?.LoginData?.accessToken,
  ]);

  const headalEdit = (data) => {
    console.log("data", data, findActiveproduct[data - 1]?.product_id);
    navigate(`/product/edit/${findActiveproduct[data - 1]?.product_id}`);
  };

  const headalDelete = (data) => {
    console.log("data", findActiveproduct[data - 1]?.product_id);
    dispatch(
      ProductDeleteAction(
        successLoginData?.LoginData?.accessToken,
        findActiveproduct[data - 1]?.product_id
      )
    );
    window.location.reload();
  };
  return (
    <div>
      {productData?.productList.length ? (
        <Container fixed>
          <Header name={"Product List"} SearchBar={true} />
          <Container fixed sx={{ backgroundColor: "#EAEFF2" }}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
              spacing={4}
              sx={{ p: 4 }}
            >
              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/addproduct");
                }}
              >
                add product
              </Button>

              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/deletedproduct");
                }}
              >
                view deleted products
              </Button>
            </Stack>

            <Table
              data={tableData}
              headalEdit={headalEdit}
              headalDelete={headalDelete}
            />
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

export default ProductList;
