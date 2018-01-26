import axios from 'axios'
const defaultPreferences = {}

const GET_GENDER = 'GET_GENDER'
const GET_LOCATION = 'GET_LOCATION'
const GET_PREFERENCES = 'GET_PREFERENCES'

const getGender = (gender) => ({ type: GET_GENDER, gender })
const getLocation = (location) => ({ type: GET_LOCATION, location })
const getPref = (pref) => ({ type: GET_PREFERENCES, pref})


export const setPref = (preferences, userId) =>
  dispatch =>
    axios.put(`/api/preferences/${userId}`, preferences)
      .then(_ => {
        dispatch(getGender(preferences.selectedGender))
        dispatch(getLocation(preferences.selectedLocation))
      })
      .catch(err => console.log(err))

export const fetchPref = (userId) =>
  dispatch =>
    axios.get(`/api/preferences/${userId}`)
      .then(results => results.data)
      .then(pref => dispatch(getPref(pref)))
      .catch(err => console.log(err))


  export default function (state = defaultPreferences, action) {
    switch (action.type) {
      case GET_GENDER:
        return Object.assign({}, state, { gender: action.gender })
      case GET_LOCATION:
        return Object.assign({}, state, { location: action.location })
      case GET_PREFERENCES:
        return Object.assign({}, state, { gender: action.pref.gender || 'No Preference', location: action.pref.location || 'Venus' })
      default:
        return state
    }
  }
