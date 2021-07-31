const userController = require('../controllers/user-controller');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
  Query: {
    users: async () => {
      // Get and return all documents from the classes collection
      return User.find().populate('savedBooks');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('savedBooks');
    },
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
    saveBook: async (parent, { description, title, bookId, image, link }) => {
      const book = await Book.create({ description, title, bookId, image, link });

      await User.findOneAndUpdate(
        { username: thoughtAuthor },
        { $addToSet: { savedBooks: book.bookId } }
      );

      return User;
    },
    deleteBook: async (parent, { bookId }) => {
      return User.findOneAndDelete({savedBooks: book.bookId });
    },
  },
};

module.exports = resolvers;
