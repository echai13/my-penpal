import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchInterests, setPref } from '../store'

export class Preferences extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedInterests: new Set(),
      selectedLocation: '',
      selectedGender: 'nopref',
      userId: this.props.user.id
    }
    this.handleCheck = this.handleCheck.bind(this)
    this.handleRadio = this.handleRadio.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllInterests()
  }

  handleCheck (evt) {
    const chosenInterest = evt.target.value
    const selectedInterests = this.state.selectedInterests

    selectedInterests.has(chosenInterest) ?
    selectedInterests.delete(chosenInterest) :
    selectedInterests.add(chosenInterest)
  }

  handleRadio (evt) {
    this.setState({ selectedGender: evt.target.value })
  }

  handleSelect(evt) {
    this.setState({ selectedLocation: evt.target.value })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log(this.state)
    const preferences = ({ gender: this.state.selectedGender, location: this.state.selectedLocation, interests: Array.from(this.state.selectedInterests), userId: this.state.userId })

    this.props.submitPreferences(preferences)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Interests</h4>
        { this.props.interests && this.props.interests.map(interest => (
          <label key={interest.id} htmlFor="interest" type="text">
            <input
              name="interest"
              type="checkbox"
              value={interest.id}
              onChange={this.handleCheck}
            /> {interest.category}
          </label>
        )
        )}

        <h4>Gender Preference</h4>
        <label htmlFor="female" type="text">
          <input name="gender" type="radio" value="F" onChange={this.handleRadio} /> Female
        </label>
        <label htmlFor="male" type="text">
          <input name="gender" type="radio" value="M" onChange={this.handleRadio} /> Male
        </label>
        <label htmlFor="nopref" type="text">
          <input name="gender" type="radio" value="No Preference" onChange={this.handleRadio} /> No Preference
        </label>

        <h4>Location</h4>
        <select onChange={this.handleSelect}>
          { this.props.countries && this.props.countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        <button type="submit">Save Changes</button>
      </form>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    interests: state.interests,
    countries: state.countries
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllInterests() {
      dispatch(fetchInterests())
    },
    submitPreferences(preferences) {
      dispatch(setPref(preferences))
    }
  }
}

export default connect(mapState, mapDispatch)(Preferences)
