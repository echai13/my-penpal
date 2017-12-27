import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout, setSingleMessage} from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn} = props

  return (
    <div className="container-fluid no-padding">
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center">
          <img src="/envelope.png" alt="envelope-logo" className="logo" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <nav className="d-flex justify-content-center">
            {
              isLoggedIn
                && <div>
                  {/* The navbar will show these links after you log in */}
                  <Link to="/home">Home</Link>
                  <Link to="/inbox">Inbox {props.notification ? props.notification : ''}</Link>
                  <Link to="/preferences">Preferences</Link>
                  <Link to="/penpals">Penpals</Link>
                  <Link to="/write" onClick={props.handleWriteNew}>New Letter</Link>
                  <a href="#" onClick={handleClick}>Logout</a>
                </div>
            }
          </nav>
        </div>
      </div>
      <hr />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    notification: state.notification
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    },
    handleWriteNew () {
      dispatch(setSingleMessage({}))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
