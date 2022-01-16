const Mutation = {
  addBook: (parent, { image, title }, ctx) => {
    let newAnimal = {
      image,
      title,
    };

    return newAnimal;
  },
};

module.exports = Mutation;
