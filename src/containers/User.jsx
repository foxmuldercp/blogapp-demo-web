import React, {Component} from 'react'

import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Link} from 'react-router'
import moment from 'moment/min/moment.min'
import { FormattedMessage } from 'react-intl'

import {postsUserGet} from '../actions/posts'

import Posts from './Posts'

import { Button, Card, Timeline, Icon } from 'antd'

const ButtonGroup = Button.Group

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: (props.posts) ? props.posts.items : null,
      loading: true,
    }
  }

  getItems() {
    this.setState({loading: true})
    this.props.dispatch(postsUserGet(this.props.params.id))
  }

  componentDidMount(){
    this.getItems()
  }

  componentWillReceiveProps(nextProps) {
    let { posts, profile } = this.state
    posts = (nextProps.posts.items && nextProps.posts.items) ? nextProps.posts.items : posts
    const newState = {post: posts, profile: profile, loading: false}
    this.setState(newState)
  }

  updateButton() {
    return <Button size='small' onClick={() => {this.getItems()}} loading={this.state.loading} icon='reload'>
      <FormattedMessage id='data.reload' />
    </Button>
  }

  render() {
    const {posts} = this.state
    return (<div><span>User profile here</span>
      <Posts items={posts} />
    </div>
    )
  }
}

export default User = connect(store => ({
  user: store.auth, posts: store.posts
}))(User)
