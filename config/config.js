const dotenv = require('dotenv').config();

module.exports.sysConfig = {
    email: {
        from: process.env.EMAIL_SENDER_FROM
    },
    aws: {
        S3: {
            bucket: process.env.AWS_S3_BUCKET_REQUEST_TRAINING,
        }
    },
    logger: {
        nodeId: 'SFTP_BATCH',
        logLevel: 'info',
        logPrettyPrint: true,
        logColor: true,
        logOneLine: true
    },
    sFTP: {
        sftp_host: process.env.SFTP_2C2P_HOST,
        sftp_port: process.env.SFTP_2C2P_PORT ? parseInt(process.env.SFTP_2C2P_PORT) : 22,
        sftp_username: process.env.SFTP_2C2P_USERNAME,
        sftp_password: process.env.SFTP_2C2P_PASSWORD,
        sftp_directory_read_file: process.env.SFTP_2C2P_PATH_READ_FILE,
        sftp_directory_write_file: process.env.SFTP_2C2P_PATH_WRITE_FILE,
        sftp_private_key_directory: `${process.env.SFTP_2C2P_PRIVATE_KEY}`
    },
    sFTP_bbl: {
        sftp_host: process.env.SFTP_BBL_HOST,
        sftp_port: process.env.SFTP_BBL_PORT ? parseInt(process.env.SFTP_BBL_PORT) : 22,
        sftp_username: process.env.SFTP_BBL_USERNAME,
        sftp_password: process.env.SFTP_BBL_PASSWORD,
        sftp_directory_read_file: process.env.SFTP_BBL_PATH_READ_FILE,
        sftp_directory_write_file: process.env.SFTP_BBL_PATH_WRITE_FILE,
        sftp_private_key_directory: `${process.env.SFTP_BBL_PRIVATE_KEY}`,
        sftp_algorithms: {
            kex: [
                "diffie-hellman-group1-sha1",
            ],
            serverHostKey: [
                "ssh-rsa", "ssh-dss"
            ]
        }
    },
    sFTP_p8: {
        sftp_host: process.env.SFTP_P8_HOST,
        sftp_port: process.env.SFTP_P8_PORT ? parseInt(process.env.SFTP_P8_PORT) : 22,
        sftp_username: process.env.SFTP_P8_USERNAME,
        sftp_password: process.env.SFTP_P8_PASSWORD,
        sftp_directory_read_file: process.env.SFTP_P8_PATH_READ_FILE,
        sftp_directory_write_file: process.env.SFTP_P8_PATH_WRITE_FILE,
        sftp_private_key_directory: `${process.env.SFTP_P8_PRIVATE_KEY}`,
    },
    masterDb: {
        mssql: {
            host: process.env.DB_MASTER_HOST,
            port: process.env.DB_MASTER_PORT ? parseInt(process.env.DB_MASTER_PORT) : 1433,
            user: process.env.DB_MASTER_USERNAME,
            password: process.env.DB_MASTER_PASSWORD,
            database: process.env.DB_MASTER_DATABASE,
            dialect: 'mssql',
            options: {
                encrypt: true,
                enableArithAbort: true,
            },
        }
    },
    sendgrid: {
        sender: process.env.EMAIL_SENDER_FROM,
        authorizedKey: process.env.SENDGRID_API_KEY,
        emailTemplate: {
            managerApprovalId: process.env.SENDGRID_EMAIL_TEMPLATE_MANAGER_APPROVAL_ID
        }
    },
    services: {
        sfinpay_api: process.env.SFINPAY_API
    }
}