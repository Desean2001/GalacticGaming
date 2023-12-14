const express = require("express");
const router = express.Router()

const {
  createUser,
  getSingleUser,
  saveGame,
  deleteGame,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveGame);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/games/:gameId').delete(authMiddleware, deleteGame);

module.exports = router;