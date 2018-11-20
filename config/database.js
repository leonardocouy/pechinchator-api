const mongoose = require('mongoose');

module.exports = (settings) => {
  mongoose.connect(settings.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  mongoose.set('debug', true);

  const db = mongoose.connection;

  db.once('open', (err) => { if (err) throw err; });
  db.on('error', err => console.log(`Database error: ${err}`));
};
