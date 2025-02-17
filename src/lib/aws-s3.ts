import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(file: File): Promise<string> {
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileExtension = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: fileName,
    Body: fileBuffer,
    ContentType: file.type,
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    return `${fileName}`;
  } catch (err: any) {
    throw new Error(`Error uploading to S3: ${err.message}`);
  }
}

export async function deleteFromS3(fileName: string) {
  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
  };

  try {
    await s3Client.send(new DeleteObjectCommand(deleteParams));
  } catch (error) {
    console.error('Error deleting image from S3:', error);
  }
}
