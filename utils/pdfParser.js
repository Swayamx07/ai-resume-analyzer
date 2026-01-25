const extract = require("pdf-text-extract");

function extractTextFromPDF(filePath) {
    return new Promise((resolve, reject) => {
        extract(filePath, function (err, pages) {
            if (err) return reject(err);
            const text = pages.join(" ").toLowerCase();
            resolve(text);
        });
    });
}

module.exports = extractTextFromPDF;
