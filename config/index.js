
/**
 * Module dependencies.
 */
import path from 'path';

const env = process.env.NODE_ENV || 'local';
const config = require(`./env/${env}`).default;

const defaults = {
  root: path.join(__dirname, '/..')
};

export default Object.assign(defaults, config);
