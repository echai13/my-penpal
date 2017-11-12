import axios from 'axios'
const defaultPenpals = []

const GET_PENPALS = 'GET_PENPALS'

const getPenpals = penpals => ({ type: GET_PENPALS, penpals })

export const fetchPenpals = (user) =>
  dispatch =>
    axios.get(`/api/users/${user.id}/penpals`)
      .then(results => results.data)
      .then(penpals => {
        console.log(penpals)
        dispatch(getPenpals(penpals))

      })
      .catch(err => console.log(err))

export default function (state = defaultPenpals, action) {
  switch (action.type) {
    case GET_PENPALS:
      return action.penpals
    default:
      return state
  }
}
