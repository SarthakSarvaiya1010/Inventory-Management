import {
  PRODUCT_LIST,
  LIST_LOADER,
  PRODUCT_EDIT,
  PRODUCT_ADD,
  PRODUCT_DELETE,
  PRODUCT_EDIT_DATA,
  PRODUCT_DELETE_LIST,
  PERMANENT_PRODUCT_DELETE,
} from "../../ActionTypes";

const initialstate = {
  Loader: false,
  loder: true,
  productList: [],
  productEdit: [],
  productDeletList: [],
  SucessAddProduct: [],
  SucessEditProduct: [],
  SuccessProductDeleteData: [],
  DeletedProductListLoader: false,
  SucessPermanentDeleteData: [],
};

const ProductListReducer = (state = initialstate, action) => {
  console.log("actionpayload=======>", action.payload);
  switch (action.type) {
    case LIST_LOADER:
      return {
        ...state,
        productList: action.payload,
        Loader: true,
      };
    case PRODUCT_LIST:
      console.log("actionpayload", action.payload);
      return {
        ...state,
        productList: action.payload,
        productEdit: [],
        SucessEditProduct: [],
        SucessAddProduct : [],
        Loader: false,
        loder: true,
      };
    case PRODUCT_EDIT:
      return {
        ...state,
        productEdit: action.payload,
        loder: false,
      };
    case PRODUCT_ADD:
      return {
        ...state,
        SucessAddProduct: action.payload,
      };
    case PRODUCT_DELETE:
      return {
        ...state,
        SuccessProductDeleteData: action.payload,
      };
    case PRODUCT_EDIT_DATA:
      return {
        ...state,
        SucessEditProduct: action.payload,
      };
    case PRODUCT_DELETE_LIST:
      return {
        ...state,
        productDeletList: action.payload,
        DeletedProductListLoader: true,
      };
    case PERMANENT_PRODUCT_DELETE:
      return {
        ...state,
        SucessPermanentDeleteData: action.payload,
      };
    default:
      return state;
  }
};
export default ProductListReducer;
