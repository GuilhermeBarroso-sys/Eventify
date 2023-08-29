import { S3Client } from "@aws-sdk/client-s3";

export const region = process.env.REGION || "sa-east-1";

export const s3 = new S3Client({region});
