const { model, Schema } = require('mongoose');

    let killlogSchema = new Schema({
      User: String,
      Deaths: Number,
      PlayerKills: Number,
      UserName: String,
});

module.exports = model('killlog', killlogSchema);