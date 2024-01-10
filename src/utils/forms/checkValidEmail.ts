import emailRegex from "@constants/emailRegex";
import checkValidity from "./checkValidity";

export default (emailField: HTMLInputElement) => {
  if (!emailRegex.test(emailField.value)) {
    emailField.setAttribute("aria-invalid", "true");
    emailField.setCustomValidity("Invalid Email");
  } else {
    emailField.validationMessage && emailField.setCustomValidity("");
    checkValidity(emailField);
  }
};
