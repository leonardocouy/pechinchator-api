const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app, settings) => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/api/users', require('../routes/api/users'));

  // Error handlers
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json(err);
  });
};
