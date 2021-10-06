export const getNestedObjectValue = (obj, path) => {
  const deep = path.split(".");
  for (const value of deep) {
    obj = obj[value];
  }
  return obj;
};
