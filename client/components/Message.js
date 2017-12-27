import React, { Component } from 'react'
import history from '../history'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { fetchFriends, saveMessage, sendMessage, getSingleMessage } from '../store'

class Message extends Component {
  constructor() {
    super()
    this.state = {
      action: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setAction = this.setAction.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllFriends(this.props.user.id)
    console.log(this.props.match.params.messageId)
  }

  setAction (value) {
    this.setState({ action: value })
  }

  handleSubmit (evt) {
    evt.preventDefault()
    if (this.state.action === 'save') this.props.handleSave({ sender: this.props.user, receiver: this.props.friends[evt.target.friend.value], content: evt.target.content.value })

    else this.props.singleMessage && this.props.singleMessage.id ? this.props.handleSend({ content: evt.target.content.value, messageId: this.props.singleMessage.id, sender: this.props.user }) : this.props.handleSend({ sender: this.props.user, receiver: this.props.friends[evt.target.friend.value], content: evt.target.content.value })
  }

  render() {
    return (
      <div className="row write-message">
        <div className="col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center">

        <form onSubmit={this.handleSubmit} className="center-block">
          <div className="form-group row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <label className="center-block"><small>To: </small>
              <select name="friend">
                { this.props.friends && this.props.friends.map((friend, index) => (
                  <option value={index} key={friend.id} selected={ this.props.singleMessage.receiverId ? 'selected' : ''}>{friend.username}</option>
                ))}
              </select>
              </label>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-12 col-sm-12 col-xs-12">
            { this.props.singleMessage && this.props.singleMessage.content ? <textarea name="content" className="message-content form-control center-block" defaultValue={this.props.singleMessage.content} placeholder="Write your letter..." /> :
              <textarea name="content" className="message-content form-control center-block" placeholder="Write your letter..." />
            }
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <button type="submit" onClick={() => this.setAction('save')}>Save Changes</button>
              <button type="submit" onClick={() => this.setAction('send')}>Send</button>
            </div>
          </div>

        </form>
      </div>
    </div>
    )
  }
}

const mapState = state => {
  console.log(state.singleMessage)
  return {
    user: state.user,
    friends: state.friends,
    singleMessage: state.singleMessage
  }
}
const mapDispatch = dispatch => {
  return {
    fetchAllFriends (userId) {
      dispatch(fetchFriends(userId))
    },
    handleSave (message) {
      dispatch(saveMessage(message))
    },
    handleSend (message) {
      dispatch(sendMessage(message))
    }
  }
}

export default connect(mapState, mapDispatch)(Message)
