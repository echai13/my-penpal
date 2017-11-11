import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchInterests } from '../store'

class Preferences extends Component {
  constructor() {
    super()
    this.state = {
      selectedInterests: new Set()
    }
  }

  componentDidMount() {
    this.props.fetchAllInterests()
  }

  render() {
    return (
      <div>
        { this.props.interests && this.props.interests.map(interest => (
          <label key={interest.id} htmlFor="interest" type="text">
            <input type="checkbox" name="interest" value={interest.id} /> {interest.category}
          </label>
        )
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    interests: state.interests
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllInterests() {
      dispatch(fetchInterests())
    }
  }
}

export default connect(mapState, mapDispatch)(Preferences)
