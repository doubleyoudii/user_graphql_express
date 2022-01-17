const Mutation = {
  signup: async(parent, { user }, {UserSql}) => {
    const userCreate = await UserSql.create(user);
    await userCreate.save()

    return userCreate;
  },
};

module.exports = Mutation;
