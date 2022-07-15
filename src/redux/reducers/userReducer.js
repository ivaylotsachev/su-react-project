import * as types from "../actions/actionTypes";

const initialState = {
    isLoggedIn: false,
    currentUser: null,
};

const userReducer = (state = initialState, action) => {
    const { payload } = action;

    switch (action.type) {
        case types.USER_IS_LOGGEDIN:
            return { ...state, isLoggedIn: payload };
        case types.SET_CURRENT_USER:
            return { ...state, currentUser: payload };
        case types.SET_CURRENT_USER_POSTS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    posts: payload,
                },
            };
        default:
            return state;
    }
};

export default userReducer;
