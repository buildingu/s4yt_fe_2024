import uuidRegex from "@constants/uuidRegex";
import checkValidity from "./checkValidity";

export default (playerIdField: HTMLInputElement) => {
  if (!uuidRegex.test(playerIdField.value)) {
    playerIdField.setAttribute("aria-invalid", "true");
    playerIdField.setCustomValidity("Invalid Player Id");
  } else {
    playerIdField.validationMessage && playerIdField.setCustomValidity("");
    checkValidity(playerIdField);
  }
};
