module.exports = {
    localeDetection: false,
    locales: ["el", "jp", "en"],
    defaultLocale: "en",
    pages: {
        "*": ["common", "menu"],
        "/": ["common", "index"],
        "rgx:^/404": ["404"]
    }
};
