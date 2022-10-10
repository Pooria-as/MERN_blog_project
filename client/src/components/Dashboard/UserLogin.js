import React from "react";
import { connect } from "react-redux";

const UserLogin = ({ user }) => {
  console.log(user);
  return <div>{user.name}</div>;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(UserLogin);
