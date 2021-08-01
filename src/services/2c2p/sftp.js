const fs = require("fs");
const moment = require("moment-timezone");
const logger = require('../../../config/logger');
const {sysConfig} = require("../../../config/config");
const {asyncForEach} = require("../../utils");
const {sftpConnectionWithPrivateKey, sftpGetListFile, sftpConnectionWithPrivateKeyBbl, sftpConnectionWithPrivateKey2c2p} = require("../../utils/sftp");
const {writeFileStreamToS3} = require("../../utils/aws-eod");
const sFTPConfig = sysConfig.sFTP;
const sFTPConfigBBL = sysConfig.sFTP_bbl;
const sFTPP8Config = sysConfig.sFTP_p8;
const awsConfig = sysConfig.aws;
let sftpConn;

module.exports.Initial2c2pSftpService = async (sftp_username) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (sftp_username !== undefined) sFTPConfig.sftp_username = sftp_username;

            const sftpFilesList = await getFileFromSFTP2c2p(sFTPConfig);
            let storeFilesList = await storedFileToStorage(sftpFilesList, sFTPConfig);
            resolve(storeFilesList);
        } catch (error) {
            const err = {
                message: `Cannot process about 2c2p sftp to read request training approval`,
                cause: error
            };
            logger.error(error);
            logger.error({err, error});
        }
    });
}

module.exports.InitialBblSftpService = async (sftp_username) => {
    return new Promise(async (resolve, reject) => {
        console.log('cccc');
        try {
            console.log('dddd');
            if (sftp_username !== undefined) sFTPConfigBBL.sftp_username = sftp_username;

            const sftpFilesList = await getFileFromSFTPbbl(sFTPConfigBBL);
            let storeFilesList = await storedFileToStorage(sftpFilesList, sFTPConfigBBL);
            resolve(storeFilesList);
        } catch (error) {
            const err = {
                message: `Cannot process about bbl sftp to read request training approval`,
                cause: error
            };
            logger.error(error);
            logger.error({err, error});
        }
    });
}

module.exports.InitialP8SftpService = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sftpFilesList = await getFileFromSFTP(sFTPP8Config);
            let storeFilesList = await storedFileToStorage(sftpFilesList, sFTPP8Config);
            resolve(storeFilesList);
        } catch (error) {
            const err = {
                message: `Cannot process about P8 sftp to read request training approval`,
                cause: error
            };
            logger.error(error);
            logger.error({err, error});
        }
    });
}

const getFileFromSFTP2c2p = async (config) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {sftp_host, sftp_port, sftp_username, sftp_private_key_directory, sftp_directory_read_file} = config;
            console.log('gggg');
            sftpConn = await sftpConnectionWithPrivateKey2c2p(
                sftp_host,
                sftp_port,
                sftp_username,
                fs.readFileSync(sftp_private_key_directory),
                sftp_directory_read_file
            );
            console.log('zzzz');
            const sftpFilesList = await sftpGetListFile(sftpConn, sftp_directory_read_file);
            console.log('hhhh');
            resolve(sftpFilesList);
        } catch (error) {
            reject(error);
        }
    });
}

