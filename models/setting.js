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
        trim: true,
        default: "Go see your trainer!"
    },
    ioPercent: {
        type: Number,
        trim: true,
        default: 2.5
    },
    iiMessage: {
        type: String,
        trim: true,
        default: "Go see your trainer!"
    },
    iiPercent: {
        type: Number,
        trim: true,
        default: 2.5
    }
});

// Virtual for this book instance URL
SettingSchema
.virtual('url')
.get(function () {
    return '/dashboard/settings/' + this._id;
});

var Setting = module.exports = mongoose.model('Setting', SettingSchema);