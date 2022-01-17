// const {books} = require("../staticDB");
const Query = {
    books: (parent, args, {books}) => books,
    users: async (parent, args, {User}) => {
        const user = await User.find();
        return user;
    },
    
}

module.exports =Query;