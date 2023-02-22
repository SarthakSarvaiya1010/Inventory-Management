import { PRODUCT_LIST } from "../../ActionTypes";

const initialstate = {
  productList: [],
  loder: true,
};

const ProductListReducer = (state = initialstate, action) => {
  switch (action.type) {
    case PRODUCT_LIST:
      // console.log("productData", state.loder);
      return {
        ...state,
        productList: action.payload,
        loder: false,
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
