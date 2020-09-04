const initialState = {
  userList: [],
  activeUser: {},
  activeList: [],
  activeDays: [],
  activity: "",
  activehours: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, userList: action.data };
    case "SET_A_USER":
      return { ...state, activeUser: action.data };
    case "SET_A_LIST":
      return { ...state, activeList: action.data };
    case "SET_A_DATES":
      return { ...state, activeDays: action.data };
    case "SET_C_ACTIVITY":
      return { ...state, activity: action.data };
    case "SET_HOURS":
      return { ...state, activehours: action.data };
    default:
      return state;
  }
}

export default rootReducer;
