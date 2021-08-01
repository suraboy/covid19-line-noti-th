const _ = require("underscore");
const moment = require('moment-timezone');
const AWS = require('aws-sdk');
const { sysConfig } = require("../../config/config");

const awsS3 = new AWS.S3();

module.exports.readFileStreamFromS3 = async  ({ Bucket, FileName }) => {
    return new Promise(async (resolve, reject) => {
        const params = { Bucket: Bucket, Key: FileName };
        const data = await awsS3.getObject(params).createReadStream();
        if (data) {
            resolve(data);
        } else {
            reject();
        }
    });
}

module.exports.readFileFromS3 = async  ({ Bucket, FileName }) => {
    return new Promise(async (resolve, reject) => {
        const params = { Bucket: Bucket, Key: FileName };
        const data = await awsS3.getObject(params).promise();
        if (data) {
            const body = Buffer.from(data.Body).toString('utf8');
            resolve(body);
        } else {
            reject();
        }
    });
}

module.exports.writeFileStreamToS3 = async ({ Bucket, FileName, StreamObject }) => {
    return new Promise(async (resolve, reject) => {
        const params = { Bucket: Bucket, Key: FileName, Body: StreamObject };
        const s3Response = await awsS3.upload(params).promise();

        if (s3Response) {
            resolve({
                Bucket,
                FileName
            });
        } else {
            reject();
        }
    });
}
