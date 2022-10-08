const initialState = {
  users: ["132"],
};

const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_USERS":
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default UserReducer;