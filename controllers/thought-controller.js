const { Thought, User } = require('../models');

const thoughtController = {

    // get all thought
    getAllThought(req,res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
   
    // get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
     
    // create a new thought (pizza hunt create comment comment controllers)
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thought: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                console.log(dbThoughtData);
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },


    // addComment({ params, body }, res) {
    //     console.log(params);
    //     Comment.create(body)
    //       .then(({ _id }) => {
    //         return Pizza.findOneAndUpdate(
    //           { _id: params.pizzaId },
    //           { $push: { comments: _id } },
    //           { new: true }
    //         );
    //       })
    //       .then(dbPizzaData => {
    //         console.log(dbPizzaData);
    //         if (!dbPizzaData) {
    //           res.status(404).json({ message: 'No pizza found with this id!' });
    //           return;
    //         }
    //         res.json(dbPizzaData);
    //       })
    //       .catch(err => res.json(err));
    //   },
    




    // update a thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this id!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err));
    },



    // updateUser({ params, body }, res) {
    //     User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    //     .then(dbUserData => {
    //         if(!dbUserData) {
    //             res.status(404).json({ message: 'No user with this id!' });
    //             return;
    //         }
    //         res.json(dbUserData);
    //     })
    //     .catch(err => res.status(400).json(err));
    // },





    // delete a thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.staus(404).json({ message: 'No thought with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },


    // deleteUser({ params }, res) {
    //     User.findOneAndDelete({ _id: params.id })
    //     .then(dbUserData => {
    //         if(!dbUserData) {
    //             res.status(404).json({ message: 'No user with this id!' });
    //             return;
    //         }
    //         res.json(dbUserData);
    //     })
    //     .catch(err => res.status(400).json(err));
    // },




    // add a reaction (add friend with body)
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought with his id!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err));    
    },


    // addFriend({ params }, res) {
    //     User.findOneAndUpdate(
    //         { _id: params.id },
    //         { $push: { friends: params.friendId }},
    //         { new: true, runValidators: true }
    //     )
    
    //     .then(dbUserData => {
    //         if(!dbUserData) {
    //             res.status(404).json({ message: 'Non user with this id!' });
    //             return;
    //         }
    //         res.json(dbUserData);
    //     })
    //     .catch(err => res.status(400).json(err));
    // },




    // delete a reaction



    // deleteFriend({ params }, res) {
    //     User.findOneAndDelete(
    //         { _id: params.UserId },
    //         { $push: { friends: params.friendId }},
    //         { new: true, runValidators: true }
    //     )

    //     .then(dbUserData => {
    //         if(!dbUserData) {
    //             res.status(404).json({ message: 'No user with this id!' });
    //             return;
    //         }
    //         res.json(dbUserData);
    //     })
    //     .catch(err => res.status(400).json(err));
    // },

    
};



module.exports = thoughtController;