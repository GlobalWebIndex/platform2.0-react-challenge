export const API_URL = "https://api.thecatapi.com/v1";
export const IMAGES_URL_PATH = "/images/search";
export const BREEDS_URL_PATH = "/breeds";
export const FAVORITE_IMAGE_PATH = "/favourites";
export const LIMIT = 10;
export const X_API_KEY = "89f43024-cd07-4113-95a4-40d8aaf02f89";
export const HEADERS: HeadersInit = { "x-api-key": X_API_KEY };
export const DEFAULT_ERROR_MESSAGE = "Something went wrong";

export class CacheKeys {
  public static CatsList = "cats-list";
  public static BreedList = "breeds-list";
  public static SUBS_ID = "subsid";
}

export class BootstrapVariants {
  public static PRIMARY = "primary";
  public static SECONDARY = "secondary";
  public static SUCCESS = "success";
  public static DANGER = "danger";
  public static WARNING = "warning";
  public static INFO = "info";
  public static LIGHT = "light";
  public static DARK = "dark";
}
