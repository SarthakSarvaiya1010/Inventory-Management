export function validate(values) {
  let errors = {};
  console.log("values=====>", values);
  if (!values?.product_name) {
    errors.product_name = "product name is required";
  }

  if (!values?.product_type) {
    errors.product_type = "product type is required";
  }
  if (!values?.weight) {
    errors.weight = "weight is required";
  }
  if (!values?.hsn) {
    errors.hsn = "HSN is required";
  }

  return errors;
}
