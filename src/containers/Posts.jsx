import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Link} from 'react-router'
import {push} from 'react-router-redux'
import moment from 'moment/min/moment.min'
import { FormattedMessage } from 'react-intl'

import PostItem from './PostItem'

import {postsGet, postRemove} from '../actions/posts'

import { Icon, Button, Timeline, Card, message } from 'antd'
const { Meta } = Card
const ButtonGroup = Button.Group

class Posts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: (props.items.items) ? props.items.items : [],
      loading: false
    }
  }

  getItems() {
    this.setState({loading: true})
    this.props.dispatch(postsGet())
  }

  destroyItem(itemId) {
    this.setState({loading: true})
    this.props.dispatch(postRemove(itemId))
    message.info('Delete post called now')
  }

  componentDidMount(){
    if (this.state.items.length == 0) {
      this.getItems()
    }
  }

  componentWillReceiveProps(nextProps) {
    const newState = {items: nextProps.items.items, loading: false}
    this.setState(newState)
  }

  shortDate(data) {
    const date = moment(data)
    return date.format('DD MMM YY')
  }

  sortDate(a, b) {
    const date1 = moment(a)
    const date2 = moment(b)
    if(date1.isBefore(date2)) return -1
    if(date1.isAfter(date2))  return 1
    return 0
  }

  updateButton() {
    return <Button size='small' onClick={() => {this.getItems()}} loading={this.state.loading} icon='reload'>
      <FormattedMessage id='data.reload' />
    </Button>
  }


  actions(record) {
    let buttons = []
    if (this.props.user.email) {
      buttons.push(<Button><Link to={record.url+'/edit'}><FormattedMessage id='common.edit' /></Link></Button>)
      buttons.push(<Button type='danger' onClick={() => {this.destroyItem(record.id)}}><FormattedMessage id='common.destroy' /></Button>)
    }
    return <ButtonGroup>{buttons}</ButtonGroup>
  }

  timeLine(items) {
    const line = items.map((record) => {
      return <Timeline.Item><PostItem record={record} /></Timeline.Item>
    })
    return line
  }

  render() {
    const items = (this.state.items && this.state.items.length > 0) ? this.state.items : []
    return <Card title={<FormattedMessage id='header.posts' />} extra={this.updateButton()}>
      <Timeline>{this.timeLine(items)}</Timeline>
    </Card>
  }
}

export default Posts = connect(store => ({
    user: store.user, items: store.posts
}))(Posts)
