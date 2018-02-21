import React, {Component} from 'react'

import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Link} from 'react-router'
import moment from 'moment/min/moment.min'

import { FormattedMessage } from 'react-intl'

import CommentAdd from './CommentAdd'

import { Button, Card, Icon } from 'antd'

const ButtonGroup = Button.Group

class PostItem extends Component {

  shortDate(data) {
    const date = moment(data)
    return date.format('DD MMM YY hh:mm:ss')
  }

  actions(record) {
    let buttons = []
    if (this.props.user.email) {
      buttons.push(<Button><Link to={record.url+'/edit'}><FormattedMessage id='common.edit' /></Link></Button>)
      buttons.push(<Button type='danger' onClick={() => { this.destroyItem(record.id)}}><FormattedMessage id='common.destroy' /></Button>)
    }
    return <ButtonGroup>{buttons}</ButtonGroup>
  }

  render() {
    const { record } = this.props
    return (<Card title={<Link to={record.url}><Icon type="book" />{record.name}</Link>}
      extra={this.actions(record)}
      actions={[<div>{this.shortDate(record.created_at)}</div>,
        <Link to={record.category.url}><Icon type="tag" />{record.category.name}</Link>,
        <Link to={record.user.url}><Icon type="user" />{record.user.email}</Link>,
        <Link to={record.url}><Icon type='list' />
        <FormattedMessage id='post.comments_count' />: {record.comments_count}</Link>]}
      >
        {record.content}
      </Card>
    )
  }
}

export default PostItem = connect(store => ({
  user: store.user
}))(PostItem)
