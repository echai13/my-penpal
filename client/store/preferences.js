import axios from 'axios'
const defaultPreferences = {}

const GET_GENDER = 'GET_GENDER'
const GET_LOCATION = 'GET_LOCATION'

const getGender = (gender) => ({ type: GET_GENDER, gender })
const getLocation = (location) => ({ type: GET_LOCATION, location })


export const setPref = (preferences, userId) =>
  dispatch =>
    axios.put(`/api/preferences/${userId}`, preferences)
      .then(_ => {
        dispatch(getGender(preferences.selectedGender))
        dispatch(getLocation(preferences.selectedLocation))
      })
      .catch(err => console.log(err))


  export default function (state = defaultPreferences, action) {
    switch (action.type) {
      case GET_GENDER:
        return Object.assign({}, state, { gender: action.gender })
      case GET_LOCATION:
        return Object.assign({}, state, { location: action.location })
      default:
        return state
    }
  }
