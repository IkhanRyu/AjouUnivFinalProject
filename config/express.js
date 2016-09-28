/**
 * Module dependencies.
 */

import express from 'express';
import session from 'express-session';
import compression from 'compression'
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import csrf from 'csurf';

var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var winston = require('winston');
var helpers = require('view-helpers');
var jade = require('jade');
var config = require('./').default;
var pkg = require('../package.json');

var env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

export default function (app, passport) {
    // Compression middleware (should be placed before express.static)
    app.use(compression({
        threshold: 512
    }));

    // Static files middleware
    app.use(express.static(config.root + '/public'));

    // Use winston on production
    let format;
    const option = {};
    if (env !== 'development' && env !== 'local') {
        format = 'combined';
        option.stream = {
            write: (message, encoding) => {
                winston.info(message);
            }
        };
    } else {
        format = 'dev';
    }

    // Don't log during tests
    // Logging middleware
    if (env !== 'test') app.use(morgan(format, option));

    // set views path and default layout
    // app.set('views', config.root + '/app/views');
    // app.set('view engine', 'jade');

    // expose package.json to views
    app.use(function (req, res, next) {
        res.locals.pkg = pkg;
        res.locals.env = env;
        next();
    });

    // bodyParser should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));

    // cookieParser should be above session
    app.use(cookieParser());
    // app.use(cookieSession({ secret: 'secret' }));
    // app.use(session({
    //   secret: pkg.name,
    //   proxy: true,
    //   resave: true,
    //   saveUninitialized: true,
    //   store: new mongoStore({
    //     url: config.db,
    //     collection : 'sessions'
    //   })
    // }));

    // use passport session
    // app.use(passport.initialize());
    // app.use(passport.session());

    // connect flash for flash messages - should be declared after sessions
    // app.use(flash());

    // should be declared after session and flash
    // app.use(helpers(pkg.name));

    // adds CSRF support
    // if (process.env.NODE_ENV !== 'test') {
    //   app.use(csrf());
    //
    //   // This could be moved to view-helpers :-)
    //   app.use(function (req, res, next){
    //     res.locals.csrf_token = req.csrfToken();
    //     next();
    //   });
    // }
};
