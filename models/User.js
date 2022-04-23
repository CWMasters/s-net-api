// ref models/pizza.js in pizza hunt

const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'You must enter a username!',
            trim: true
        },
        email: {
            type: String,
            required: 'You must use an valid email!',
            unique: true,
            match: [/.+\@.+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {   
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false
    }
);

// virtual retrieving length of users friends array on query
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
   