import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchReceived, fetchSent, fetchDrafts, setSingleMessage } from '../store'

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
      <div>
        <button type="submit" onClick={() => this.handleClick('received')}>Received</button>
        <button type="submit" onClick={() => this.handleClick('sent')}>Sent</button>
        <button type="submit" onClick={() => this.handleClick('drafts')}>Drafts</button>
        <div>
           { (this.state.draftToggle &&
             this.props.messages && this.props.messages.map(message => (
               <li key={message.id}><Link to={`/drafts/${message.id}`} onClick={() => this.props.fetchSingleMessage(message)}>{message.content}</Link></li> )))

            ||

            (this.state.sentToggle || this.state.receivedToggle)  &&
            this.props.messages && this.props.messages.map(message => (
              <li key={message.id}><Link to={`/messages/${message.id}`}>{message.content}</Link></li>))
            }
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
