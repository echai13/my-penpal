import axios from 'axios'

const defaultFriends = []

const GET_FRIENDS = 'GET_FRIENDS'

const getFriends = friends => ({ type: GET_FRIENDS, friends })

export const fetchFriends = (userId) =>
  dispatch =>
    axios.get(`/api/users/${userId}/friends`)
      .then(friends => {
        dispatch(getFriends(friends.data.friends))
      })
      .catch(err => console.log(err))

export default function (state = defaultFriends, action) {
  switch (action.type) {
    case GET_FRIENDS:
      return action.friends
    default:
      return state
    }
}
