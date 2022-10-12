module.exports = {
    localeDetection: false,
    locales: ["el", "jp", "en"],
    defaultLocale: "en",
    pages: {
        "*": ["common"],
        "rgx:^/cats": ["user"]
    }
};
