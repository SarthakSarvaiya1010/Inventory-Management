export default function InvoiceValidate(values, addtable) {
  console.log("values======>", values, addtable);
  let errors = {};
  if (!values?.bill_no) {
    errors.bill_no = "bill_no is required";
  }

  if (!values?.invoice_date) {
    errors.invoice_date = "Please select date";
  }
  if (!values?.customer_id) {
    errors.customer_id = "Please Select Mobile Number ";
    errors.customer_name = "customer name is required";
    errors.customer_address = "customer address is required";
  }
  if (!values?.productdata[addtable - 1]?.product_id) {
    errors.product_id = "Please Select Product ";
  }
  if (
    !values?.productdata[addtable - 1]?.weight ||
    values?.productdata[addtable - 1]?.weight == "NaN"
  ) {
    errors.weight = "weight is required ";
  }
  if (
    !values?.productdata[addtable - 1]?.rate ||
    values?.productdata[addtable - 1]?.rate == "NaN"
  ) {
    errors.rate = "rate is required ";
  }
  if (
    !values?.productdata[addtable - 1]?.amount ||
    values?.productdata[addtable - 1]?.amount == "NaN"
  ) {
    errors.amount = "amount is required ";
  }

  // eslint-disable-next-line array-callback-return
  values?.productdata?.map((data, index) => {
    if (values?.productdata[index]?.weight) {
      errors.weight = "weight is required ";
    }
    if (!values?.productdata[index]?.product_id) {
      errors.product_id = "Please Select Product ";
    }
    if (!values?.productdata[index]?.rate) {
      errors.rate = "rate is required ";
    }
  });

  return errors;
}
