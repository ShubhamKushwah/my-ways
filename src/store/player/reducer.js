import { CHANGE_VIDEO_ID, ADD_VIDEO_ID, REMOVE_VIDEO_ID, PLAY_NEXT, UPDATE_LIST } from './actionConstants';
import { reorder } from 'react-reorder';

const initialState = {
  currentVideoId: null,
  list: []
};

const player = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_VIDEO_ID:
      return {
        ...state,
        currentVideoId: payload
      };
    case ADD_VIDEO_ID:
      return {
        ...state,
        list: [
          ...state.list,
          payload
        ]
      }
    case REMOVE_VIDEO_ID:
      return {
        ...state,
        list: [
          ...state.list.filter(item => item !== payload)
        ]
      }
    case PLAY_NEXT:
      const index = state.list.indexOf(state.currentVideoId);
      const nextVideoId = state.list[index + 1]
      const newList = [...state.list];
      if (index > -1) {
        newList.splice(index, 1);
      }
      return {
        ...state,
        list: [
          ...newList
        ],
        currentVideoId: nextVideoId
      }
    case UPDATE_LIST:
      const updatedList = reorder(state.list, payload.prev, payload.next);
      return {
        ...state,
        list: [...updatedList]
      }
    default: {
      return state;
    }
  }
};

export default player;
