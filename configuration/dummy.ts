//menu static data
export const menuData = {
    items: [
        {
            id: 1,
            href: "/",
            label: "home"
        },
        {
            id: 2,
            href: "/breeds",
            label: "breeds"
        },
        {
            id: 3,
            href: "/favorites",
            label: "favorites"
        }
    ]
};

//initialize context
export const initialContext = {
    loading: false,
    darkMode: true,
    favorites: [],
    addToFavorites: () => { },
    removeFromFavorites: () => { },
    setLoading: () => { },
    setDarkMode: () => { }
};