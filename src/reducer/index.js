import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice"
import courseReducer from "../slices/courseSlice"
import viewCourseReducer from "../slices/viewCourseSlice"
import sidebarReducer from "../slices/sidebarSlice"
import videoDetailsSidebarReducer from "../slices/videoDetailsSidebarSlice"

const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer,
    sidebar:sidebarReducer,
    videoDetailsSidebar:videoDetailsSidebarReducer
})

export default rootReducer