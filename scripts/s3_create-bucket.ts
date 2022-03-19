// Get service clients module and commands using ES6 syntax.
import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client.js";
import config from './config.json';

// Set the bucket parameters
const bucketParams = { Bucket: config.bucket };

// Create the Amazon S3 bucket.
const run = async () => {
 try {
   const data = await s3Client.send(new CreateBucketCommand(bucketParams));
   console.log("Success", data.Location);
   return data;
 } catch (err) {
   console.log("Error", err);
 }
};
run();