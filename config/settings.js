const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

const settings = {
  development: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    mongoUri: process.env.MONGO_URL || 'mongodb://localhost/pechinchator',
    port: process.env.PORT || 8000,
    isProduction,
  },
  test: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    mongoUri: process.env.MONGO_TEST_URL || 'mongodb://localhost/pechinchator_test',
    port: process.env.PORT || 8000,
    isProduction,
  },
  env,
};

module.exports = settings[env];
