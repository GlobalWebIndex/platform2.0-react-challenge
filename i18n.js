module.exports = {
    localeDetection: false,
    locales: ["el", "jp", "en"],
    defaultLocale: "en",
    pages: {
        "*": ["common"],
        "rgx:^/404": ["404"]
    }
};
