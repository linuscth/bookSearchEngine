const { User } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        Me: async (parents, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('savedBooks')
            }
            throw AuthenticationError
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw AuthenticationError
            }
            const correctPw = await user.isCorrectPassword(password)

            if (!correctPw) {
                throw AuthenticationError
            }
            const token = signToken(user);
            return { token, user }
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user }
        },
        saveBook: async (parent, { bookInput }, context) => {
            try {
                if (!context.user) {
                    throw AuthenticationError
                }
                const user = await User.findOneAndUpdate({ _id: context.user._id }, {
                    $addToSet: { savedBooks: bookInput }
                }, { new: true, runValidators: true }
                )
                return user

            } catch (error) {
                console.log(error);
                throw AuthenticationError
            }
        },
        removeBook: async (parent, { bookId }, context) => {
            try {
                if (!context.user) {
                    throw AuthenticationError
                }
                const user = await User.findOneAndUpdate({ _id: context.user._id }, {
                    $pull: { savedBooks: { bookId } }
                }, { new: true })
                return user
            } catch (error) {
                console.log(error);
                throw AuthenticationError
            }
        }

    }
}

module.exports = resolvers