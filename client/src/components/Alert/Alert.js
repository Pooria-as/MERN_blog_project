import React from "react";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {

  return (
    <>
      {alerts.length > 0
        ? alerts.map(({ id, message, alertType }) => (
            <div key={id} className={`alert  alert-${alertType}`}>
              {message}
            </div>
          ))
        : ""}
    </>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
