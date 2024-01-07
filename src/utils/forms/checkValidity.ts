export default (field: HTMLInputElement | HTMLSelectElement) => {
  field.setAttribute("data-valid", field.validity.valid ? "true" : "false");
  field.setAttribute("aria-invalid", field.validity.valid ? "true" : "false");
};
