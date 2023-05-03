import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import ProductSlice from "./Redux/ProductRedux/ProductSlice";
import UserLoginSlice from "./Redux/AuthSlice";
import TaxSlice from "./Redux/TaxRedux/TaxSlice";
import CustomerSlice from "./Redux/CustomerRedux/CustomerSlice";
import InvoiceSlice from "./Redux/InvoiceRedux/InvoiceSlice";
import CompanySlice from "./Redux/CompanyRedux/CompanySlice";
import UserSlice from "./Redux/UserReduk/UserSlice";
import PurchaseBillSlice from "./Redux/PurchaseBillRedux/PurchaseBillSlice";
import StockReportSlice from "./Redux/StockReportRedux/StockReportSlice";
import BankSlice from "./Redux/BankRedux/BankSlice";
import BankInfoSlice from "./Redux/BankInfoRedux/BankInfoSlice";
export const store = configureStore({
  reducer: {
    ProductList: ProductSlice,
    UserLoginReducer: UserLoginSlice,
    TaxData: TaxSlice,
    CustomerList: CustomerSlice,
    InvoiceData: InvoiceSlice,
    CompanyInfo: CompanySlice,
    User: UserSlice,
    PurchaseData: PurchaseBillSlice,
    StockReport: StockReportSlice,
    BankData: BankSlice,
    BankInfoData: BankInfoSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
