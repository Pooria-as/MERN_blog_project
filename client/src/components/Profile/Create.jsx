import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CreateProfile } from "../../store/actions/Profile";
import Alert from "../Alert/Alert";

const Create = ({ CreateProfile }) => {
  const [FormData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    githubusername: "",
    youtube: "www.linkedin.com",
    twitter: "www.linkedin.com",
    linkedin: "www.linkedin.com",
    facebook: "www.linkedin.com",
    instagram: "www.linkedin.com",
    phoneNumber: "",
  });
  let navigate = useNavigate();
  const [ToggleSocialMedia, setToggleSocialMedia] = useState(false);

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
  } = FormData;

  const ChangeHandler = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const socialToggle = () => {
    setToggleSocialMedia(!ToggleSocialMedia);
  };

  const showSocialMedia = (
    <>
      <div className="form-group social-input">
        <i className="fab fa-twitter fa-2x"></i>
        <input
          type="text"
          placeholder="Twitter URL"
          name="twitter"
          value={twitter}
          onChange={ChangeHandler}
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-facebook fa-2x"></i>
        <input
          type="text"
          placeholder="Facebook URL"
          name="facebook"
          value={facebook}
          onChange={ChangeHandler}
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-youtube fa-2x"></i>
        <input
          type="text"
          placeholder="YouTube URL"
          name="youtube"
          value={youtube}
          onChange={ChangeHandler}
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-linkedin fa-2x"></i>
        <input
          type="text"
          placeholder="Linkedin URL"
          name="linkedin"
          value={linkedin}
          onChange={ChangeHandler}
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-instagram fa-2x"></i>
        <input
          type="text"
          placeholder="Instagram URL"
          name="instagram"
          value={instagram}
          onChange={ChangeHandler}
        />
      </div>
      <input type="submit" className="btn btn-primary my-1" />
    </>
  );

  const SubmitHandler = (e) => {
    e.preventDefault();

    CreateProfile(FormData, navigate);
  };

  return (
    <div className="dashboard_style">
      <section className="container">
        <Alert />
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to make
          your profile stand out
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={SubmitHandler}>
          <div className="form-group">
            <select name="status" value={status} onChange={ChangeHandler}>
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={ChangeHandler}
            />
            <small className="form-text">
              Could be your own company or one you work for
            </small>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="+989128633142"
              name="phoneNumber"
              value={phoneNumber}
              onChange={ChangeHandler}
            />
            <small className="form-text">
              Could be your own PhoneNumber or one you work for
            </small>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Website"
              value={website}
              name="website"
              onChange={ChangeHandler}
            />
            <small className="form-text">
              Could be your own or a company website
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              value={location}
              name="location"
              onChange={ChangeHandler}
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Skills"
              value={skills}
              name="skills"
              onChange={ChangeHandler}
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              name="githubusername"
              value={githubusername}
              onChange={ChangeHandler}
            />
            <small className="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              onChange={ChangeHandler}
              value={bio}
            ></textarea>
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="my-2">
            <button
              type="button"
              className="btn btn-light"
              onClick={socialToggle}
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>

          {ToggleSocialMedia && showSocialMedia}

          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </section>
    </div>
  );
};

export default connect(null, { CreateProfile })(Create);
