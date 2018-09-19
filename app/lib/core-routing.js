/**
 *
 */

const express = require('express'),
    createError = require('http-errors'),
    debug = require('debug')('node-mongo-prototype:routing'),
    router = express.Router();

const Core = require('./core');

router.get('/', function (req, res, next) {
    /*Core.insertPost({
        postTitle: 'Hello World! ' + new Date().getTime()
    });*/
    Core.getPosts({})
        .then(function (results) {
            console.log(results);
        }).catch(function (e) {
            console.log(e);
        });
    res.render('admin/dashboard', {

    });
});

/**
 * Posts, Pages
 */

router.get('/edit', function (req, res, next) {
    res.send({});
});

router.get('/post-new', function (req, res, next) {
    res.send({});
});

router.get('/post', function (req, res, next) {
    res.send({});
});

router.get('/edit-tags', function (req, res, next) {
    res.send({});
});

router.get('/term', function (req, res, next) {
    res.send({});
});


/**
 * Media
 */

router.get('/upload', function (req, res, next) {
    res.send({});
});

router.get('/media-new', function (req, res, next) {
    res.send({});
});


/**
 * Users
 */

router.get('/users', function (req, res, next) {
    res.send({});
});

router.get('/user-new', function (req, res, next) {
    res.send({});
});

router.get('/user-edit', function (req, res, next) {
    res.send({});
});


/**
 * Settings
 */

router.get('/options-general', function (req, res, next) {
    res.send({});
});

router.get('/options-writing', function (req, res, next) {
    res.send({});
});

router.get('/options-reading', function (req, res, next) {
    res.send({});
});

router.get('/options-media', function (req, res, next) {
    res.send({});
});


router.use(function(req, res, next) {
    next(createError(404));
});



module.exports = router;