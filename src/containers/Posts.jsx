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

  componentDidMount(){
    if (this.state.items.length == 0) {
      this.getItems()
    }
  }

  componentWillReceiveProps(nextProps) {
    const newState = {items: nextProps.items.items, loading: false}
    this.setState(newState)
  }

  updateButton() {
    return <Button size='small' onClick={() => {this.getItems()}} loading={this.state.loading} icon='reload'>
      <FormattedMessage id='data.reload' />
    </Button>
  }

  timeLine(items) {
    return items.map((record) => {
      return <Timeline.Item><PostItem record={record} /></Timeline.Item>
    })
  }

  render() {
    const items = (this.state.items && this.state.items.length > 0) ? this.state.items : []
    return <Card title={<FormattedMessage id='header.posts' />} extra={this.updateButton()}>
      <Timeline>{this.timeLine(items)}</Timeline>
    </Card>
  }
}

export default Posts = connect(store => ({
    user: store.auth, items: store.posts
}))(Posts)
