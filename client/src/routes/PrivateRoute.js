import { connect } from "react-redux";

import { useNavigate } from "react-router-dom";

function Private({ children, IsAuthenticate }) {
  let navigate = useNavigate();

  if (!IsAuthenticate) {
    // not logged in so redirect to login page with the return url
    return navigate("/login");
  }

  // authorized so return child components
  return children;
}

const mapStateToProps = (state) => ({
  IsAuthenticate: state.auth.IsAuthenticate,
});

export default connect(mapStateToProps)(Private);
