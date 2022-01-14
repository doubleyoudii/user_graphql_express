const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, { timestamps: true });

schema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

schema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};


module.exports = mongoose.model('User', schema);
