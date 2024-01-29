import checkValidity from "./checkValidity";

export default (docLinkField: HTMLInputElement) => {
  const linkPattern =
      /^https:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)\/?/,
    injectionChecker = /<\s*script.*?\/?\s*>|on\w+\s*=\s*".*?"/i;

  if (
    linkPattern.test(docLinkField.value) &&
    !injectionChecker.test(docLinkField.value)
  ) {
    docLinkField.validationMessage && docLinkField.setCustomValidity("");
    checkValidity(docLinkField);
  } else {
    docLinkField.setAttribute("aria-invalid", "true");
    docLinkField.setCustomValidity("Invalid Player Id");
  }
};
