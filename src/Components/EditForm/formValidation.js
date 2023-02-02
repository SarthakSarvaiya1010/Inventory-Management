export function validate(values, Product_data) {
  let errors = {};
  console.log(
    "values=====>",
    values,
    Product_data,
    Product_data?.product_name,
    !values?.product_name && !Product_data?.product_name
  );
  if (!values?.product_name && !Product_data?.product_name) {
    alert(Product_data?.product_name);
    errors.product_name = "product name is required";
  }

  if (!values?.product_type && !Product_data?.product_type) {
    errors.product_type = "product type is required";
  }
  if (!values?.weight && !Product_data?.weight) {
    errors.weight = "weight is required";
  }
  if (!values?.hsn && !Product_data?.hsn) {
    errors.hsn = "HSN is required";
  }

  return errors;
}
