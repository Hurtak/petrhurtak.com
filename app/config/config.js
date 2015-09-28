let config = {};

// enviroment dependent configuration (passwords, url's)

if (process.env.NODE_ENV === 'production') {
    config = require('./config-production.js');
} else {
    config = require('./config-development.js');
}

// shared configuration

config.database.multipleStatements = true;

export default config;
