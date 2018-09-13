/**
 *
 */

const crypto = require('crypto');

const Utilities = {

    /**
     *
     * @param classBlob
     * @param target
     */
    extendModule: function (classBlob, target) {
        Object.keys(classBlob).forEach(function (key) {
            target[key] = classBlob[key];
        });
    },

    /**
     *
     * @returns {{accessKeyId: (*|string), secretAccessKey: (*|string), databaseUrl: (*|string), cryptoSecret: (*|string)}}
     */
    getEnvironmentVariables: function () {
        return {
            accessKeyId: process.env.S3_KEY || '',
            secretAccessKey: process.env.S3_SECRET || '',
            databaseUrl: process.env.DATABASE_URL || '',
            cryptoSecret: process.env.CRYPTO_SECRET || '',
        };
    },

    /**
     *
     * @param string
     * @returns {*|PromiseLike<ArrayBuffer>}
     */
    encryptSHA256: function ( string ) {
        let environmentVariables = this.getEnvironmentVariables();
        return crypto.createHmac('sha256', environmentVariables.cryptoSecret)
            .update(string)
            .digest('hex');
    },

    encryptMD5: function ( string ) {
        return crypto.createHash('md5')
            .update(string)
            .digest('hex');
    }


};

module.exports = Utilities;