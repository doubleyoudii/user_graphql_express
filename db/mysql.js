const Sequelize = require('sequelize');

const connectMysqlDB = async () => {
    try {
        const mysqlConn = await new Sequelize(
            process.env.MYSQL_DB || 'flux',
            process.env.MYSQL_USER || 'root',
            process.env.MYSQL_PASS || '1234',
            {
              dialect: 'mysql',
              host: process.env.MYSQL_HOST || 'localhost',
              logging: false,
            }
          );

        await mysqlConn.authenticate();
        console.log('Successfully connected MySQL');
        return mysqlConn;
    } catch (error) {
        console.error('Unable to connect to the MySQL database:', error);
    }
}

module.exports = connectMysqlDB;