import {
  PRODUCT_EDIT,
  PRODUCT_LIST,
  PRODUCT_ADD,
  PRODUCT_DELETE,
  PRODUCT_EDIT_DATA,
} from "../../ActionTypes";

const initialstate = {
  productEdit: [],
  loder: true,
};

const ProductEditReducer = (state = initialstate, action) => {
  switch (action.type) {
    case PRODUCT_EDIT:
      return {
        ...state,
        productEdit: action.payload,
        loder: false,
      };
    case PRODUCT_LIST:
      return {
        ...state,
        loder: true,
      };
    case PRODUCT_ADD:
      return {
        ...state,
        ...action.payload,
      };
    case PRODUCT_DELETE:
      return {
        ...state,
        ...action.payload,
      };
    case PRODUCT_EDIT_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default ProductEditReducer;
