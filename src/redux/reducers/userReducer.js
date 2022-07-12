import * as types from "../actions/actionTypes";

const initialState = {
    isAuthenticated: false,
    currentUser: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_IS_AUTHENTICATED:
            return { ...state, isAuthenticated: action.payload };
        case types.SET_CURRENT_USER:
            return { ...state, currentUser: action.payload };
        default:
            return state;
    }
};

export default userReducer;
