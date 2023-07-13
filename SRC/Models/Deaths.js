const { model, Schema } = require('mongoose');

    let deathSchema = new Schema({
      User: String,
      Deaths: Number,
      UserName: String,
});

module.exports = model('deaths', deathSchema);