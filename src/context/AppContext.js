import { useEffect, createContext } from "react";
import { useAxios } from "./../hooks/useAxios";

const Context = createContext();

export default Context;

export function ContextProvider({ children }) {
  const [
    favourites,
    favouritesError,
    favouritesLoading,
    fetchFavourites,
    resetFavourites,
  ] = useAxios();

  useEffect(() => {
    if (!favourites) fetchFavourites({ url: "/favourites" });
  }, [favourites, fetchFavourites]);

  return (
    <Context.Provider
      value={{
        favouritesData: {
          favourites,
          favouritesError,
          favouritesLoading,
          fetchFavourites,
          resetFavourites,
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
