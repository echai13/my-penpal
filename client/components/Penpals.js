import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPenpals } from '../store'

/**
 * COMPONENT
 */
class Penpals extends Component {

  componentDidMount() {
    //have to fetchFriends
    this.props.fetchAllPenpals(this.props.user)
  }

  render() {
   return (
      <div>
        { this.props.penpals && this.props.penpals.map(penpal => (
          <li key={penpal.id}>{penpal.username}
            { this.props.friends.length < 2 &&
            <button type="submit">Add Friend</button>
            }
          </li>
        ))}
      </div>
    )
  }


}

const mapState = state => {
  console.log(state)
  return {
    user: state.user,
    penpals: state.penpals,
    friends: state.friends
  }
}
const mapDispatch = dispatch => {
  console.log('enter penpals')
  return {
    fetchAllPenpals(user) {
      dispatch(fetchPenpals(user))
    }
  }
}

export default connect(mapState, mapDispatch)(Penpals)
