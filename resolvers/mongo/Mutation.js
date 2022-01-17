const Mutation = {
  addBook: (parent, { image, title }, ctx) => {
    let newAnimal = {
      image,
      title,
    };

    return newAnimal;
  },

  signup: async (parent, {user}, {User}) => {
    const userCreate = await User.create(user);
    await userCreate.save()

    return userCreate;
  }
};

module.exports = Mutation;
