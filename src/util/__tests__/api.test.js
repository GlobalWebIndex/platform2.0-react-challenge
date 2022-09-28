import {
  fetchCatsList,
  fetchBreeds,
  fetchCatDetails,
  fetchFavourites,
  fetchImagesByBreed,
  addFavourite,
  removeFavourite,
} from "../api";
import axios from "axios";

jest.mock("axios", () => {
  const get = jest.fn();
  const post = jest.fn();
  const deleteAction = jest.fn();

  return {
    create: () => ({
      get,
      post,
      delete: deleteAction,
    }),
  };
});

describe("api", () => {
  it("fetchCatsList", async () => {
    const api = axios
      .create()
      .get.mockImplementation(() => Promise.resolve({ data: { list: [] } }));

    expect(await fetchCatsList()).toEqual({ list: [] });

    expect(api).toHaveBeenCalledWith("images/search/", {
      params: { limit: 10, page: 1, size: "small" },
    });
  });

  it("fetchBreeds", async () => {
    const api = axios
      .create()
      .get.mockImplementation(() => Promise.resolve({ data: { breeds: [] } }));

    expect(await fetchBreeds()).toEqual({ breeds: [] });

    expect(api).toHaveBeenCalledWith("breeds/", {});
  });

  it("fetchCatDetails", async () => {
    const api = axios
      .create()
      .get.mockImplementation(() => Promise.resolve({ data: { details: [] } }));

    expect(await fetchCatDetails("abc")).toEqual({ details: [] });

    expect(api).toHaveBeenCalledWith("images/abc", {});
  });

  it("fetchFavourites", async () => {
    const api = axios
      .create()
      .get.mockImplementation(() =>
        Promise.resolve({ data: { favourites: [] } })
      );

    expect(await fetchFavourites("abc")).toEqual({ favourites: [] });

    expect(api).toHaveBeenCalledWith("favourites/", {});
  });

  it("fetchImagesByBreed", async () => {
    const api = axios
      .create()
      .get.mockImplementation(() => Promise.resolve({ data: { images: [] } }));

    expect(await fetchImagesByBreed("abc")).toEqual({ images: [] });

    expect(api).toHaveBeenCalledWith("images/search/", {
      params: { breed_ids: "abc", limit: 8, size: "small" },
    });
  });

  it("addFavourite", async () => {
    const api = axios
      .create()
      .post.mockImplementation(() =>
        Promise.resolve({ data: { id: 2147091, message: "SUCCESS" } })
      );

    expect(await addFavourite("abc")).toEqual({
      id: 2147091,
      message: "SUCCESS",
    });

    expect(api).toHaveBeenCalledWith("favourites/", { image_id: "abc" });
  });

  it("removeFavourite", async () => {
    const api = axios
      .create()
      .delete.mockImplementation(() =>
        Promise.resolve({ data: { message: "SUCCESS" } })
      );

    expect(await removeFavourite("abc")).toBeTruthy();

    expect(api).toHaveBeenCalledWith("favourites/abc", {});
  });
});
