export function ProductValidate(values, Product_data) {
  let errors = {};
  console.log(
    "values=====>",
    values,
    Product_data,
    Product_data?.product_name,
    !values?.product_name && !Product_data?.product_name
  );
  if (!values?.product_name && !Product_data?.product_name) {
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

export function CustomerValidate(values, data) {
  let errors = {};

  if (!values?.customer_name && !data?.customer_name) {
    errors.customer_name = " name is required";
  }

  if (!values?.mobile_no && !data?.mobile_no) {
    errors.mobile_no = "product type is required";
  }

  if (!values?.address && !data?.address) {
    errors.address = "HSN is required";
  }

  return errors;
}
export function TaxValidate(values, data) {
  let errors = {};

  if (!values?.tax_name && !data[0]?.tax_name) {
    errors.tax_name = " tax name is required";
  }

  if (!values?.tax_rate && !data[0]?.tax_rate) {
    errors.tax_rate = "Tax_Rate  is required";
  }

  if (!values?.tax_country && !data[0]?.tax_country) {
    errors.tax_country = "tax_country is required";
  }

  return errors;
}
