export const generateUniqueKey = (random: string) =>
  `${random}_${new Date().getTime()}`;
