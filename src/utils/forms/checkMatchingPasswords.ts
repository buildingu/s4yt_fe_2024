import checkValidity from "./checkValidity";

export default (conPassField: HTMLInputElement, passwordValue: string) => {
  if (conPassField.value && passwordValue! !== conPassField.value) {
    conPassField.setAttribute("matching-passwords", "false");
    conPassField.setAttribute("aria-invalid", "false");
    conPassField.setCustomValidity("Non matching passwords");
  } else {
    conPassField.validationMessage && conPassField.setCustomValidity("");
    checkValidity(conPassField);
  }
};
