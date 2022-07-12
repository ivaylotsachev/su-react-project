import * as types from "./actionTypes";

export const getCurrentUser = (payload) => {
    return {
        type: types.GET_CURRENT_USER,
        payload,
    };
};

export const setAuth = (payload) => {
    return {
        type: types.USER_IS_AUTHENTICATED,
        payload,
    };
};

export const setCurrentUser = (payload) => {
    return {
        type: types.SET_CURRENT_USER,
        payload,
    };
};
