const { model, Schema } = require('mongoose');

    let blacklistSchema = new Schema({
      User: String,
      UserID: String,
      Reason: String
});

module.exports = model('blacklist', blacklistSchema);