import axios from 'axios'
const defaultSingleMessage = {}


const SET_MESSAGE = 'SET_MESSAGE'
export const setSingleMessage = message => ({ type: SET_MESSAGE, message })

// export const getSingleMessage = messageId =>
//   dispatch =>
//     axios.get(`/api/messages/${messageId}`)
//       .then(message => dispatch(setSingleMessage(message.data)))
//       .catch(err => console.log(err))

export default function (state = defaultSingleMessage, action) {
  switch (action.type) {
    case SET_MESSAGE:
      return action.message
    default:
      return state
  }
}
