const cron = require('node-schedule');
const puppeteer = require('puppeteer-extra');
const { Op } = require('sequelize');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const db = require('../models');
const KeywordManager = require('../event-emitters/keywordsManager');
const timer = require('../utils/timer');

// Bypass mass-searching Google (sometimes it works, and sometimes it's not)
puppeteer.use(StealthPlugin());

const Keyword = db.keyword;

const keywordManager = new KeywordManager();

keywordManager.on('crawl', async (userId, keywords) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // Crawl data from each keyword
  for (const keyword of keywords) {
    // initial object
    const data = {
      keyword: keyword.keyword,
      userId: keyword.userId,
      totalResultsOfKeyword: '0',
      numberOfLinks: 0,
      totalAdWordsAdvertisers: 0,
      rawHTML: '',
      isCompleted: false,
    };
    // wait 20s to avoid Google captcha if possible
    await timer(20000);

    await page.goto(`http://www.google.com/search?q=${data.keyword}&hl=en`, {
      waitUntil: 'networkidle2',
    });
    try {
      data.totalResultsOfKeyword = await page.evaluate(
        'document.querySelector("#result-stats").innerText'
      );
      data.numberOfLinks = await page.$$eval(
        'a',
        (as) => as.map((a) => a.href).length
      );
      data.totalAdWordsAdvertisers = await page.evaluate(
        () => document.querySelectorAll('[aria-label="Ads"] > div').length
      );
      data.rawHTML = await page.evaluate(
        () => document.getElementsByTagName('html')[0].innerHTML
      );
      data.isCompleted = true;
      Keyword.update(
        {
          ...data,
        },
        {
          where: {
            id: keyword.id,
          },
        }
      );
    } catch (e) {}
  }

  // Run cron too check if the account have in-complete keyword.
  const task = cron.scheduleJob('*/1 * * * * *', async () => {
    await crawlKeyword(userId);
    task.cancel();
  });
});

async function crawlKeyword(userId) {
  Keyword.findAll({
    where: {
      userId: userId,
    },
    order: [['id', 'DESC']],
  }).then(async (result) => {
    if (Boolean(result.length)) {
      let keyWordUnCrawl = [];
      for (const keyword of result) {
        if (!keyword.isCompleted) {
          keyWordUnCrawl.push(keyword);
        }
      }
      if (Boolean(keyWordUnCrawl.length)) return;
      keywordManager.crawl(userId, keyWordUnCrawl);
    }
  });
}

exports.searchByEachKeyWords = async (req, res) => {
  const { keywords } = req.body;

  if (keywords.length <= 100 && Boolean(keywords.length)) {
    let arrayValidated = keywords
      .filter((keyword) => keyword)
      .map((keyword) => ({
        keyword: keyword,
        userId: req.userId,
        totalResultsOfKeyword: '',
        numberOfLinks: 0,
        totalAdWordsAdvertisers: 0,
        rawHTML: '',
        isCompleted: false,
      }));
    Keyword.bulkCreate(arrayValidated, { individualHooks: true })
      .then(async function (response) {
        if (response.length <= 5) {
          keywordManager.crawl(
            req.userId,
            response.slice(0, arrayValidated.length)
          );
        } else {
          keywordManager.crawl(req.userId, response.slice(0, 5));
        }
        return res.status(200).send({ message: 'Uploaded' });
      })
      .catch(function (error) {
        res.json(error);
      });
  } else {
    return res.status(422).send({
      statusCode: 422,
      accessToken: null,
      message: 'Keywords must be smaller than 100',
    });
  }
};

exports.findAllKeywordsById = async (req, res) => {
  Keyword.findAll({
    where: {
      userId: req.userId,
    },
    order: [['id', 'DESC']],
  })
    .then((result) => {
      return res.status(200).send({
        statusCode: 200,
        data: result,
        errors: null,
      });
    })
    .catch(() => {
      return res.status(404).send({
        statusCode: 200,
        data: null,
        errors: 'Error',
      });
    });
};

exports.findKeywordInfo = async (req, res) => {
  const { keyword } = req.query;
  Keyword.findAll({
    where: {
      userId: req.userId,
      keyword: {
        [Op.like]: '%' + keyword + '%',
      },
    },
  })
    .then((result) => {
      return res.status(200).send({
        statusCode: 200,
        data: result,
        errors: null,
      });
    })
    .catch(() => {
      return res.status(404).send({
        statusCode: 200,
        data: null,
        errors: 'Error',
      });
    });
};
