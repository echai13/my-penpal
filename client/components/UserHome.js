/* eslint-disable class-methods-use-this */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchFriends, checkMessagesStatus } from '../store'

/**
 * COMPONENT
 */
class UserHome extends React.Component {

  componentDidMount() {
    this.props.fetchAllFriends(this.props.user.id)
    this.props.checkMessages(this.props.user.id)
  }

  render() {
    return (
      <div className="row home-page d-flex align-items-center justify-content-center">
        <div className="col-md-6 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs">
              <Link to="/inbox"><img src="/received_letters.png" className="received" /></Link>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs">
              <img src="/stamp.png" className="stamps" />
            </div>
          </div>

        </div>
        <div className="col-md-6 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs">
              <Link to="/write"><img src="/new_letters.png" className="write" /></Link>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs">
              <img src="/writing_utensils.png" className="utensils" />
            </div>
          </div>
        </div>
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
    },
    checkMessages (userId) {
      console.log(`enter checkMessages`)
      dispatch(checkMessagesStatus(userId))
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
