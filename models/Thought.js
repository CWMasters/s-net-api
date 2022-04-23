// review models/comment.js in pizza hunt

const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            // line 9 comment.js 
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: 'You must enter a username!'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal) 
        },
    },
    {
        toJSON: {
            getters: true
        },
    }
    
);

const ThoughtSchema = new Schema(
    {
       thoughtText: {
           type: String,
           required: 'Please enter a thought!',
           minLenght: 1,
           maxLength: 280,
           trim: true
       },
       createdAt: {
           type: Date,
           default: Date.now,
           get: createdAtVal => dateFormat(createdAtVal)
       },
       username: {
           type: String,
           required: 'Please enter a username!'
       },
       reactions: [ReactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false
    }
);

// virtual retrieving length of thoughhts reactions array on query
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought= model('Thought', ThoughtSchema);



module.exports = Thought;