import axios from 'axios'
import history from '../history'
import { setSingleMessage } from './singleMessage'
import { setNotification } from './notification'
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

export const checkMessagesStatus = (userId) =>
  dispatch =>
    axios.get(`/api/messages/${userId}/checkstatus`)
      .then(messages => {
        console.log(messages)
        dispatch(setNotification(messages.data.length))
      })
      .catch(err => console.log(err))

export const saveMessage = message =>
  dispatch => {
    axios.post(`/api/messages/${message.sender.id}`, message)
      .then(res => dispatch(setSingleMessage(res.data)))
      .catch(err => console.log(err))
    }

export const sendMessage = message =>
  dispatch => {
    console.log('sendMessage')
    axios.put(`/api/messages/${message.sender.id}`, message)
      .then(_ => {
        dispatch(setSingleMessage({}))
        console.log('enter here')
        history.push(`/home`)
      })
      .catch(err => console.log(err))
  }

export default function (state = defaultMessages, action) {
  switch (action.type) {
    case SET_MESSAGES:
      return action.messages
    default:
      return state
  }
}
