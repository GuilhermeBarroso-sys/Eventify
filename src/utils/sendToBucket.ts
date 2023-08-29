import { PutObjectCommand } from "@aws-sdk/client-s3";
import { region, s3 } from "../libs/aws/sdk/s3";
import { createReadStream } from "fs";
import { unlink } from "fs/promises";
interface ISendToBucketParams {
  bucket: string;
  filename: string;
  directory: string;
  path: string;
}
export async function sendToBucket({bucket, filename,directory, path} : ISendToBucketParams) {
	try {
		const file = createReadStream(path);
		await s3.send(new PutObjectCommand({
			Bucket: bucket,
			Key: `${directory}/${filename}`,
			Body: file,
			ContentType: "image"
		}));
		file.close();
		await unlink(path);
		return {
			url: `https://${bucket}.s3.${region}.amazonaws.com/${directory}/${filename}`
		};
	} catch(err) {
		await unlink(path);
		throw new Error("Server Error - "+err);
	}
}

