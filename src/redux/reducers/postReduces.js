import * as types from "../actions/actionTypes";

const initialState = {
    posts: [],
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_POSTS:
            return { ...state, posts: action.payload };
        default:
            return state;
    }
};

export default postReducer;
