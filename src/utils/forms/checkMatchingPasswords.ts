import checkValidity from "./checkValidity";

export default (conPassField: HTMLInputElement, passwordValue: string) => {
  if (conPassField.value && passwordValue! !== conPassField.value) {
    conPassField.setAttribute("matching-passwords", "false");
    conPassField.setAttribute("aria-invalid", "false");
  } else {
    checkValidity(conPassField);
  }
};
