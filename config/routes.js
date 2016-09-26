'use strict';

/**
 * Module dependencies.
 */
import home from '../app/controllers/home';

/**
 * Expose
 */

export default function (app, passport) {

  app.get('/', home.index);

  /**
   * Error handling
   */

  app.use((err, req, res, next) => {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use((req, res, next) => {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
