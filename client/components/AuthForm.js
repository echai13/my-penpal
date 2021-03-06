import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="row d-flex align-items-center justify-content-center signup-login">
      <span>
        { props.name === 'login' &&
        <div className="auth-text col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center">
          <h4><span className="gray">New? </span>
            <span className="yellow"><Link to="/signup" className="no-link-dec yellow">Sign Up Now.</Link></span>
          </h4>
        </div>
      }
        <div className="col-md-12 col-sm-12 col-xs-12 auth-form">
        <form onSubmit={handleSubmit} name={name} className="center-block">
          <div className="form-group">
            <label htmlFor="email"><small>Email</small></label>
            <input name="email" type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password"><small>Password</small></label>
            <input name="password" type="password" className="form-control" />
          </div>
          { props.name === 'signup' &&
            <span>
              <div className="form-group">
                <label htmlFor="username"><small>Username</small></label>
                <input name="username" type="text" className="form-control" />
              </div>
              <div className="form-group col-md-12"><small>Gender</small>
                  <label htmlFor="female" type="text">
                    <input name="gender" type="radio" value="F" /> Female
                  </label>
                  <label htmlFor="male" type="text">
                    <input name="gender" type="radio" value="M" /> Male
                  </label>
              </div>
            </span>
          }

          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-sm-4 col-xs-4">
              <button type="submit" className="form-control">{displayName}</button>
            </div>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        </div>
      </span>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Go',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Welcome',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value || ''
      const password = evt.target.password.value || ''
      const username = evt.target.username && evt.target.username.value || ''
      const gender = evt.target.username && evt.target.gender.value || ''
      dispatch(auth({ email, password, username, gender }, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
