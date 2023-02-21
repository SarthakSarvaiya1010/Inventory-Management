import React, { useEffect, useState } from "react";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  TaxListAction,
  TaxDeleteAction,
} from "../../../Store/Action/TaxAction/index";
import CircularProgress from "@mui/material/CircularProgress";
import UsePagination from "../../../Helpers/paginetion/Paginetion";

function TaxList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const TaxData = useSelector((state) => state?.TaxData);
  let limit = 2;
  const [search, setSearch] = useState();
  const [pageNumber, setPageNumber] = useState();
  const data = [];
  console.log("TaxData", TaxData?.TaxDeleteSuccessData?.statusCode);

  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  TaxData?.TaxList.map((e) => {
    let elements = {};
    elements["Sr.No"] = e.sr_no;
    elements["Tax Name"] = e.tax_name;
    elements["Tax Rate [ In % ]"] = e.tax_rate;
    elements["Tax Country"] = e.tax_country;
    elements["Active"] = e.isactive;
    data.push(elements);
  });

  // useEffect(() => {
  //   if (TaxData?.TaxDeleteSuccessData?.statusCode == "200") {
  //     alert("Sucessfully Tax delete");
  //     window.location.reload();
  //   }
  // }, [TaxData?.TaxDeleteSuccessData?.StatusCode]);
  useEffect(() => {
    if (successLoginData?.LoginData?.accessToken || accessToken?.accessToken) {
      dispatch(
        TaxListAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken
        )
      );
    }
  }, [
    accessToken?.accessToken,
    dispatch,
    successLoginData?.LoginData?.accessToken,
  ]);
  // eslint-disable-next-line array-callback-return

  const headalDelete = (data) => {
    if (window.confirm("Are you sure you want to Delete this Tax?")) {
      dispatch(
        TaxDeleteAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
          TaxData?.TaxList[data - 1]?.tax_id
        )
      );
    }
  };
  const headalEdit = (data) => {
    navigate(`/tax/edit/${TaxData?.TaxList[data - 1]?.tax_id}`);
  };

  useEffect(() => {
    dispatch(
      TaxListAction(
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
        TaxListAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
          { search: search, limit: limit, pageNumber: pageNumber }
        )
      );
    }
  };
  console.log(search);

  return (
    <div>
      {" "}
      {TaxData?.TaxList.length ? (
        <Container fixed>
          <Header
            name={"Tax List"}
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
                  navigate("/addtax");
                }}
              >
                add new tax
              </Button>

              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/deletedtax");
                }}
              >
                view deleted Tax
              </Button>
            </Stack>
            <Table
              data={data}
              headalEdit={headalEdit}
              headalDelete={headalDelete}
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
                  TaxData?.TaxList[0]?.total_count / limit
                )}
                PageNumber={setPageNumber}
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

export default TaxList;
