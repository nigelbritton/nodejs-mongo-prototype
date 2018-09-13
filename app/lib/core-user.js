/**
 *
 */

const MongoDB = require('mongodb');

const Meta = require('./core-meta');

const User = {

    /**
     * addUserMeta
     * @param userId string
     * @param metaKey string
     * @param metaValue string
     * @param unique bool
     */
    addUserMeta: function ( userId, metaKey, metaValue, unique ) {
        Meta.addMetadata( 'user', userId, metaKey, metaValue, unique );
    },

    /**
     * getUserMeta
     * @param userId string
     * @param metaKey string
     * @param single bool
     */
    getUserMeta: function ( userId, metaKey, single ) {
        Meta.getMetadata( 'user', userId, metaKey, single );
    },

    /**
     * updateUserMeta
     * @param userId string
     * @param metaKey string
     * @param metaValue string
     */
    updateUserMeta: function ( userId, metaKey, metaValue ) {
        Meta.updateMetadata( 'user', userId, metaKey, metaValue );
    },

    getUserObject: function () {
        let ts = new Date().getTime();
        return {
            "_id": MongoDB.ObjectId(),
            "userLogin":"",
            "userPass":"",
            "userNicename":"",
            "userEmail":"",
            "userUrl":"",
            "userRegistered":ts,
            "userActivationKey":"",
            "userStatus":0,
            "displayName":""
        };
    },

};

module.exports = {
    getUserObject: User.getUserObject,
    addUserMeta: User.addUserMeta,
    getUserMeta: User.getUserMeta,
    updateUserMeta: User.updateUserMeta
};