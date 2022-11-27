export const config = {
  url: "https://api.thecatapi.com/v1",
  sub_id: import.meta.env.VITE_SUB_ID,
  headers: {
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
};
