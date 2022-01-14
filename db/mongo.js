const mongoose = require('mongoose');

const connectMongoDB = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB Connected: ${db.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectMongoDB;