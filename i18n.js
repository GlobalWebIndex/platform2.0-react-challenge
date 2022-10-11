module.exports = {
    localeDetection: false,
    locales: ["el", "jp"],
    defaultLocale: "el",
    pages: {
        "*": ["common"],
        "rgx:^/cats": ["user"]
    }
};
