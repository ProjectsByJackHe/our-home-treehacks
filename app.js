/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const dotenv = require('dotenv');
const path = require('path');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config();

/**
 * Controllers (route handlers).
 */
const checkBookController = require('./controllers/checkbook');

/**
 * Create Express server.
 */

const app = express();

/**
 * Express configuration.
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/**
 * CheckBook API app routes.
 */


app.post("/api/checkbook/sendcheck", checkBookController.sendcheck);
app.post("/api/checkbook/requestpayment", checkBookController.requestPayment);
app.get("/checkbook/payment", (req, res, next) => {
  res.sendFile(__dirname + "/onboard/index.html")
})

app.use((req, res, next) => {
  res.sendFile(__dirname + "/arcgis/arcgis.html");
})

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

/**
 * Start Express server.
 */
const port = 5000
app.listen(port, () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), port, app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
