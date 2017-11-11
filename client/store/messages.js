import axios from 'axios'
const defaultMessages = []


const SET_MESSAGES = 'SET_MESSAGES'
const setMessages = messages => ({ type: SET_MESSAGES, messages })

export const fetchReceived = (userId) =>
  dispatch =>
    axios.get(`/api/messages/${userId}/received`)
      .then(messages => dispatch(setMessages(messages.data)))
      .catch(err => console.log(err))

export const fetchSent = (userId) =>
  dispatch =>
    axios.get(`/api/messages/${userId}/sent`)
      .then(messages => dispatch(setMessages(messages.data)))
      .catch(err => console.log(err))

export const fetchDrafts = (userId) =>
  dispatch =>
    axios.get(`/api/messages/${userId}/drafts`)
      .then(messages => dispatch(setMessages(messages.data)))
      .catch(err => console.log(err))


export default function (state = defaultMessages, action) {
  switch (action.type) {
    case SET_MESSAGES:
      return action.messages
    default:
      return state
  }
}
