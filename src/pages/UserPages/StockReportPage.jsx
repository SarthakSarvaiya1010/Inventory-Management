import React, { useEffect } from "react";
import StockReportList from "../../Components/StockReport/StockReportList/StockReportList";
import { useSelector } from "react-redux";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";

function StockReportPage() {
  const StockReport = useSelector((state) => state?.StockReport);
  const [openD, setOpenD] = React.useState(false);
  useEffect(() => {
    if (StockReport?.ErrorMessage?.statusCode === "403") {
      setOpenD(true);
    }
  }, [StockReport?.ErrorMessage?.statusCode]);
  return (
    <div>
      <DialogBox open={openD} DialogText={"Session is expired please logIn"} />
      {openD ? null : <StockReportList />}
    </div>
  );
}

export default StockReportPage;
