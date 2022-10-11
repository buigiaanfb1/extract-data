module.exports = {
  HOST: 'ec2-3-208-79-113.compute-1.amazonaws.com',
  USER: 'onszrrdhdtykbo',
  PASSWORD: 'f80ff9491ba4dd06d59c586e245828f956d784e29cf72317735318eba0df5fbb',
  DB: 'dfcbqciocrmag9',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
