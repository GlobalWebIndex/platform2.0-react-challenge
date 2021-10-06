import create from "zustand";
import { devtools } from "zustand/middleware";

import { fetchData } from "./api-config";

export const useStore = create(
  devtools((set, get) => ({
    cats: [],
    breeds: [],
    breedsImages: [],
    favoriteCats: [],
    loading: false,
    fetchCats: async (amount) => {
      try {
        set((state) => ({ loading: true }));
        const result = await fetchData("/images/search", {
          params: {
            limit: amount,
            size: "full",
          },
        });
        set((state) => ({
          cats: [...state.cats, ...result.data],
          loading: false,
        }));
      } catch (error) {
        console.error("fetchCats", error);
      }
    },
    fetchBreeds: async (amount) => {
      try {
        set((state) => ({ loading: true }));
        const result = await fetchData("/breeds", {
          params: {
            limit: amount,
          },
        });
        set((state) => ({
          breeds: [...state.breeds, ...result.data],
          loading: false,
        }));
      } catch (error) {
        console.error("fetchBreeds", error);
      }
    },
    fetchBreedsImages: async (id) => {
      try {
        set((state) => ({ loading: true }));
        const result = await fetchData("/images/search", {
          params: {
            breed_id: id,
            size: "full",
          },
        });
        set((state) => ({
          breedsImages: [...result.data],
          loading: false,
        }));
      } catch (error) {
        console.error("fetchCats", error);
      }
    },
    clearBreedsImages: () => {
      set((state) => ({
        breedsImages: [],
      }));
    },
    fetchCat: async (id) => {
      try {
        const result = await fetchData(`/images/${id}`);
        set((state) => ({ cats: [result.data] }));
      } catch (error) {
        console.error("fetchCat", error);
      }
    },
    addFavoriteCat: (addCat) => {
      set((state) => {
        const fav = state.favoriteCats.filter((cat) => cat.id === addCat.id);

        if (fav.length)
          return {
            favoriteCats: state.favoriteCats.filter(
              (cat) => cat.id !== addCat.id
            ),
          };
        return {
          favoriteCats: [...state.favoriteCats, addCat],
        };
      });
    },
    isFavoriteCat: (findCat) => {
      return !!get().favoriteCats.filter((cat) => cat.id === findCat.id).length;
    },
  }))
);
