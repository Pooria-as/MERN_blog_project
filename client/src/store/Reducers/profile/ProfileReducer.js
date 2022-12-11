import {
  CLEAR_PROFILE,
  CREATE_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
} from "../../typs";

const initialState = {
  profile: null,
  loading: true,
  profiles: [],
  respositories: [],
  error: {},
};

const ProfileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROFILE:
      return { ...state, loading: false, profile: payload };
    case PROFILE_ERROR:
      return { ...state, loading: false, error: payload };
    case CLEAR_PROFILE:
      return { ...state, loading: false, profile: null, respositories: [] };
    case CREATE_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload,
      };
    default:
      return state;
  }
};

export default ProfileReducer;
