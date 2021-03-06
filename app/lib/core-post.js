/**
 *
 */

const MongoDB = require('mongodb'),
    debug = require('debug')('node-mongo-prototype:routing');

const Meta = require('./core-meta');
const Database = require('./core-database');

const Post = {

    /**
     *
     * @param postId string
     * @param metaKey string
     * @param metaValue mixed
     * @param unique bool
     */
    addPostMeta: function( postId, metaKey, metaValue, unique ) {
        return Meta.addMetadata( 'post', postId, metaKey, metaValue, unique );
    },

    /**
     * getPostMeta
     * @param postId string
     * @param metaKey string
     * @param single bool
     */
    getPostMeta: function( postId, metaKey, single ) {
        return Meta.getMetadata( 'post', postId, metaKey, single );
    },

    /**
     * updatePostMeta
     * @param postId string
     * @param metaKey string
     * @param metaValue string
     */
    updatePostMeta: function ( postId, metaKey, metaValue ) {
        return Meta.updateMetadata( 'post', postId, metaKey, metaValue );
    },

    /**
     * deletePostMeta
     * @param postId string
     */
    deletePostMeta: function ( postId ) {
        return Meta.deleteMetadata( 'post', postId );
    },

    /**
     *
     */
    getPost: function (postObject) {
        let postId = '';
        if (typeof (postObject) === 'string') {
            postId = postObject;
        } else if (typeof (postObject) === 'object' && postObject['_id']) {
            postId = postObject['_id'];
        }

        postId = MongoDB.ObjectId(postId);

        return new Promise(function (resolve, reject) {
            Database.connect()
                .then(function () {
                    // debug('Database.selectDatabase()');
                    Database.selectDatabase('blog');
                })
                .then(function () {
                    // debug('Database.db.collection()');
                    Database.selectCollection('rg_posts').find({_id: postId}).toArray(function (err, result) {
                        if (err) throw err;
                        resolve(result[0]);
                    });
                })
                .catch(function (e) {
                    reject(e);
                });
        });
    },

    /**
     *
     */
    getPosts: function (searchQuery) {
        let query = Post.parseArgs(searchQuery, {
            postPerPage: 5,
            offset: 0,
            category: '',
            categoryName: '',
            orderBy: '',
            order: '',
            include: '',
            exclude: '',
            metaKey: '',
            metaValue: '',
            postType: 'post'
        });

        return new Promise(function (resolve, reject) {
            Database.connect()
                .then(function () {
                    // debug('Database.selectDatabase()');
                    Database.selectDatabase('blog');
                })
                .then(function () {
                    // debug('Database.db.collection()');
                    Database.selectCollection('rg_posts').find().limit(query.postPerPage).toArray(function (err, result) {
                        if (err) throw err;
                        resolve(result);
                    });
                })
                .catch(function (e) {
                    reject(e);
                });
        });
    },

    /**
     *
     * @param postObject
     */
    insertPost: function ( postObject ) {
        postObject = Post.parseArgs(postObject, this.getPostObject());
        Database.connect()
            .then(function () {
                Database.selectDatabase('blog');
            })
            .then(function() {
                delete postObject._id;
                Database.addDocument('rg_posts', postObject);
            })
    },

    updatePost: function ( postObject ) {
        postObject = this.parseArgs(postObject, this.getPostObject());
    },

    getPages: function () {

    },

    /**
     * getPostObject
     * @returns {{postAuthor: string, postDate: number, postDateGMT: number, postContent: string, postTitle: string, postExcerpt: string, postStatus: string, commentStatus: string, pingStatus: string, postPassword: string, postName: string, toPing: string, pinged: string, postModified: number, postModified_gmt: number, postContentFiltered: string, postParent: null, guid: string, menuOrder: number, postType: string, postMimeType: string, commentCount: number}}
     */
    getPostObject: function () {
        let ts = new Date().getTime();
        return {
            "_id": MongoDB.ObjectId(),
            "postAuthor":"", // MongoDB.ObjectId("5b9a6f573bc70509e41fb137")
            "postDate":ts,
            "postDateGMT":ts,
            "postContent":"",
            "postTitle":"",
            "postExcerpt":"",
            "postStatus":"draft",
            "commentStatus":"closed",
            "pingStatus":"closed",
            "postPassword":"",
            "postName":"",
            "toPing":"",
            "pinged":"",
            "postModified":ts,
            "postModified_gmt":ts,
            "postContentFiltered":"",
            "postParent":null,
            "guid":"",
            "menuOrder":0,
            "postType":"post",
            "postMimeType":"",
            "commentCount":0
        };
    },

    /**
     * parseArgs
     * @param postObject object
     * @param defaults object
     * @returns {{postAuthor: string, postDate: number, postDateGMT: number, postContent: string, postTitle: string, postExcerpt: string, postStatus: string, commentStatus: string, pingStatus: string, postPassword: string, postName: string, toPing: string, pinged: string, postModified: number, postModified_gmt: number, postContentFiltered: string, postParent: null, guid: string, menuOrder: number, postType: string, postMimeType: string, commentCount: number}}
     */
    parseArgs: function (postObject, defaults) {
        let returnedObject = defaults;
        Object.keys(defaults).forEach(function (key, index) {
            if (postObject.hasOwnProperty(key)) {
                returnedObject[key] = postObject[key];
            }
        });
        return returnedObject;
    }

};

module.exports = {
    getPostObject: Post.getPostObject,
    addPostMeta: Post.addPostMeta,
    getPostMeta: Post.getPostMeta,
    updatePostMeta: Post.updatePostMeta,
    deletePostMeta: Post.deletePostMeta,
    getPost: Post.getPost,
    getPosts: Post.getPosts,
    insertPost: Post.insertPost,
    updatePost: Post.updatePost
};