import fs from 'fs';
import aws = require('aws-sdk');
import S3 from 'aws-sdk/clients/s3'

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

const s3Upload = (file: FormData): Promise<string | Error> => {
  return new Promise((resolve, reject) => {
    s3.upload({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${process.env.S3_BUCKET_KEY_PREFIX}-${file.name}`,
      Body: file,
      ContentType: file.type
    }, {
      partSize: 100 * 1024 * 1024,
      queueSize: 4
    }, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(JSON.stringify(data));
    })
  })
}

const nestUpload = async (file: FormData) => {
  

  const res = await s3Upload(FormData);
}

export default nestUpload;