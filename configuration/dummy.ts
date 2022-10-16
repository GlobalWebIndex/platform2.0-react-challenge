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
    darkMode: false,
    favorites: [],
    addToFavorites: () => { },
    removeFromFavorites: () => { },
    setLoading: () => { },
    setDarkMode: () => { }
};

//index page dummy contert
export const dummyIndex = [
    {
        "id": "7gn",
        "url": "https://cdn2.thecatapi.com/images/7gn.jpg",
        "width": 387,
        "height": 592
    },
    {
        "id": "9sp",
        "url": "https://cdn2.thecatapi.com/images/9sp.jpg",
        "width": 1024,
        "height": 768
    },
    {
        "id": "a8k",
        "url": "https://cdn2.thecatapi.com/images/a8k.jpg",
        "width": 500,
        "height": 750
    },
    {
        "id": "af8",
        "url": "https://cdn2.thecatapi.com/images/af8.jpg",
        "width": 500,
        "height": 333
    },
    {
        "id": "b0n",
        "url": "https://cdn2.thecatapi.com/images/b0n.jpg",
        "width": 341,
        "height": 500
    },
    {
        "id": "bkc",
        "url": "https://cdn2.thecatapi.com/images/bkc.jpg",
        "width": 400,
        "height": 300
    },
    {
        "id": "cfk",
        "url": "https://cdn2.thecatapi.com/images/cfk.jpg",
        "width": 553,
        "height": 400
    },
    {
        "id": "MTUwNjcwMQ",
        "url": "https://cdn2.thecatapi.com/images/MTUwNjcwMQ.jpg",
        "width": 1200,
        "height": 800
    },
    {
        "id": "NVGe5-dNr",
        "url": "https://cdn2.thecatapi.com/images/NVGe5-dNr.jpg",
        "width": 4032,
        "height": 3024
    },
    {
        "id": "Z6UtarTTe",
        "url": "https://cdn2.thecatapi.com/images/Z6UtarTTe.png",
        "width": 200,
        "height": 200
    }
];