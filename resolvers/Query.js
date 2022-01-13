const {books} = require("../db");
const Query = {
    books: () => books,
    
}

module.exports =Query;