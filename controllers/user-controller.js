const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getUserById({ params }, res){
        User.findOne({ _id: params.id })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    createUser({ body }, res){
        User.create(body)
        .then(data => res.json(data))
        .catch(err => res.json(err));
    },
    updateUser({ params, body }, res){
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidator: true })
        .then(data => {
            if(!data){
                res.status(404).json({ message: 'No user found with this id!'})
                return;
            }
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    deleteUser({ params}, res){
        User.findOneAndDelete({ _id: params.id })
        .then(data => res.json(data))
        .catch(err => res.json(err));
    }
};

module.exports = userController;