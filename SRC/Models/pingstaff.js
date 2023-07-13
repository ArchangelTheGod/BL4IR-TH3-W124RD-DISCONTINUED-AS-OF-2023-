const { model, Schema } = require('mongoose');

    let pingstaffSchema = new Schema({
      Guild: String,
      RoleID: String,
      RoleName: String
});

module.exports = model('pingstaff', pingstaffSchema);