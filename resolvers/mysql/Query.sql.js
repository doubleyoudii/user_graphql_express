// const {books} = require("../staticDB");
const Query = {
    books: (parent, args, ctx) => {
        console.log(ctx);
    },
    
}

module.exports =Query;