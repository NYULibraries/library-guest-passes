const emptyFields = (obj) => {
  for (const key in obj){
    if(obj[key] === "" && key !== 'notes') return false;
  };
  return true;
};

module.exports = {
  emptyFields
}