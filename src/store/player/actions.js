import { CHANGE_VIDEO_ID, ADD_VIDEO_ID, REMOVE_VIDEO_ID, PLAY_NEXT, UPDATE_LIST } from "./actionConstants";

export const changeVideoId = payload => ({ type: CHANGE_VIDEO_ID, payload })
export const addVideoId = payload => ({ type: ADD_VIDEO_ID, payload })
export const removeVideoId = payload => ({ type: REMOVE_VIDEO_ID, payload })
export const playNextVideo = payload => ({ type: PLAY_NEXT, payload })
export const updateList = payload => ({ type: UPDATE_LIST, payload })