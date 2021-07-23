import { API_URL } from "../constants/constants";

export const HttpClient = async (
  url: string,
  params: string | null,
  options: RequestInit
) => await fetch(`${API_URL}${url}${params}`, options);
