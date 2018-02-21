import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Link} from 'react-router'
import {push} from 'react-router-redux'
import moment from 'moment/min/moment.min'
import { FormattedMessage } from 'react-intl'

import {categoriesGet, categoryDelete} from '../actions/categories'

import DataTable from './DataTable'
import CategoryAdd from './CategoryAdd'

import { Icon, Button, Input, message } from 'antd'
const ButtonGroup = Button.Group

class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: (props.categories && props.categories.items) ? props.categories.items : [],
    }
  }

  getItems() {
    this.setState({loading: true})
    this.props.dispatch(categoriesGet())
  }

  destroyItem(itemId) {
    this.setState({loading: true})
    this.props.dispatch(categoryDelete(itemId))
  }

  componentDidMount(){
    if (this.state.items.length == 0) {
      this.getItems()
    }
  }

  componentWillReceiveProps(nextProps) {
    const newState = {items: nextProps.categories.items, loading: false}
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
    let buttons = []
    if (this.props.user.email) {
      buttons.push(<CategoryAdd showModal={this.state.categoryAdd} />)
    }
    buttons.push(<Button size='small'
        onClick={() => {this.getItems()}} loading={this.state.loading} icon='reload'>
        <FormattedMessage id='data.reload' />
      </Button>)
    return <ButtonGroup>{buttons}</ButtonGroup>
  }

  actions(record) {
    let buttons = []
    buttons.push(<Button><Link to={record.url+'/edit'}><FormattedMessage id='common.edit' /></Link></Button>)
    buttons.push(<Button type='danger' onClick={() => { this.destroyItem(record.id)}}><FormattedMessage id='common.destroy' /></Button>)
    return <ButtonGroup>{buttons}</ButtonGroup>
  }

  render() {
    let columns = [
      {
        title: <FormattedMessage id='common.name' />,
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => {
          if(a.name < b.name) return -1
          if(a.name > b.name) return 1
          return 0
        },
      },
      {
        title: <FormattedMessage id='category.description' />,
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => {
          if(a.name < b.name) return -1
          if(a.name > b.name) return 1
          return 0
        },
      },
      {
        title: <FormattedMessage id='common.created' />,
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text)=> this.shortDate(text),
        sorter: (a, b) => this.sortDate(a.created_at, b.creatend_at),
      },
      {
        title: <FormattedMessage id='post.count' />,
        dataIndex: 'posts.length',
        key: 'posts.length',
        render: (text,record) => record.posts.length,
      },
    ]

    if (this.props.user.email) {
      columns.push({ title: <FormattedMessage id='common.actions' />,
        dataIndex: 'actions',
        key: 'action',
        render: (text,record) => this.actions(record)})
    }

    const items = (this.state.items) ? this.state.items : []
    return (<DataTable title={<FormattedMessage id='header.categories' />} extra={this.updateButton()} items={items} columns={columns}
      loading={this.state.loading}/>
    )
  }
}

export default Categories = connect(store => ({
    user: store.user, categories: store.categories
}))(Categories)
