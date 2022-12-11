const Profile = require("../models/Profile");
const Joi = require("joi");
const User = require("../models/User");
const axios = require("axios");

module.exports = {
  UserProfile: async (req, res) => {
    try {
      const FindUserProfile = await Profile.findOne({
        user: req.user.id,
      }).populate("user", ["name", "avatar"]);

      if (!FindUserProfile) {
        return res.status(400).send({ Message: "User Profile Not Found !" });
      }
      return res.status(200).send(FindUserProfile);
    } catch (error) {
      console.log(error);
    }
  },

  UserGithub: async (req, res) => {
    try {
      const usersname = req.params.git_username;
      const url = `https://api.github.com/users/${usersname}`;
      const data = await axios.get(url);
      const final = await data.data;
      return res.status(200).send({ final });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  UpdateOrCreateProfile: async (req, res) => {
    const querySchema = Joi.object({
      status: Joi.string().required(),
      company: Joi.string(),
      skills: Joi.string().required(),
      website: Joi.string(),
      location: Joi.string(),
      bio: Joi.string(),
      githubusername: Joi.string(),
      youtube: Joi.string(),
      twitter: Joi.string(),
      linkedin: Joi.string(),
      facebook: Joi.string(),
      phoneNumber: Joi.string(),
      instagram: Joi.string(),
    });

    const result = querySchema.validate(req.body);
    if (querySchema.validate(req.body).error) {
      return res.status(400).send(result.error.details[0].message);
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      linkedin,
      facebook,
      instagram,
      phoneNumber,
      experience,
      education,
    } = req.body;

    const ProfileData = {};
    ProfileData.user = req.user.id;
    if (company) ProfileData.company = company;
    if (website) ProfileData.website = website;
    if (location) ProfileData.location = location;
    if (status) ProfileData.status = status;
    if (skills)
      ProfileData.skills = skills.split(",").map((skill) => skill.trim());
    if (bio) ProfileData.bio = bio;
    if (githubusername) ProfileData.githubusername = githubusername;

    //build social profile
    ProfileData.social = {};
    if (youtube) ProfileData.social.youtube = youtube;
    if (twitter) ProfileData.social.twitter = twitter;
    if (facebook) ProfileData.social.facebook = facebook;
    if (linkedin) ProfileData.social.linkedin = linkedin;
    if (instagram) ProfileData.social.instagram = instagram;
    if (phoneNumber) ProfileData.social.phoneNumber = phoneNumber;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update

        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: ProfileData },
          { new: true }
        );

        return res
          .status(200)
          .send({ msg: "update successfully", ProfileData });
      }

      profile = await new Profile(ProfileData);
      await profile.save();

      return res
        .status(200)
        .json({ messgae: "Profile Created Successfully", ProfileData });
    } catch (error) {
      console.log(error);
      return res.status(500).send("server error");
    }
  },

  GetAllProfiles: async (req, res) => {
    try {
      const Profiles = await Profile.find().populate("user", [
        "name",
        "avatar",
      ]);
      return res.status(200).send({ Profiles });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  },

  GetProfileByUserId: async (req, res) => {
    try {
      const FindProfileByUserId = await Profile.findOne({
        user: req.params.user_id,
      }).populate("user", ["name", "avatar"]);

      if (!FindProfileByUserId) {
        res.status(400).send({ Message: "User Profile Not Found !" });
      }
      return res
        .status(400)
        .send({ Message: "found user !", FindProfileByUserId });
    } catch (error) {
      console.log(error);
    }
  },

  DeleteProfile: async (req, res) => {
    try {
      await Profile.findOneAndDelete({ user: req.user.id });
      await User.findOneAndDelete({ _id: req.user.id });

      return res.status(200).send("User and User's Profile hass Deleted !");
    } catch (error) {
      console.log(error);
      return res.status(500).send("server error");
    }
  },

  AddExperience: async (req, res) => {
    const { title, company, location, from, to, current, description } =
      req.body;

    const NewExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    const querySchema = Joi.object({
      title: Joi.string().required(),
      company: Joi.string().required(),
      from: Joi.string().required(),
      location: Joi.string(),
      to: Joi.string(),
      current: Joi.string(),
      description: Joi.string(),
    });

    const result = querySchema.validate(req.body);
    if (querySchema.validate(req.body).error) {
      res.status(400).send(result.error);
    }
    try {
      const GetProfile = await Profile.findOne({ user: req.user.id });
      GetProfile.experience.unshift(NewExperience);
      await GetProfile.save();
      return res.status(200).send({ mesg: "exprience added successfully !" });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  },

  AddEducation: async (req, res) => {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
      isEducated,
    } = req.body;

    const NewEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
      isEducated,
    };

    const querySchema = Joi.object({
      school: Joi.string().required(),
      degree: Joi.string().required(),
      fieldofstudy: Joi.string().required(),
      from: Joi.string(),
      current: Joi.string(),
      to: Joi.string(),
      description: Joi.string(),
      isEducated: Joi.string(),
    });

    const result = querySchema.validate(req.body);
    if (querySchema.validate(req.body).error) {
      res.status(400).send(result.error);
    }
    try {
      const GetProfile = await Profile.findOne({ user: req.user.id });
      GetProfile.education.unshift(NewEducation);
      await GetProfile.save();
      return res.status(200).send({ mesg: "exprience added successfully !" });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  },

  DeleteExperience: async (req, res) => {
    try {
      const GetProfile = await Profile.findOne({ user: req.user.id });

      const DeleteIndex = GetProfile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);
      GetProfile.experience.splice(DeleteIndex, 1);
      await GetProfile.save();
      return res.status(200).send({ mesg: "exprience Deleted successfully !" });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  },

  DeleteEducation: async (req, res) => {
    try {
      const GetProfile = await Profile.findOne({ user: req.user.id });

      const DeleteIndex = GetProfile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);
      GetProfile.education.splice(DeleteIndex, 1);
      await GetProfile.save();
      return res.status(200).send({ mesg: "Education Deleted successfully !" });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  },
};
