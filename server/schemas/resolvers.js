const userController = require('../controllers/user-controller');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    /*
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('savedBooks');
    }, */
    //Book
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { author, description, title, bookId, image, link }, context) => {
    if (context.user) {
      const book = await Book.create({ author, description, title, bookId, image, link });

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: book.bookId } }
      );

      return User;
    }
    throw new AuthenticationError('You need to be logged in!');
  },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const book = await Book.findOneAndDelete({
          _id: bookId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: Book._id } }
        );

        return User;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
