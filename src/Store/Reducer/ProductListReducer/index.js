import { PRODUCT_LIST } from "../../ActionTypes";

const initialstate = {
  productList: [],
};

const ProductListReducer = (state = initialstate, action) => {
  switch (action.type) {
    case PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
      };
    // case FAILED_ADMIN_LIST:
    //   return {
    //     ...state,
    //     AutherationError: action.payload.data,
    //   };

    default:
      return state;
  }
};
export default ProductListReducer;
