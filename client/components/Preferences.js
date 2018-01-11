import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchInterests, setPref, fetchFriends } from '../store'

export class Preferences extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedInterests: new Set(),
      selectedLocation: '',
      selectedGender: 'nopref',
      userId: this.props.user.id,
      toggleForm: false
    }
    this.handleCheck = this.handleCheck.bind(this)
    this.handleRadio = this.handleRadio.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllInterests()
    this.props.fetchAllFriends(this.props.user.id)
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
    const preferences = ({ gender: this.state.selectedGender, location: this.state.selectedLocation, interests: Array.from(this.state.selectedInterests), userId: this.state.userId })

    this.props.submitPreferences(preferences)
  }

  render() {
    return (
      <div className="row preferences">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center">
              <h3>Welcome, { this.props.user.username }</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-12 col-xs-12 d-flex justify-content-center">
              <div>
                <h4>About You</h4>
                <p>Gender: { this.props.user.gender }</p>
                <p>Location: { this.props.user.location }</p>
                <h5>Your Penpals: </h5>
                <div className="row d-flex justify-content-center">
                  { this.props.friends.map(friend => (
                  <div className="col-md-4" key={friend.id}>
                    <img className="col-md-12" src="/avatar-guy-01.png" />
                    <div className="col-md-12">{friend.username}</div>
                  </div>
                  )
                )}
                </div>
              </div>
            </div>


            <div className="col-md-6 col-sm-12 col-xs-12 d-flex justify-content-center your-info">
              <div>
                <h4>Preferences</h4>
                <p>Gender: { this.props.user.preference ? this.props.user.preference.gender : 'Set gender' }</p>
                <p>Location: { this.props.user.preference ? this.props.user.preference.location : 'Set Location' }</p>
                <p>Interests: { this.props.user.interests.map(interest => interest.category).join(', ') || 'Set your interests'}</p>
                <button type="submit" onClick={() => this.setState({ toggleForm: !this.state.toggleForm })}>Edit Preferences</button>
              </div>
            </div>

          </div>
        { this.state.toggleForm &&
        <div className="row edit-form">
          <div className="col-md-12 d-flex justify-content-center pref-form">
            <form onSubmit={this.handleSubmit} className="interest">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <h4>Interests</h4>
                    <div className="row">
                    { this.props.interests && this.props.interests.map(interest => (
                      <div className="col-md-3" key={interest.id}>
                      <label htmlFor="interest" type="text">
                        <input
                          name="interest"
                          type="checkbox"
                          value={interest.id}
                          onChange={this.handleCheck}
                        /> {interest.category}
                      </label>
                      </div>
                    ))}
                    </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 col-sm-12 col-xs-12">
                  <h4>Gender Preference</h4>
                  <div>
                    <label htmlFor="female" type="text">
                      <input name="gender" type="radio" value="F" onChange={this.handleRadio} /> Female
                    </label>
                    <label htmlFor="male" type="text">
                      <input name="gender" type="radio" value="M" onChange={this.handleRadio} /> Male
                    </label>
                    <label htmlFor="nopref" type="text">
                      <input name="gender" type="radio" value="No Preference" onChange={this.handleRadio} /> No Preference
                    </label>
                  </div>
                </div>

                <div className="col-md-6 col-sm-12 col-xs-12">
                  <h4>Location</h4>
                  <select onChange={this.handleSelect}>
                    { this.props.countries && this.props.countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <button type="submit">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
        }
      </div>
    </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    interests: state.interests,
    countries: state.countries,
    friends: state.friends
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllInterests() {
      dispatch(fetchInterests())
    },
    submitPreferences(preferences) {
      dispatch(setPref(preferences))
    },
    fetchAllFriends(userId) {
      dispatch(fetchFriends(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Preferences)
