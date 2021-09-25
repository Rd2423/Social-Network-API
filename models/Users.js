const { Schema, model } = require('mongoose');

const UsersSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: "Username is required",
            trim: true
        },
        email: {
            type: String,
            required: "Email is required",
            unique: true,
            validate: {
                validator: function(email) {
                    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
                },
                message: e => `${e.value} is not a email`
            }
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
                ref: "User"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UsersSchema.virtual('friendCount').get(function() {
    return this.friends.reduce(
        (total, friend) => total + friend.lenght);
});

const User = model('User', UsersSchema);

module.exports = User;