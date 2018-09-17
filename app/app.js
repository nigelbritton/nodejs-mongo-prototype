/**
 *
 */

module.exports = function(applicationStatus) {

    const express = require('express');
    const createError = require('http-errors');
    const logger = require('morgan');
    const debug = require('debug')('node-mongo-prototype');
    const compression = require('compression');
    const hbs = require('hbs');
    const path = require('path');

    const Core = require('./lib/core');
    const RoutingAdmin = require('./lib/core-routing');

    const app = express();

    const cacheSettings = { week: 604800, day: 86400, hour: 3600 };

    hbs.registerPartials(__dirname + '/views/partials');

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    // app.use(cookieParser());
    app.use(compression());
    app.use(express.static(path.join(__dirname, 'public'), { maxAge: cacheSettings.week }));

    app.use(function (req, res, next) {
        res.removeHeader("x-powered-by");
        res.setHeader('X-Frame-Options' , 'deny' );
        res.setHeader('X-Content-Type-Options' , 'nosniff' );
        res.setHeader('X-Permitted-Cross-Domain-Policies' , 'none' );
        res.setHeader('X-XSS-Protection' , '1; mode=block' );
        res.setHeader('Cache-Control', 'public, max-age=' + cacheSettings.hour);
        next();
    });

    /**
     * routes
     */
    app.use('/admin', RoutingAdmin);



    app.use(function(req, res, next) {
        next(createError(404));
    });

    app.use(function(err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        res.render('error');
    });

    app.listen(applicationStatus.port, function () {
        debug('Accepting connections on port: ' + applicationStatus.port);

        /*let postObject = Core.getPostObject();
        let userObject = Core.getUserObject();
        console.log(postObject);
        console.log(userObject);
        console.log(Core.encryptMD5('testing'));*/

        /*Core.insertPost({
            postTitle: 'Hello World!'
        });*/

    });

    return app;
};