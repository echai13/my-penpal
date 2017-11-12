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
    <div className="login">
      { props.name === 'login' &&
        <div className="auth-text text-center">
          <h4><span className="gray">New? </span>
            <span className="yellow"><Link to="/signup" className="no-link-dec yellow">Sign Up Now.</Link></span>
          </h4>
        </div>
      }
      <div className="form-width">
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


        <div className="form-group">
          <button type="submit" className="form-control yellow">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      </div>
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
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
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
