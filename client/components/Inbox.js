import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchReceived, fetchSent, fetchDrafts, setSingleMessage, setNotification } from '../store'

class Inbox extends React.Component {
  constructor() {
    super()
    this.state = {
      receivedToggle: true,
      sentToggle: false,
      draftToggle: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    this.props.fetchMessages('received', this.props.user.id)
  }

  handleClick(type) {
    if (type === 'received') this.setState({ receivedToggle: !this.state.receivedToggle })
    else if (type === 'sent') this.setState({ sentToggle: !this.state.sentToggle })
    else this.setState({ draftToggle: !this.state.draftToggle })

    this.props.fetchMessages(type, this.props.user.id)
  }


  render() {
    return (
      <div className="row inbox">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center">
              <button type="submit" onClick={() => this.handleClick('received')}>Received</button>
              <button type="submit" onClick={() => this.handleClick('sent')}>Sent</button>
              <button type="submit" onClick={() => this.handleClick('drafts')}>Drafts</button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12 inbox-content">
             { (this.state.draftToggle &&
               this.props.messages && this.props.messages.map(message => (
                 <div key={message.id} className="inbox-message">
                   <h5>To: {message.receiver.username}</h5>
                   <h5>From: {message.sender.username}</h5>
                   <Link to={`/drafts/${message.id}`} onClick={() => this.props.fetchSingleMessage(message)}>{message.truncate}</Link>
                 </div> )))

              ||

              (this.state.sentToggle || this.state.receivedToggle)  &&
              this.props.messages && this.props.messages.map(message => (
                <div key={message.id} className="inbox-message">
                  <h5>To: {message.receiver.username}</h5>
                  <h5>From: {message.sender.username}</h5>
                  <Link to={`/messages/${message.id}`}>{message.truncate}</Link>
                </div>))
              }
          </div>
        </div>
      </div>
    </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    messages: state.messages
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchMessages (type, userId) {
      dispatch(setNotification(0))
      if (type === 'received') dispatch(fetchReceived(userId))
      else if (type === 'sent') dispatch(fetchSent(userId))
      else dispatch(fetchDrafts(userId))
    },
    fetchSingleMessage (message) {
      dispatch(setSingleMessage(message))
    }
  }
}

export default connect(mapState, mapDispatch)(Inbox)
