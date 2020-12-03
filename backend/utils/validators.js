const validatorLink = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
const validatorEmail = function (email) {
  const re = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/;
  return re.test(email);
};
module.exports = { validatorLink, validatorEmail };
