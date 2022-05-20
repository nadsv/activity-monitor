import { Notify } from "quasar";

export const showError = (text, error) => {
  Notify.create({
    message: `${text}: ${error}`,
    color: "negative",
    timeout: 2000,
  });
};

export const formatedToday = () => {
  const now = new Date().toISOString().split("T")[0].split("-");
  return `${now[0]}/${now[1]}/${now[2]}`;
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
