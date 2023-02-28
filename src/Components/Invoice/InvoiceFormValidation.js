export default function InvoiceValidate(values, addtable) {
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
  if (!values?.productdata[addtable - 1]?.weight) {
    errors.weight = "weight is required ";
  }
  if (!values?.productdata[addtable - 1]?.rate) {
    errors.rate = "rate is required ";
  }
  if (!values?.productdata[addtable - 1]?.amount) {
    errors.amount = "amount is required ";
  }

  return errors;
}
