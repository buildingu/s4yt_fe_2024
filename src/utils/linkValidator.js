const linkValidator = (link) => {
  const linkPattern =
    /^https:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)\/?/;
  const injectionChecker = /<\s*script.*?\/?\s*>|on\w+\s*=\s*".*?"/i;
  if (linkPattern.test(link) && !injectionChecker.test(link)) {
    return true;
  } else {
    return false;
  }
};

export default linkValidator;
  