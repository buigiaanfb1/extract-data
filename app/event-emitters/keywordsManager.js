const EventEmitter = require('events');

class KeywordManager extends EventEmitter {
  constructor() {
    super();
  }

  crawl(userId, keywords) {
    this.emit('crawl', userId, keywords);
  }
}

module.exports = KeywordManager;
