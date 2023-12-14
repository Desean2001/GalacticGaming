const express = require("express");
const router = express.Router()

const {
  createUser,
  getSingleUser,
  findUsername,
  saveGame,
  deleteGame,
  login,
  createFriend,
  deleteFriend,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveGame);

router.route('/:username').get(findUsername);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/games/:gameId').delete(authMiddleware, deleteGame);

router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend);

module.exports = router;