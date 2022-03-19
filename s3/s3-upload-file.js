"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s3_utils_1 = require("./s3-utils");
const fs_1 = require("fs");
const fileNames = process.argv.slice(2);
const files = fileNames.map((file) => `../posts/${file}`).map((serverPath) => {
    return {
        file: (0, fs_1.readFileSync)(serverPath),
        serverPath,
        filename: serverPath.split('/').pop(),
        contentType: 'text/plain'
    };
});
files.forEach((file) => (0, s3_utils_1.uploadFile)(file));
//# sourceMappingURL=s3-upload-file.js.map