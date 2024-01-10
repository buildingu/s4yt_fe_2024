export default (field: HTMLInputElement | HTMLSelectElement) => {
  field.setAttribute("aria-invalid", field.validity.valid ? "false" : "true");
};
