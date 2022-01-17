const Sequelize = require("sequelize");

// const sequelize = new Sequelize();
const bcrypt = require("bcrypt");

const SALT_WORK_FACTOR = 10;

const userSchema = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};
const hooks = {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        let salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.password) {
        let salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
  instanceMethods: {
    validPassword: async (password) => {
      return await bcrypt.compare(password, this.password);
    },
  },

  
};

module.exports = async (mysqlConn) => {
  const User = await mysqlConn.define("User", userSchema, hooks);
  User.sync();
  return User;
};
