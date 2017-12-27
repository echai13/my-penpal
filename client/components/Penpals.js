import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPenpals, setPenpal } from '../store'

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
        <div className="penpals row">
        { this.props.penpals && this.props.penpals.map(penpal => (
          <div key={penpal.id} className="penpals-list col-md-4">
            <h4 className="col-md-12">{penpal.username}</h4>
            <img className="col-md-12" src={penpal.image} />
            { this.props.friends.length < 3 &&
            <div><button type="submit" onClick={() => this.props.addPenpal(this.props.user.id, penpal.id)}>Add Friend</button></div>
            }
          </div>
        ))}
        </div>
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
    },
    addPenpal(userId, penpalId) {
      dispatch(setPenpal({ userId, penpalId }))
    }
  }
}

export default connect(mapState, mapDispatch)(Penpals)
