// review pizza hunt routes

const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thought-controller')

// add/get all thoughts
router.route('/')
      .get(getAllThought)
      .post(createThought);

// thoughts by id
router.route('/:id')
      .get(getThoughtById)
      .put(updateThought)
      .delete(deleteThought);

//add reaction
router.route('/:id/reactions')
      .post(addReaction);

// delete a reaction by id
router.route('/:id/reactions/:reactionId')
      .delete(deleteReaction);


module.exports = router;

