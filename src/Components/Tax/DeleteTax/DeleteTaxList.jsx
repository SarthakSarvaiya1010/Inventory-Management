import React, { useEffect, useState } from "react";
// import data from "../../../dummy/data.json";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  TaxDelectListAction,
  PermanentTaxDeleteAction,
} from "../../../Store/Action/TaxAction/index";
import CircularProgress from "@mui/material/CircularProgress";
import UsePagination from "../../../Helpers/paginetion/Paginetion";

function DeletedTaxList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = [];

  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const TaxData = useSelector((state) => state?.TaxData);
  console.log("successLoginData", TaxData);
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  useEffect(() => {
    if (successLoginData?.LoginData?.accessToken || accessToken?.accessToken) {
      dispatch(
        TaxDelectListAction(
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
    console.log("data", data, TaxData?.productDeletList[data - 1]);
    navigate(
      `/product/edit/${TaxData?.productDeletList[data - 1]?.product_id}`
    );
  };

  // eslint-disable-next-line array-callback-return
  TaxData?.TaxDeletList.map((e) => {
    let elements = {};
    elements["Sr.No"] = e.sr_no;
    elements["Tax Name"] = e.tax_name;
    elements["Tax Rate [ In % ]"] = e.tax_rate;
    elements["Tax Country"] = e.tax_country;
    data.push(elements);
  });
  let limit = 2;
  const [search, setSearch] = useState();
  const [pageNumber, setPageNumber] = useState();

  useEffect(() => {
    dispatch(
      TaxDelectListAction(
        successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
        { limit: limit, pageNumber: pageNumber }
      )
    );
  }, [
    accessToken?.accessToken,
    dispatch,
    limit,
    pageNumber,
    successLoginData?.LoginData?.accessToken,
  ]);

  const searchHeadal = (e) => {
    setSearch(e.target.value);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        TaxDelectListAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
          { search: search, limit: limit, pageNumber: pageNumber }
        )
      );
    }
  };
  const headalDelete = (data) => {
    if (window.confirm("Are you sure you want to Delete this Tax?")) {
      dispatch(
        PermanentTaxDeleteAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
          TaxData?.TaxDeletList[data - 1]?.tax_id
        )
      );
    }
  };

  return (
    <div>
      {TaxData?.TaxDeletList?.length ? (
        <Container fixed>
          <Header
            name={"Deleted Tax List"}
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
                  navigate("/TaxList");
                }}
              >
                back
              </Button>

              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/addtax");
                }}
              >
                add Tax
              </Button>
            </Stack>
            <Table
              data={data}
              headalDelete={headalDelete}
              headalEdit={headalEdit}
              hide={true}
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
                  TaxData?.TaxDeletList[0]?.total_count / limit
                )}
                PageNumber={setPageNumber}
              />
            </Stack>
          </Container>
        </Container>
      ) : (
        <Container fixed>
          <Header
            name={"Deleted Tax List"}
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
                  navigate("/TaxList");
                }}
              >
                back
              </Button>

              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/addtax");
                }}
              >
                add Tax
              </Button>
            </Stack>
            <h1 style={{ color: "red", textAlign: "center", padding: "5px" }}>
              No Any Record OF Deleted Tax
            </h1>
          </Container>
        </Container>
      )}
    </div>
  );
}

export default DeletedTaxList;
