import AWS from 'aws-sdk';
import config from './config.json';

const s3Config = {
  apiVersion: '2006-03-01',
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
};
const s3 = new AWS.S3(s3Config);

export function createBucket() {
  s3.createBucket({
    Bucket: config.bucket,
    CreateBucketConfiguration: {
      LocationConstraint: config.region,
    },
    GrantRead: config.userId,
    GrantWrite: config.userId,
    GrantFullControl: config.userId,
    GrantReadACP: config.userId,
    GrantWriteACP: config.userId,
    ObjectLockEnabledForBucket: false,
  }).promise();
}

export function uploadFile({file, contentType, serverPath, filename}: {file: any, contentType: string, serverPath: string, filename: string}) {
  if (!filename) {
    filename = serverPath.split('/').pop() as string;
  }
  return s3.upload({
    Bucket: config.bucket,
    ACL: 'private',
    Key: serverPath,
    Body: file,
    ContentType: contentType,
    ContentDisposition: `attachment; filename=${filename}`,
  }).promise();
}

export async function deleteFile(serverPath: string) {
  return s3.deleteObject({
    Bucket: config.bucket,
    Key: serverPath,
  }).promise();
} 

export async function deleteFiles(serverPaths: ({Key: string})[]) {
  return s3.deleteObjects({
    Bucket: config.bucket,
    Delete: {
      Objects: serverPaths
    }
  }).promise();
} 

export function downloadUrl(key: string) {
  return s3.getSignedUrlPromise('getObject', {
    Bucket: config.bucket,
    Key: key,
    Expires: 1800,
  });
}