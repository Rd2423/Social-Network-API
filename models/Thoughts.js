const { Schema, model } = require('mongoose');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: "Required",
            validate: [({ length }) => length <= 280, "Character limit 280"]
        },
        username: {
            type: String,
            required: "Required"
        },
        createAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);



const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Text required!",
            validate: [({ length }) => length <= 280, "Character limit 280"]
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: createdAtVal => dateFormat(createdAtVal)
        },
        username: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    }
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.reduce(
        (total, reaction) => total + reaction.replies.length + 1, 0
    );
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;