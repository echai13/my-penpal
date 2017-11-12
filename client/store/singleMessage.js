import axios from 'axios'
const defaultSingleMessage = {}


const SET_MESSAGE = 'SET_MESSAGE'
export const setSingleMessage = message => ({ type: SET_MESSAGE, message })



export default function (state = defaultSingleMessage, action) {
  switch (action.type) {
    case SET_MESSAGE:
      return action.message
    default:
      return state
  }
}
