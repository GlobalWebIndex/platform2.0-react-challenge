//https://www.tutorialspoint.com/how-to-create-guid-uuid-in-javascript

export const uuid = (): string => {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      // eslint-disable-next-line
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};

export const extractImageFromUrl = (url?: string): string => {
  if (url === undefined || url === null) return "";
  const initialSplit = url.split("/");
  const lastPart = initialSplit[initialSplit.length - 1];
  const imageId = lastPart.split(".")[0];
  return imageId;
};
