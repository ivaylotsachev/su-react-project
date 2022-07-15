import * as types from "../actions/actionTypes";

const initialState = {
    isLoading: true,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_IS_LOADING:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};

export default appReducer;
