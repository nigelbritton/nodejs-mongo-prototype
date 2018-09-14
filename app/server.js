/**
 *
 */

const cluster = require('cluster');
const debug = require('debug')('node-mongo-prototype');

var applicationStatus = {
    version: require('../package.json').version,
    name: require('../package.json').name,
    port: process.env.SERVER_PORT || 3000,
    environment: process.env.NODE_ENV || 'dev',
    started: new Date(),
    pagesRender: [],
    crashLog: []
};

if (cluster.isMaster) {
    cluster.on('fork', function (worker) {
        debug(new Date() + ': ' + applicationStatus.name + ' server process started [' + worker.process.pid + ']');
    });
    cluster.on('exit', function (worker) {
        debug(new Date() + ': ' + applicationStatus.name + ' server process killed [' + worker.process.pid + ']');
        cluster.fork();
    });
    cluster.fork();
} else {
    debug('');
    debug('############################################################');
    debug('                      ' + applicationStatus.name);
    debug('############################################################');
    debug('');
    debug('Version: ' + applicationStatus.version);
    debug('Started: ' + applicationStatus.started);
    debug('Running environment: ' + applicationStatus.environment);
    debug('Listening on port: ' + applicationStatus.port);
    debug('');
    const app = require('./app')(applicationStatus);
}