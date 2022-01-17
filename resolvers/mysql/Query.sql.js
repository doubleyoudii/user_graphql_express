// const {books} = require("../staticDB");
const Query = {
    users: async (parent, args, {UserSql, books}) => {
        const user = await UserSql.findAll();
        return user;
    },
    
}

module.exports =Query;