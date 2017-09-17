var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SettingSchema = mongoose.Schema({
    admin: {
		type: Schema.ObjectId,
		ref: 'user',
		required: true
    },
    ioMessage: {
        type: String,
        trim: true
    },
    ioPercent: {
        type: Number,
        trim: true
    },
    iiMessage: {
        type: String,
        trim: true
    },
    iiPercent: {
        type: String,
        trim: true
    },
    

});

var Setting = module.exports = mongoose.model('Setting', SettingSchema);