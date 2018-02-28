import React, {Component} from 'react'

import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Link} from 'react-router'

import moment from 'moment/min/moment.min'
import { FormattedMessage } from 'react-intl'

import { commentDelete } from '../actions/comments'
import { postGet } from '../actions/posts'

import { Button, Card, Icon, message } from 'antd'

const ButtonGroup = Button.Group

class CommentItem extends Component {

  shortDate(data) {
    const date = moment(data)
    return date.format('DD MMM YY hh:mm:ss')
  }

  destroyItem(postId, commentId) {
    this.props.dispatch(commentDelete(postId, commentId))
    this.props.dispatch(postGet(postId))
    message.info('Delete comment called now')
  }

  recordActions(postId, commentId) {
    if (this.props.user.email) {
      return <Button type='danger' onClick={() => { this.destroyItem(postId, commentId)}}><FormattedMessage id='common.destroy' /></Button>
    }
  }

  render() {
    const { record, postId } = this.props
    return (<Card title={<div><Icon type="book" /> {record.author}</div>}
      extra={this.recordActions(postId, record.id)}
      actions={[<div>{this.shortDate(record.created_at)}</div>]}
      >
        {record.content}
      </Card>
    )
  }
}

export default CommentItem = connect(store => ({
  user: store.auth
}))(CommentItem)
