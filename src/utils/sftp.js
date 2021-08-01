let SFTPClient = require('ssh2-sftp-client');

module.exports.sftpConnection = async (host, port, username, password, path) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sftp = new SFTPClient();
            await sftp.connect({host, port, username, password});
            resolve(sftp);
        } catch (errors) {
            reject(errors);
        }
    });
}

module.exports.sftpConnectionWithPrivateKey2c2p = async (host, port, username, privateKeyPath, path) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sftp = new SFTPClient();
            await sftp.connect({ host, port, username, privateKey: privateKeyPath});
            resolve(sftp);
        } catch (errors) {
            reject(errors);
        }
    });
}

module.exports.sftpConnectionWithPrivateKeyBbl = async (host, port, username, privateKeyPath, path) => {
    console.log(`privateKeyPath ====> `, await privateKeyPath);
    console.log(`username ====> `, username);
    console.log(`port ====> `, port);
    console.log(`host ====> `, host);
    return new Promise(async (resolve, reject) => {
        try {
            const params = {
                host: '110.164.207.113',
                port: 22,
                username: 'extshsf344',
                password: 'C_aw!8ri',
                algorithms: {
                    kex: [
                        "diffie-hellman-group1-sha1",
                    ],
                    serverHostKey: [
                        "ssh-rsa", "ssh-dss"
                    ]
                },
                privateKey: privateKeyPath,
                readyTimeout: 5000
            };
            // let algorithms = {
            //     kex: [
            //         "diffie-hellman-group1-sha1",
            //     ],
            //     serverHostKey: [
            //         "ssh-rsa","ssh-dss"
            //     ]};
            // let password = 'C_aw!8ri';
            console.log(params);
            const sftp = new SFTPClient();
            await sftp.connect(params);
            console.log('yyyy'); // x
            resolve(sftp);
        } catch (errors) {
            reject(errors);
        }
    });
}

module.exports.sftpConnectionWithPrivateKey = async (host, port, username, privateKeyPath, path) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sftp = new SFTPClient();
            await sftp.connect({ host, port, username, privateKey: privateKeyPath});
            resolve(sftp);
        } catch (errors) {
            reject(errors);
        }
    });
}

module.exports.sftpGetListFile = async (sftpConn, sftpPathReadFile) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sftpList = await sftpConn.list(sftpPathReadFile);
            resolve(sftpList);
        } catch (errors) {
            reject(errors);
        }
    });
}
