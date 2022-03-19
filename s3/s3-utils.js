"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadUrl = exports.deleteFiles = exports.deleteFile = exports.uploadFile = exports.createBucket = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_json_1 = __importDefault(require("./config.json"));
const s3Config = {
    apiVersion: '2006-03-01',
    accessKeyId: config_json_1.default.accessKeyId,
    secretAccessKey: config_json_1.default.secretAccessKey,
    region: config_json_1.default.region,
};
const s3 = new aws_sdk_1.default.S3(s3Config);
function createBucket() {
    s3.createBucket({
        Bucket: config_json_1.default.bucket,
        CreateBucketConfiguration: {
            LocationConstraint: config_json_1.default.region,
        },
        GrantRead: config_json_1.default.userId,
        GrantWrite: config_json_1.default.userId,
        GrantFullControl: config_json_1.default.userId,
        GrantReadACP: config_json_1.default.userId,
        GrantWriteACP: config_json_1.default.userId,
        ObjectLockEnabledForBucket: false,
    }).promise();
}
exports.createBucket = createBucket;
function uploadFile({ file, contentType, serverPath, filename }) {
    if (!filename) {
        filename = serverPath.split('/').pop();
    }
    return s3.upload({
        Bucket: config_json_1.default.bucket,
        ACL: 'private',
        Key: serverPath,
        Body: file,
        ContentType: contentType,
        ContentDisposition: `attachment; filename=${filename}`,
    }).promise();
}
exports.uploadFile = uploadFile;
async function deleteFile(serverPath) {
    return s3.deleteObject({
        Bucket: config_json_1.default.bucket,
        Key: serverPath,
    }).promise();
}
exports.deleteFile = deleteFile;
async function deleteFiles(serverPaths) {
    return s3.deleteObjects({
        Bucket: config_json_1.default.bucket,
        Delete: {
            Objects: serverPaths
        }
    }).promise();
}
exports.deleteFiles = deleteFiles;
function downloadUrl(key) {
    return s3.getSignedUrlPromise('getObject', {
        Bucket: config_json_1.default.bucket,
        Key: key,
        Expires: 1800,
    });
}
exports.downloadUrl = downloadUrl;
//# sourceMappingURL=s3-utils.js.map