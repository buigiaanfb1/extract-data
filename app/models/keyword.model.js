module.exports = (sequelize, Sequelize) => {
  const Keyword = sequelize.define('keyword', {
    keyword: {
      type: Sequelize.STRING,
    },
    totalResultsOfKeyword: {
      type: Sequelize.STRING,
    },
    numberOfLinks: {
      type: Sequelize.INTEGER,
    },
    totalAdWordsAdvertisers: {
      type: Sequelize.INTEGER,
    },
    rawHTML: {
      type: Sequelize.TEXT,
    },
  });

  return Keyword;
};
