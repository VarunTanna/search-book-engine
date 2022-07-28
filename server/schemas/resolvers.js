const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if(context.user) {
            const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                return userData;
        }
        throw new AuthenticationError("Not Logged In");
    },
  },
  Muation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password}) => {
      const user = await User.findOne({
        $or: [{ username: body.username }, { email: body.email }],
      });

      const correctPw = await user.isCorrectPassword(password);

      const token = signToken(user);
      return { token, user };
    },
    async saveBook(parent, { user, body }) {
      console.log(user);
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: body } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      
    },
    async deleteBook(parent, { user, params }) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );
      return updatedUser;
    },
  },
};

module.exports = resolvers;
