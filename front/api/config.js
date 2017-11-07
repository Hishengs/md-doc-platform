import axios from 'axios';
import config from '../config.js';

module.exports = {
  http: axios,
  urlPrefix: config.serverUrl,
};
