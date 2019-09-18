import * as types from '../constants'
const initialState = []
export default beautyReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.ADD_BEAUTY:
      return [...state, ...action.lists]
    default:
      return state
  }
}