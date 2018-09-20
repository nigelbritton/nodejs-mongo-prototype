/**
 *
 *
 *
 */

const Utilities = require('./core-utilities');
const User = require('./core-user');
const Post = require('./core-post');
const Media = require('./core-media');

module.exports = {

    getEnvironmentVariables: Utilities.getEnvironmentVariables,
    encryptSHA256: Utilities.encryptSHA256,
    encryptMD5: Utilities.encryptMD5,

    getPostObject: Post.getPostObject,
    addPostMeta: Post.addPostMeta,
    getPostMeta: Post.getPostMeta,
    updatePostMeta: Post.updatePostMeta,
    deletePostMeta: Post.deletePostMeta,
    getPost: Post.getPost,
    getPosts: Post.getPosts,
    insertPost: Post.insertPost,
    updatePost: Post.updatePost,

    getAttachmentImage: Media.getAttachmentImage,
    getAttachmentImageSrc: Media.getAttachmentImageSrc,
    getAttachmentThumbUrl: Media.getAttachmentThumbUrl,
    getAttachmentUrl: Media.getAttachmentUrl,
    getAttachmentMetadata: Media.getAttachmentMetadata,
    getThePostThumbnail: Media.getThePostThumbnail,

    getUserObject: User.getUserObject,
    addUserMeta: User.addUserMeta,
    getUserMeta: User.getUserMeta,
    updateUserMeta: User.updateUserMeta,

};