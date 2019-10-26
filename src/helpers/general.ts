export const removeDublicates = (list) => {
  const uniqueArray = list.filter((thing, index: number) => {
    return (
      index ===
      list.findIndex((obj) => JSON.stringify(obj) === JSON.stringify(thing))
    );
  });
  return uniqueArray;
};


export const isEmtyOrNullArrary = (emptyArray: { length: number | null; } | null) => (typeof emptyArray != "undefined" && emptyArray != null && emptyArray.length != null
  && emptyArray.length > 0)

