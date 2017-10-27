const mongoose = require('mongoose'),
      mongooseStringQuery = require('mongoose-string-query');

require('mongoose-double')(mongoose);
const SchemaTypes = mongoose.Schema.Types;


const UserSchema = new mongoose.Schema(
    {
        name : {
            type     : String,
            required : true,
            trim     : true
        },
        pay : {
            type     : SchemaTypes.Double,
            required : true
        },
        age : {
            type     : Number,
            required : true
        }
    },
    {
        minimize   : false, // http://mongoosejs.com/docs/guide.html#minimize
        versionKey : false  // http://mongoosejs.com/docs/guide.html#versionKey 
    }
);


UserSchema.plugin(mongooseStringQuery);


const User = mongoose.model('User', UserSchema);
module.exports = User;