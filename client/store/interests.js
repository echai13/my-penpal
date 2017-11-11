import axios from 'axios'
const defaultInterests = []


const GET_INTERESTS = 'GET_INTERESTS'

const getInterests = (interests) => ({ type: GET_INTERESTS, interests })

export const fetchInterests = () =>
  dispatch =>
    axios.get(`/api/interests`)
      .then(interests => dispatch(getInterests(interests)))
      .catch(err => console.log(err))


export default function (state = defaultInterests, action) {
  switch (action.type) {
    case GET_INTERESTS:
      return action.interests
    default:
      return state
  }
}