const getFileFromSFTPbbl = async (config) => {
    return new Promise(async (resolve, reject) => {
        console.log('ffff');
        try {
            const {sftp_host, sftp_port, sftp_username, sftp_private_key_directory, sftp_directory_read_file} = config;
            // let privateKey = `-----BEGIN RSA PRIVATE KEY-----

            // MIIG5QIBAAKCAYEAzTAe3aIO8nxffrMhQTopL3G8xTSqb75LMwKrRnfqPLsodZz1
            // mZxxe/fve01Ft7mukFq53uuvqhSUtdXDt3Ty5lqUdjup7VfU8cJJSr6jJSaxHGBa
            // rDrUKbp+Mfew5fGljxHAtqwnC5fn8USvVpskSeLNUykvqiJ0sykuJWNx5hegNSvG
            // 3BOlOrcSE2BGEZOzQfNyFMoHcooGBaxhKNCfHY0V5nqpJdi99b90UI5kqgbNEqqU
            // l0B1A6KpW0tenn/lqUmsUBBXR+dMfflHIFlQuV/SpIBHrRnHz1laR1cqxK8XEWNN
            // d63mXKqwVVAlK+J4U+wdjlxgJ4Tvpvs8gEeSKcidAiFehteI/y4F3g+iylIRYgcw
            // p3i1OPw031Q6t1zOOEiI+Y1nV34P6g2V6bTHggZ7rhlo11TH6lcNR79tYVf6U7QW
            // fo8pPp+9D1tF51Cm1IORT9Sn3bnUfoqKeKOlkB63rYkM3tlDS1dHvzdsvboxN+Zs
            // RXL+6a1q5uf6gBC9AgMBAAECggGBAIy0W+Yl9FQKP731fm9pP8beGtGszNd1ycGA
            // Kg1Xu9PLj/IfITgmVJfrLFkEYzOa6/7niCA6xKpAFL4giWarlsmqAbaWMW+lVEw4
            // q+PKmLuoLbnExUjnyoeW8GS5cqAsNhjG1r0tjlTf5VjIfehI2Pilw6EsVBg6KoaV
            // TaSr7fYX62+qxmIyQpLh6U5KLaJuA3XNSETDSZoc1gZb8AB6FzK/he4X3Rgr6g+0
            // K0H2c0c5BLWxLdYOiG9mwvXs2ESedJWxzBcW7L1Jt0jEdjPz3diitSGSNQDo1c4U
            // hAQ4jYSlvuqfmVya/tJ9vD0cN6SJFPq4nWTrZMvgbtTfqP0NU/RfXUWqRj5GYdNX
            // SyVuPG3YwAyiblAxV5Mo7PBc7R8A/6H1MoJ6STnRH0poqzy8tTr+AnqELnWC6aKa
            // D2Kdr1b+IVFUF5PQ8Qm526bEgC/wmuudmnxBEcb9AgEyHsan0Q7NY9GLLHENSCgL
            // yQmdWwto2hLm/jG6iEzbOG6Kp4PBoQKBwQD+kf24zxWGRB+BvrRUBh3BWR0T5JT2
            // b/q12l7sg6kFGTWjkK4lEIJRbeex3mjQsLn4kLwGNQ9vdynp0EQcjdKigs+GGXLY
            // ZDfbi4cWLq4qDH+gIUCM53E9n3fiNdMolRECpK2BotqnYBVzwy8b0pib64B8pe4G
            // YoXrNhxqNi0nZDYGbYyTRQ1VTQq8Mrx4gdOT4s7yOJXk1OQs9VBscDmo+t3h2WLM
            // BgQsaID2Nw5NHvdRakYMDgLV2BJuO9sKXfUCgcEAzlchRULuvIlcvaOAIPppPx//
            // J49LOiXEVViH6IC0wJ7mgJnHSvrKoez6tGH1UMWD+1GVJLx7U4AZl+BvKQXXDlqx
            // eDp1kHkAV/jiJ8H08FsXPmDB4rvUfuB9HST7JpfaFalkOQSoXDsGAuH1/E2vXtmH
            // A1F3iW6gIypisRwezU8A631SNwZ6HS11FGl/lNIloE/5EY9j0qfm/hoiYuJ44aEN
            // nC8u3xY0wGhe12k2Wal5x9rykjsQpRIIbucRh6KpAoHAOj4IgInQcOGRG8wX0cl8
            // cUoEHxMDCcbg405MvWv59ZKo9P0a+pvmVN8CTW2HKYflZHsoqXrmRyhKTJY7nxTL
            // hibLd/DGl7+GEBLCG08exbwKTwaMkDA7dk/Py89oujYwqBwpHim2QOj4v31+f60V
            // AUdGJD6KUKel4ASHR72RYxvISHwz11XLESMJO7mX6TI6x/DyS/SqRqp2cdrGRaj/
            // aCvNK+jic69EsSxPpQU/nmFhUB0yXXuvJmHDBbloCd0pAoHBAJNyAY1Lses5wPKm
            // VhW6uuBnzd2H8LqhaDWQaLXE2uTV52K4AIhcw9WH0PJ7GWBZc+Fvv8KbiQj2/dLg
            // hq5qxO0186E1LPNK8+rpJzo/x/bFMMvbOlD55XOwmNbtqSY/1pAqFjsEUAZwCvCe
            // ZTegj5OYn3jIi0HCsl3OmO10abJOJRsh11EIqNQWupYWeRtwO4DeBN3+d9d9MXwc
            // UrwUl0qr2lzj/ntdk9519me5gCP8DdC5bSL/X/qE80/EgGtK2QKBwQCV1gaBCCXI
            // VAXlOvNW6PDg61Soau/e1w0vewgtPfvfo2U/QSjuAn7adfkdomd8Qn+C5vpqpTUi
            // SFOtJqtM16teNgC67bl6liqdH94cE+Jr/YfgvvyFsOtm6rO8YnHnz2nGfA2DIoI7
            // JJz8HdwB68yUJFs2i9xKtaIiDh732Yc0cf25uFhAC8t0g51r6ZlSBjMKXqKv+3Pu
            // exAIlRsXgGaAUb150G4VsvEDYaohKsnBTUbYxv3q4HSMNCNAg52TTsQ=
            // -----END RSA PRIVATE KEY-----
            // `;
            console.log('gggg');
            sftpConn = await sftpConnectionWithPrivateKeyBbl(
                sftp_host,
                sftp_port,
                sftp_username,
                fs.readFileSync(sftp_private_key_directory),
            );
            const sftpFilesList = await sftpGetListFile(sftpConn, sftp_directory_read_file);
            resolve(sftpFilesList);
        } catch (error) {
            reject(error);
        }
    });
}

const storedFileToStorage = async (sftpFilesList, config) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {sftp_directory_read_file} = config;
            let storedFilesList = [];
            await asyncForEach(sftpFilesList, async (sftpFileInfo) => {
                if (sftpFileInfo) {
                    let FileName = sftpFileInfo.name;
                    let sftpFilePath = `${sftp_directory_read_file}/${FileName}`;
                    let tempFileDSS = fs.createWriteStream(`/tmp/${FileName}`);
                    await sftpConn.get(sftpFilePath, tempFileDSS);
                    let sftpDownloadDate = moment().tz('Asia/Bangkok').format('YYYY-MM-DD');
                    let awsS3FilePath = `${awsConfig.S3.bucket}/2c2p/${sftpDownloadDate}`;
                    let tempStreamObject = fs.createReadStream(`/tmp/${FileName}`);
                    await writeFileStreamToS3({
                        Bucket: awsS3FilePath,
                        FileName,
                        StreamObject: tempStreamObject
                    });

                    storedFilesList.push({
                        Bucket: awsS3FilePath,
                        FileName: FileName,
                        TempFilePath: `/tmp/`,
                        SFTPFilePath: sftpFilePath
                    });
                }
            });
            resolve(storedFilesList);
        } catch (error) {
            console.log(error)
            reject(error);
        }
    });
}
