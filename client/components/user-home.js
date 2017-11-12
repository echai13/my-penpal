import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchFriends } from '../store'

/**
 * COMPONENT
 */
class UserHome extends React.Component {

  componentDidMount() {
    this.props.fetchAllFriends(this.props.user.id)
  }

  render() {
    return (
      <div>
        <h3>Welcome, {this.props.email}</h3>

        <ul>
          { this.props.friends && this.props.friends.map(friend => (
            <li key={friend.id}>{friend.username}</li>
          ))}
        </ul>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    user: state.user,
    friends: state.friends
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllFriends (userId) {
      console.log('enter')
      dispatch(fetchFriends(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
