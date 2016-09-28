'use strict';

/*
 * nodejs-express-mongoose
 * Copyright(c) 2015 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */
import fs from 'fs';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import mysql from 'mysql';
import models from './app/models';
import passport from 'passport';
import config from './config';
import configureExpress from './config/express';
import configureRoutes from './config/routes';


const port = process.env.PORT || 3000;

const app = express();
const connection = connect();

/**
 * Expose
 */
export default {
  app,
  connection
};

// Bootstrap routes
// require('./config/passport')(passport);
configureExpress(app, passport);
configureRoutes(app, passport);

mongoose.Promise = Promise;

connection
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen () {
  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log('Express app started on port ' + port);
}

function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(config.db, options).connection;
}
