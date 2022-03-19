
// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client.js"; // Helper function that creates an Amazon S3 service client module.
import config from './config.json';
import path from "path";
import fs from "fs";

const fileNames = process.argv.slice(2);

const files = fileNames.map((file) => `../posts/${file}`).map((serverPath) => {
    // Set the parameters.
    return {
        Bucket: config.bucket,
        // Specify the name of the new object. For example, 'index.html'.
        // To create a directory for the object, use '/'. For example, 'myApp/package.json'.
        Key: path.basename(serverPath),
        // Content of the new object.
        Body: fs.createReadStream(serverPath)
    }
});

// Create and upload the object to the S3 bucket.
export const run = async (bucketParams) => {
  try {
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
    //return data; // For unit tests.
    console.log(
      "Successfully uploaded object: " +
        bucketParams.Bucket +
        "/" +
        bucketParams.Key
    );
  } catch (err) {
    console.log("Error", err);
  }
};
files.forEach(async (file) => await run(file));




