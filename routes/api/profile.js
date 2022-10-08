const express = require("express");
const Auth = require("../../middleware/Auth");
const Profile = require("../../models/Profile");
const {
  UserProfile,
  GetAllProfiles,
  UpdateOrCreateProfile,
  GetProfileByUserId,
  DeleteProfile,
  AddExperience,
  DeleteExperience,
  AddEducation,
  DeleteEducation,
  UserGithub,
} = require("../../controller/ProfileController");
const router = express.Router();

//@route /api/profile/me
// need access !

router.get("/me", Auth, UserProfile);
//@ /api/profile

router.get("/", GetAllProfiles);
router.get("/github/:git_username", UserGithub);
router.put("/Experience", Auth, AddExperience);
router.put("/Education", Auth, AddEducation);
router.delete("/Experience/:exp_id", Auth, DeleteExperience);
router.delete("/Education/:edu_id", Auth, DeleteEducation);
router.delete("/", Auth, DeleteProfile);
router.get("/:user_id", GetProfileByUserId);
router.post("/", Auth, UpdateOrCreateProfile);

module.exports = router;
