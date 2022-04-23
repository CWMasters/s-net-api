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
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
   
    // get thought by id
    // create a new thought
    // update a thought
    // delete a thought
    // add a reaction
    // delete a reaction

    
};



module.exports = thoughtController;