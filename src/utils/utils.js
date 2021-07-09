// Awesomeness
// https://codegolf.stackexchange.com/questions/58442/generate-random-uuid#comment413781_170081

export const uuid = () =>
  "8-4-4-4-12".replace(/\d+/g, (n) =>
    Math.floor(16 ** n * Math.random())
      .toString(16)
      .padStart(n, 0)
  );
