import ProductListReducer from "./ProductListReducer/index";
import CustomerListReducer from "./CustomerListReducer/index";
import ProductEditReducer from "./ProductEditReducer/index";
import CustomerEditReducer from "./CustomerEditReducer/index";
import UserLoginReducer from "./UserLogin/index";
import TaxReducer from "./TaxReaducer/index";

import { combineReducers } from "redux";
const RootReducer = combineReducers({
  UserLoginReducer: UserLoginReducer,
  ProductList: ProductListReducer,
  CustomerList: CustomerListReducer,
  ProductEdit: ProductEditReducer,
  CustomerEdit: CustomerEditReducer,
  TaxData: TaxReducer,
});
export default RootReducer;
