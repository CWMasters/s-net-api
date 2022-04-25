const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user-controller');

// get/create all
router.route('/')
      .get(getAllUsers)
      .post(addUser);
      
// get/update/delete user by id   
router.route('/:id')     
      .get(getUserById)
      .put(updateUser)
      .delete(deleteUser);

// users friends by id
router.route('/:id/friends/:friendId')
      .post(addFriend)
      .delete(deleteFriend);

module.exports = router;