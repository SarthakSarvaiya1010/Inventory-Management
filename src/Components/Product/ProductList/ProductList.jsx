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
} from "../../../Redux/ProductRedux/ProductThunk";
import CircularProgress from "@mui/material/CircularProgress";
import UsePagination from "../../../Helpers/pagination/Pagination";
import DialogBox from "../../../Helpers/DialogBox/DialogBox";

function ProductList() {
  const navigate = useNavigate(null);
  const dispatch = useDispatch(null);
  const [open, setOpen] = useState(false);
  const productData = useSelector((state) => state?.ProductList);
  const products = useSelector((state) => state?.ProductList?.productList);
  let limit = 4;
  const [search, setSearch] = useState(null);
  const [pageNumber, setPageNumber] = useState();
  const [shorting, setShorting] = useState(null);
  const [shortingIcon, setShortingIcon] = useState("Sr. No");
  const data = [];

  useEffect(() => {
    dispatch(
      ProductListAction({
        limit: limit,
        pageNumber: pageNumber,
        orderByString: shorting,
        search: search || null,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, limit, pageNumber, shorting]);

  // eslint-disable-next-line array-callback-return
  productData?.productList?.map((e) => {
    let elements = {};
    elements["Sr. No"] = e.sr_no < 10 ? ` 0${e.sr_no}` : e.sr_no;
    elements["Product Name"] = e.product_name;
    elements["HSN"] = e.hsn;
    elements["Weight [ In Grams ]"] = e.weight;

    data.push(elements);
  });

  const headalEdit = (data) => {
    navigate(`/product/edit/${productData.productList[data - 1]?.product_id}`);
  };

  const headalDelete = (data) => {
    setOpen(data);

    // window.location.reload();
  };
  const finalDelete = () => {
    setOpen(false);
    dispatch(
      ProductDeleteAction(productData.productList[open - 1]?.product_id)
    );
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        ProductListAction({
          search: search,
          limit: limit,
          pageNumber: pageNumber,
        })
      );
    }
  };

  const headalShorting = (data_a) => {
    shortingIcon === data_a
      ? setShortingIcon(`D ${data_a}`)
      : setShortingIcon(data_a);
    switch (data_a) {
      case "Sr. No":
        if (shorting === "sr_no") {
          setShorting(null);
        } else {
          setShorting("sr_no");
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

  return (
    <div>
      <DialogBox
        setOpen={setOpen}
        open={open}
        DialogText={"Are you sure you want to Delete this Product?"}
        finalDelete={finalDelete}
      />
      {!productData.isLoading ? (
        <Container fixed sx={{ Width: 100 }}>
          <Header
            name={"Product List"}
            SearchBar={true}
            searchHeadal={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={onKeyDown}
            search={search}
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
              <Container fixed sx={{ backgroundColor: "#EAEFF2" }}>
                <h1 style={{ textAlign: "center", color: "red", margin: 0 }}>
                  No any record found of search Product
                </h1>
              </Container>
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
