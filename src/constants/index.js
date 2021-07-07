export const API_BASE_URL =
  "https://virtserver.swaggerhub.com/techminers/talent/1.0.1/";

export const NA_TEXT = "N/A";

export const ENDPOINTS = {
  COMPANY_ENDPOINT_GET_MANY: () => `/companies`,
  COMPANY_ENDPOINT_GET_ONE: (id) => `/company/${id}`,
  TALENT_POST_ONE: () => `/talentInterest`
};
