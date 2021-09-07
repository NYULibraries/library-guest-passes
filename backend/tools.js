const emptyFields = (obj) => {
  for (const key in obj) {
    if (obj[key] === "" && key !== "notes" && key !== "affiliate_name") return true;
  }
  return false;
};

module.exports = {
  emptyFields,
};
