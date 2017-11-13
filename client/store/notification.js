const SET_NOTIFICATION = 'SET_NOTIFICATION'
const defaultNotification = 0

export const setNotification = num => ({ type: SET_NOTIFICATION, num })

export default function (state = defaultNotification, action) {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.num
    default:
      return state
  }
}
