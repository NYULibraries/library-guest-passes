// If the value of a querystring parameter is blank
// and the key is not optional, return true
const emptyFields = (obj) => {
  const optionalFields = ["notes", "affiliate_name"]
  for (const key in obj) {
    if (obj[key] === "" && !optionalFields.includes(key)) return true;
  }
  return false;
};

module.exports = {
  emptyFields,
};
