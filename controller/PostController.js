const Joi = require("joi");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  CreateNewPost: async (req, res) => {
    try {
      const { text } = req.body;
      //validtion for data entring
      const querySchema = Joi.object({
        text: Joi.string().required(),
      });
      const result = querySchema.validate(req.body);
      if (querySchema.validate(req.body).error) {
        res.status(400).send(result.error);
      }
      const user = await User.findOne({ user: req.user.id });
      const newPost = new Post({
        text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      await newPost.save();
      return res.status(200).send({ msg: "success", newPost });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  },
  GetUserPost: async (req, res) => {
    try {
      const UserPost = await Post.find({ user: req.user.id });
      if (!UserPost) {
        return res.status(404).send("User has not any post");
      }
      return res.status(200).send(UserPost);
    } catch (error) {
      console.log(error);
      return res.status(500).send("server Error");
    }
  },
  GetUserPostbyId: async (req, res) => {
    try {
      const UserPostById = await Post.find({ _id: req.params.post_id });
      if (!UserPostById) {
        return res.status(404).send("User's post not found");
      }
      return res.status(200).send(UserPostById);
    } catch (error) {
      console.log(error);
      return res.status(500).send("server Erro3r");
    }
  },
  DeletePostById: async (req, res) => {
    try {
      const UserPostById = await Post.findOneAndDelete({
        _id: req.params.post_id,
      });
      if (!UserPostById) {
        return res.status(404).send("User's post not found");
      }
      return res.status(200).send({ msg: "Deleted Successfully " });
    } catch (error) {
      console.log(error);
      return res.status(500).send("server Erro3r");
    }
  },
  Like: async (req, res) => {
    try {
      const UserPostById = await Post.findById(req.params.post_id);
      const PostLikeByUserStatus =
        UserPostById.likes.filter(
          (like) => like.user.toString() === req.user.id
        ).length > 0;

      if (PostLikeByUserStatus) {
        return res.status(200).send("post already liked");
      }
      await UserPostById.likes.push({ user: req.user.id });
      await UserPostById.save();

      return res.status(200).send("post liked successfully ");
    } catch (error) {
      console.log(error);
      return res.status(500).send("post not found");
    }
  },
  UnLike: async (req, res) => {
    try {
      const UserPostById = await Post.findById(req.params.post_id);
      const PostLikeByUserStatus =
        UserPostById.likes.filter(
          (like) => like.user.toString() === req.user.id
        ).length < 0;

      if (PostLikeByUserStatus) {
        return res.status(200).send("post didn't  like before");
      }

      const DeleteIndex = UserPostById.likes
        .map((item) => item.id)
        .indexOf(req.params.post_id);
      UserPostById.likes.splice(DeleteIndex, 1);
      await UserPostById.save();
      return res.status(200).send("post liked deleted ! ");
    } catch (error) {
      console.log(error);
      return res.status(500).send("post not found");
    }
  },
  NewComment: async (req, res) => {
    try {
      const { text } = req.body;
      //validtion for data entring
      const querySchema = Joi.object({
        text: Joi.string().required(),
      });
      const result = querySchema.validate(req.body);
      if (querySchema.validate(req.body).error) {
        res.status(400).send(result.error);
      }
      const user = await User.findOne({ user: req.user.id });
      const post = await Post.findOne({ id: req.params.post_id });
      const newCommentData = {
        text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.push(newCommentData);
      await post.save();
      return res
        .status(200)
        .send({ msg: "comment added successfully", newCommentData });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  },

  DeleteComment: async (req, res) => {
    const post_id = req.params.post_id;
    const comment_id = req.params.comment_id;

    try {
      const GetPost = await Post.findOne({ id: post_id });

      const findComment = GetPost.comments.find(
        (comment) => comment.id === comment_id
      );

      if (!findComment) {
        return res.status(404).json({ msg: "Comment does not exist" });
      }
      // Check user
      if (findComment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      GetPost.comments = GetPost.comments.filter(({ id }) => id !== comment_id);

      await GetPost.save();

      return res.status(200).send("Comment Removed !");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  },
};
