import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Link} from 'react-router'
import {push} from 'react-router-redux'
import moment from 'moment/min/moment.min'
import { FormattedMessage } from 'react-intl'


import {usersGet} from '../actions/users'

import DataTable from './DataTable'

import { Icon, Button, Input, message } from 'antd'
const ButtonGroup = Button.Group

class Users extends Component {
  constructor(props) {
    super(props)
    var demo = props.location.query.demo
    this.state = {
      privacy: demo,
      filteredItems: [],
      items: (props.items) ? props.items : [],
      filterDropdownVisible: false,
      searchText: '',
      loading: false
    }
  }

  getItems() {
    this.setState({loading: true})
    this.props.dispatch(usersGet())
  }

  destroyItem(itemId) {
    message.info('Delete user not implemented now')
//    this.setState({loading: true})
//    this.props.dispatch(removeItem(itemId))
  }

  componentDidMount(){
    if (this.props.items.users.length == 0) {
      this.getItems()
    }
  }

  componentWillReceiveProps(nextProps) {
    const newState = {items: nextProps.items.items, loading: false}
    this.setState(newState)
    if (this.state.searchText != '') { this.onSearch() }
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

  onInputChange(e) {
    this.setState({ searchText: e.target.value })
  }

  clearSearch() {
    this.setState({ filteredItems: [], filterDropdownVisible: false, searchText: '' })
  }

  onSearch() {
    const { searchText } = this.state
    const reg = new RegExp(searchText, 'gi')
    const filtered = this.state.items.map((record) => {
        const match = record.name.match(reg) || record.name_ascii.match(reg)
        if (!match) {
          return null
        }
        return {
          ...record,
          name: (
            <span>
              {record.name.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        }
      }).filter(record => !!record)

    this.setState({
      filterDropdownVisible: false,
    })

    if (filtered.length == 0) {
      message.info(<FormattedMessage id='data.missing' />)
      this.setState({ filterDropdownVisible: false, searchText: '' })
    } else {
      this.setState({ filterDropdownVisible: false, filteredItems: filtered })
    }
  }

  updateButton() {
    return <Button size='small' onClick={() => {this.getItems()}} loading={this.state.loading} icon='reload'>
      <FormattedMessage id='data.reload' />
    </Button>
  }

  actions(record) {
    let buttons = []
    buttons.push(<Button><Link to={'/users/'+record.id}>Posts</Link></Button>)
    buttons.push(<Button type='danger' onClick={() => { this.destroyItem(record.id)}}>Destroy</Button>)
    return <ButtonGroup>{buttons}</ButtonGroup>
  }

  render() {
    const columns = [
      {
        title: <FormattedMessage id='user.name' />,
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => {
          if(a.name < b.name) return -1
          if(a.name > b.name) return 1
          return 0
        },
        filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            placeholder="Search name"
            value={this.state.searchText}
            onChange={::this.onInputChange}
            onPressEnter={::this.onSearch}
          />
          <Button shape="circle" icon="search" onClick={::this.onSearch} type="primary" />
          <Button shape="circle" icon="close"  onClick={::this.clearSearch} />
        </div>
      ),
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),

      },
      {
        title: <FormattedMessage id='user.email' />,
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => {
          if(a.email < b.email) return -1
          if(a.email > b.email) return 1
          return 0
        },
      },
      {
        title: <FormattedMessage id='post.count' />,
        dataIndex: 'posts_count',
        key: 'posts_count',
      },
      {
        title: <FormattedMessage id='common.created' />,
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text)=> this.shortDate(text),
        sorter: (a, b) => this.sortDate(a.created_at, b.creatend_at),
      },
      {
        title: <FormattedMessage id='common.actions' />,
        dataIndex: 'actions',
        key: 'action',
        render: (text,record) => this.actions(record),
      },
    ]

    const items = (this.state.filteredItems.length > 0) ? this.state.items : this.state.items

    return (<DataTable title={<FormattedMessage id='header.users' />} extra={this.updateButton()} items={items} columns={columns}
      loading={this.state.loading}/>
    )
  }
}

export default Users = connect(store => ({
    user: store.auth, items: store.users
}))(Users)
