import React, {Component} from 'react'

import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Link} from 'react-router'
import moment from 'moment/min/moment.min'
import { FormattedMessage } from 'react-intl'

import {postGet} from '../actions/posts'
import {commentsGet} from '../actions/comments'

import CommentAdd from './CommentAdd'

import PostItem from './PostItem'
import CommentItem from './CommentItem'


import { Button, Card, Timeline, Icon } from 'antd'

const ButtonGroup = Button.Group

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      post: (props.post.item) ? props.post.item : null,
      comments: (props.comments && props.comments.items) ? props.comments : null,
      loading: true,
    }
  }

  getItems() {
    this.setState({loading: true})
    this.props.dispatch(postGet(this.props.params.id))
    this.props.dispatch(commentsGet(this.props.params.id))
  }

  componentDidMount(){
    this.getItems()
  }

  componentWillReceiveProps(nextProps) {
    let { post, comments } = this.state
    comments = (nextProps.comments.items) ? nextProps.comments.items : comments
    post = (nextProps.post.item && nextProps.post.item.id) ? nextProps.post.item : post
    const newState = {post: post, comments: comments, loading: false}
    this.setState(newState)
  }

  updateButton() {
    return <Button size='small' onClick={() => {this.getItems()}} loading={this.state.loading} icon='reload'>
      <FormattedMessage id='data.reload' />
    </Button>
  }

  commentsShow(postId, comments) {
    return comments.map((item) => {
      return <Timeline.Item><CommentItem record={item} postId={postId} /></Timeline.Item>
    })
  }

  showPost(post) {
    return (post) ? <PostItem record={post} /> : <div>Loading</div>
  }

  showCommentAdd(post) {
    return (post) ? <CommentAdd postId={post.id}/> : <div>Loading</div>
  }

  render() {
    const {post, comments} = this.state
    return (<div>{this.showPost(post)}
      <p style={{'text-align': 'center'}}>
        <Button size={'large'}>
          <Link to='/posts'><FormattedMessage id='nav.back_to_list' /></Link>
        </Button>
      {this.showCommentAdd(post)}
     </p>
      { (post && comments.length > 0) ?
        <Timeline>{this.commentsShow(post.id, comments)}
      </Timeline> : null }
    </div>
    )
  }
}

export default Post = connect(store => ({
  user: store.auth, post: store.post, comments: store.comments
}))(Post)
