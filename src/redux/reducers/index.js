import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReduces";

export default combineReducers({
    user: userReducer,
    posts: postReducer,
});
