module.exports = {
    localeDetection: false,
    locales: ["el", "jp", "en"],
    defaultLocale: "en",
    pages: {
        "*": ["common", "menu", "breed"],
        "/": ["common", "index"],
        "/favorites": ["common", "index", "favorites"],
        "rgx:^/breed": ["index"],
        "rgx:^/404": ["404"]
    }
};
