import * as types from "./actionTypes";

export const setIsLoggedIn = (payload) => {
    console.log("userActions: setIsLoggedIn", payload);
    return {
        type: types.USER_IS_LOGGEDIN,
        payload,
    };
};

export const setCurrentUser = (payload) => {
    return {
        type: types.SET_CURRENT_USER,
        payload,
    };
};

export const setUserPosts = (payload) => ({
    type: types.SET_CURRENT_USER_POSTS,
    payload,
});
