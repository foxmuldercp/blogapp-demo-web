import React, {Component} from 'react'

import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Link} from 'react-router'
import numeral from 'numeral'
import moment from 'moment/min/moment.min'
import { FormattedMessage } from 'react-intl'

import {getPost} from '../actions/posts'
import {commentsGet, commentGet, commentAdd, commentDelete} from '../actions/comments'
import CommentAdd from './CommentAdd'


import { Button, Row, Col, Card, Switch, Spin, Timeline, Icon } from 'antd'
const { Meta } = Card
const ButtonGroup = Button.Group

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      item: {},
      loading: true,
      comments: (props.comments.items) ? props.comments.items : []
    }
  }

  getItems() {
    this.setState({loading: true})
    this.props.dispatch(getPost(this.props.params.id))
    this.props.dispatch(commentsGet(this.props.params.id))
  }

  commentDelete(item, comment) {
    this.setState({loading: true})
    this.props.dispatch(commentDelete(item.id, comment.id))
  }

  componentDidMount(){
    this.getItems()
  }

  componentWillReceiveProps(nextProps) {
    let { item, comments } = this.state
    comments = (nextProps.comments.items) ? nextProps.comments.items : comments
    item = (nextProps.item && nextProps.item.id) ? nextProps.item : item
    const newState = {item: item, comments: comments, loading: false}
    this.setState(newState)
  }

  updateButton() {
    return <Button size='small' onClick={() => {this.getItems()}} loading={this.state.loading} icon='reload'>
      <FormattedMessage id='data.reload' />
    </Button>
  }

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

  commentActions(item, comment) {
    return <Button type='danger' onClick={() => { this.commentDelete(item, comment)}}><FormattedMessage id='common.destroy' /></Button>
  }

  commentsShow(item, comments) {
    return comments.map((record) => {
      return (<Timeline.Item>
        <Card title={<span>{record.author} *** {this.shortDate(record.created_at)}</span>}
          actions={[this.commentActions(item, record),<Icon type="ellipsis" />]}>
            {record.content}
        </Card>
    </Timeline.Item>)})
  }

  render() {
    const {item, comments} = this.state
    return (<Card title={<span><Icon type="book" />{item.name}</span>} extra={this.actions(item)}>
      {item.content}
      <p style={{'text-align': 'center'}}>
        <Button size={'large'}>
          <Link to='/posts'>Back to list</Link>
        </Button>
        <CommentAdd post={item}/>
     </p>
      { (comments.length > 0) ?
        <Timeline>{this.commentsShow(item, comments)}
      </Timeline> : null }
    </Card>
    )
  }
}

export default Post = connect(store => ({
  user: store.user, item: store.post, comments: store.comments
}))(Post)
