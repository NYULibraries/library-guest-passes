const emptyFields = (obj) => {
  for (const key in obj) {
    if (obj[key] === "" && key !== "notes") return true;
  }
  return false;
};

module.exports = {
  emptyFields,
};
