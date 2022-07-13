import * as types from "../actions/actionTypes";

const initialState = {
    isLoggedIn: false,
    currentUser: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_IS_LOGGEDIN:
            return { ...state, isLoggedIn: action.payload };
        case types.SET_CURRENT_USER:
            return { ...state, currentUser: action.payload };
        default:
            return state;
    }
};

export default userReducer;
