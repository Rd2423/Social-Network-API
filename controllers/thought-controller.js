const { Thought, User } = require('../models');

const thoughtController = {
    getAllThought(req, res){
        Thought.find({})
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.id })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    createThought({body}, res){
        Thought.create(body)
        .then(data => res.json(data)
        ).catch(err => res.json(err));
    },
    updateThought({params, body}, res){
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true})
        .then(data => {
            if(!data){
                res.status(404).json({ message: "This thought can't be found"});
                return;
            }
            res.json(data)
        }).catch(err => res.json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(data => res.json(data))
        .catch(err => res.json(err));
    }
};
module.exports = thoughtController;