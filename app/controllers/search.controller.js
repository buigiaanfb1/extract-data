const db = require('../models');
const puppeteer = require('puppeteer');

const Keyword = db.keyword;

exports.searchByEachKeyWords = async (req, res) => {
  const { keywords } = req.body;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const data = {
    keyword: null,
    userId: req.userId,
    totalResultsOfKeyword: 'Error',
    numberOfLinks: 0,
    totalAdWordsAdvertisers: 0,
    rawHTML: 'Error',
  };

  for (const keyword of keywords) {
    await page.goto(`http://www.google.com/search?q=${keyword}&hl=en`, {
      waitUntil: 'networkidle2',
    });
    data.keyword = keyword;
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

    await Keyword.create({
      ...data,
    });
  }

  return res.status(200).send(data);
};

exports.findAllKeywordsById = async (req, res) => {
  Keyword.findAll({
    where: {
      userId: req.userId,
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

exports.findKeywordInfo = async (req, res) => {
  const { keyword } = req.body;
  Keyword.findAll({
    where: {
      userId: req.userId,
      keyword,
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
