import validator from "validator";

import isEmpty from "./isEmpty.js";

const validateHistory = (data) => {
  let errors = {};

  if (isEmpty(data.prompt)) {
    errors.prompt = "Missing prompt data";
  } else if (validator.isLength(data.prompt, { min: 1, max: 300 })) {
    errors.prompt = "Prompt must be between 1 and 300 characters long";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateHistory;
