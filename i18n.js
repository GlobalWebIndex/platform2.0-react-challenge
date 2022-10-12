module.exports = {
    localeDetection: false,
    locales: ["el", "jp", "en"],
    defaultLocale: "el",
    pages: {
        "*": ["common"],
        "rgx:^/cats": ["user"]
    }
};
