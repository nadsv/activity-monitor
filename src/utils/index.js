import { Notify, date } from "quasar";

export const showError = (text, error) => {
  Notify.create({
    message: `${text}: ${error}`,
    color: "negative",
    timeout: 2000,
  });
};

export const showMessage = (message) => {
  Notify.create({
    message: message,
    color: "info",
    timeout: 2000,
  });
};

export const formatedToday = () => {
  return date.formatDate(new Date(), "YYYY/MM/DD");
};

export const calcDate = (diff) => {
  const newDate = date.addToDate(new Date(), diff);
  return date.formatDate(newDate, "YYYY/MM/DD");
};

export const deepCopyFunction = (inObject) => {
  let outObject, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value);
  }

  return outObject;
};

export const isValidEmail = (email) => {
  const pattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return pattern.test(email) || "Invalid email";
};

export const isValidPassword = (password) => {
  const pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
  return pattern.test(password) || "Invalid password";
};
