const express = require("express");
const {
  CreateNewPost,
  GetUserPost,
  GetUserPostbyId,
  DeletePostById,
  Like,
  UnLike,
  NewComment,
  DeleteComment,
} = require("../../controller/PostController");
const Auth = require("../../middleware/Auth");
const router = express.Router();

//@route /api/posts

// create new porst need JWT
router.post("/", Auth, CreateNewPost);

//create new coomment for post route
router.post("/comment/:post_id", Auth, NewComment);
//delete comment for specific post by id
router.delete("/comment/:post_id/:comment_id", Auth, DeleteComment);

//like specific post by user
router.put("/like/:post_id", Auth, Like);
router.put("/unlike/:post_id", Auth, UnLike);
//get all posts of user
router.get("/", Auth, GetUserPost);
//get user post by id
router.get("/:post_id", Auth, GetUserPostbyId);
//delete post by id
router.delete("/:post_id", Auth, DeletePostById);

module.exports = router;
