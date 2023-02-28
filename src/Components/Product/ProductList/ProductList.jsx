import React, { useEffect, useState } from "react";
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
import UsePagination from "../../../Helpers/pagination/Pagination";

function ProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const productData = useSelector((state) => state?.ProductList);
  const products = useSelector((state) => state?.ProductList?.productList);
  let limit = 2;
  const [search, setSearch] = useState();
  const [pageNumber, setPageNumber] = useState();
  const [shorting, setShorting] = useState();
  const [shortingIcon, setShortingIcon] = useState("Sr. No");
  const data = [];
  console.log("products", products);
  console.log("pageNumber", pageNumber);

  console.log("productData", productData, "test");
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  useEffect(() => {
    if (productData?.SuccessProductDeleteData?.statusCode === "200") {
      alert("Sucessfully product deleted");
      window.location.reload();
    }
  }, [productData?.SuccessProductDeleteData?.statusCode]);

  useEffect(() => {
    dispatch(
      ProductListAction(
        successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
        { limit: limit, pageNumber: pageNumber, orderByString: shorting }
      )
    );
  }, [
    accessToken?.accessToken,
    dispatch,
    limit,
    pageNumber,
    shorting,
    successLoginData?.LoginData?.accessToken,
  ]);

  // eslint-disable-next-line array-callback-return
  productData.productList.map((e) => {
    let elements = {};
    elements["Sr. No"] = e.sr_no < 10 ? ` 0${e.sr_no}` : e.sr_no;
    elements["Product Name"] = e.product_name;
    elements["HSN"] = e.hsn;
    elements["Weight [ In Grams ]"] = e.weight;
    elements["Image"] = e.image_src;

    data.push(elements);
  });

  const headalEdit = (data) => {
    navigate(`/product/edit/${productData.productList[data - 1]?.product_id}`);
  };

  const headalDelete = (data) => {
    if (window.confirm("Are you sure you want to Delete this Product?")) {
      dispatch(
        ProductDeleteAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
          productData.productList[data - 1]?.product_id
        )
      );
    }
    // window.location.reload();
  };

  const searchHeadal = (e) => {
    setSearch(e.target.value);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        ProductListAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
          { search: search, limit: limit, pageNumber: pageNumber }
        )
      );
    }
  };
  console.log(search);
  console.log("setShortingData", shorting);

  const headalShorting = (data_a) => {
    shortingIcon === data_a ? setShortingIcon(null) : setShortingIcon(data_a);
    switch (data_a) {
      case "Sr. No":
        if (shorting === "sr_no") {
          setShorting(null);
        } else {
          setShorting("sr_no");
        }
        return "done";
      case "Product Name":
        if (shorting === "product_name") {
          setShorting(null);
        } else {
          setShorting("product_name");
        }
        return "done";
      case "HSN":
        if (shorting === "hsn") {
          setShorting(null);
        } else {
          setShorting("hsn");
        }
        return "done";
      case "Weight [ In Grams ]":
        if (shorting === "weight") {
          setShorting(null);
        } else {
          setShorting("weight");
        }
        return "done";
      default:
        setShorting(null);
        return " state";
    }
  };

  return (
    <div>
      {products?.length ? (
        <Container fixed sx={{ Width: 100 }}>
          <Header
            name={"Product List"}
            SearchBar={true}
            searchHeadal={searchHeadal}
            onKeyDown={onKeyDown}
          />
          <Container fixed sx={{ backgroundColor: "#EAEFF2", Width: 150 }}>
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
            {products?.length ? (
              <Table
                data={data}
                headalEdit={headalEdit}
                headalDelete={headalDelete}
                headalShorting={headalShorting}
                ShortingHide={shortingIcon}
              />
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
            <Stack
              sx={{
                margin: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                padding: "20px  0 20px 20px",
              }}
            >
              <UsePagination
                countNumbuer={Math.ceil(
                  productData?.productList[0]?.total_count / limit
                )}
                PageNumber={setPageNumber}
                currentPage={pageNumber}
              />
            </Stack>
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
