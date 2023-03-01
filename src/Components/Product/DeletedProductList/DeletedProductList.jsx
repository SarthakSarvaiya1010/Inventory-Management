import React, { useEffect, useState } from "react";
// import data from "../../../dummy/data.json";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductDeleteListAction,
  PermanentProductDelete,
} from "../../../Store/Action/ProductAction/index";
import CircularProgress from "@mui/material/CircularProgress";
import UsePagination from "../../../Helpers/pagination/Pagination";
import DialogBox from "../../../Helpers/DialogBox/DialogBox";

function DeletedProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = [];
  const [open, setOpen] = React.useState(false);

  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const [pageNumber, setPageNumber] = useState();
  let limit = 2;
  const [shorting, setShorting] = useState();
  const [shortingIcon, setShortingIcon] = useState("Sr. No");
  const [search, setSearch] = useState();

  const productData = useSelector((state) => state?.ProductList);
  console.log("productData", productData?.SucessPermanentDeleteData);
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  useEffect(() => {
    if (productData?.SucessPermanentDeleteData?.statusCode === "200") {
      alert("Sucessfully product deleted");
      window.location.reload();
    }
  });
  useEffect(() => {
    if (successLoginData?.LoginData?.accessToken || accessToken?.accessToken) {
      dispatch(
        ProductDeleteListAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken
        )
      );
    }
  }, [
    accessToken?.accessToken,
    dispatch,
    successLoginData?.LoginData?.accessToken,
  ]);

  useEffect(() => {
    dispatch(
      ProductDeleteListAction(
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
  const searchHeadal = (e) => {
    setSearch(e.target.value);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        ProductDeleteListAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
          { search: search, limit: limit, pageNumber: pageNumber }
        )
      );
    }
  };
  const headalEdit = (data) => {
    console.log("data", data, productData?.productDeletList[data - 1]);
    navigate(
      `/product/edit/${productData?.productDeletList[data - 1]?.product_id}`
    );
  };

  // eslint-disable-next-line array-callback-return
  productData.productDeletList.map((e) => {
    let elements = {};
    elements["Sr. No"] = e.sr_no < 10 ? ` 0${e.sr_no}` : e.sr_no;
    elements["Product Name"] = e.product_name;
    elements["Price"] = e?.price || "--";
    elements["HSN"] = e.hsn;
    elements["Weight [ In Grams ]"] = e.weight;

    data.push(elements);
  });

  const headalShorting = (data_a) => {
    shortingIcon === data_a
      ? setShortingIcon("Sr. No")
      : setShortingIcon(data_a);
    switch (data_a) {
      case "Sr. No":
        if (shorting === "ASC/sr_no") {
          setShorting(null);
        } else {
          setShorting("DESC/sr_no");
        }
        return "done";
      case "Product Name":
        if (shorting === "ASC/product_name") {
          setShorting("DESC/product_name");
        } else {
          setShorting("ASC/product_name");
        }
        return "done";
      case "HSN":
        if (shorting === "ASC/hsn") {
          setShorting("DESC/hsn");
        } else {
          setShorting("ASC/hsn");
        }
        return "done";
      case "Weight [ In Grams ]":
        if (shorting === "ASC/weight") {
          setShorting("DESC/weight");
        } else {
          setShorting("ASC/weight");
        }
        return "done";
      default:
        setShorting(null);
        return " state";
    }
  };
  const headalDelete = (data) => {
    setOpen(data);
  };
  const finalDelete = () => {
    setOpen(false);
    dispatch(
      PermanentProductDelete(
        successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
        productData.productDeletList[open - 1]?.product_id
      )
    );
  };

  return (
    <div>
      <DialogBox
        setOpen={setOpen}
        open={open}
        DialogText={"Are you sure you want to Delete this Product?"}
        finalDelete={finalDelete}
      />
      {productData?.DeletedProductListLoader ? (
        productData?.productDeletList.length ? (
          <Container fixed>
            <Header
              name={"Delete Product List"}
              SearchBar={true}
              searchHeadal={searchHeadal}
              onKeyDown={onKeyDown}
            />
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
                    navigate("/productList");
                  }}
                >
                  back
                </Button>

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
              </Stack>
              <Table
                data={data}
                headalEdit={headalEdit}
                headalDelete={headalDelete}
                hide={true}
                headalShorting={headalShorting}
                ShortingHide={shortingIcon}
              />
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
                    productData?.productDeletList[0]?.total_count / limit
                  )}
                  PageNumber={setPageNumber}
                />
              </Stack>
            </Container>
          </Container>
        ) : (
          <Container fixed>
            <Header
              name={"Delete Product List"}
              SearchBar={false}
              searchHeadal={searchHeadal}
              onKeyDown={onKeyDown}
            />
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
                    navigate("/productList");
                  }}
                >
                  back
                </Button>

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
              </Stack>
              <h1 style={{ textAlign: "center", color: "red", margin: 0 }}>
                No any record found of Deleted Product
              </h1>
            </Container>
          </Container>
        )
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

export default DeletedProductList;
