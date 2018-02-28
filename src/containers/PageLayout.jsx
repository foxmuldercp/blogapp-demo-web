import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Link} from 'react-router'

import {logOut} from '../actions/auth'
import PostAdd from './PostAdd'

import { Layout, Menu, Icon, Button, Breadcrumb, Badge } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

import Cookie from 'js-cookie'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'

import en from 'react-intl/locale-data/en'
import ru from 'react-intl/locale-data/ru'
import uk from 'react-intl/locale-data/uk'
addLocaleData([...en, ...ru, ...uk])

let i18nConfig = { 'en': {
  locale: 'en',
  messages: require('../lang/en.json'),
  textComponent: "div"
}, 'ru': {
  locale: 'ru',
  messages: require('../lang/ru.json'),
  textComponent: "div"
}, 'uk': {
  locale: 'uk',
  messages: require('../lang/uk.json'),
  textComponent: "div"
}}

class PageLayout extends Component {

  state = {
    current: '/',
    locale: this.props.location.query.lang || Cookie.get('locale') || 'uk',
    categories: []
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  setLocale(language) {
    Cookie.set('locale', language)
    this.setState({locale: language})
  }

  langList() {
    let languages = ['uk','en','ru'];
    let buttons = []
    languages.forEach((item) => buttons.push(<Button onClick={() => this.setLocale(item)}>{item}</Button>))
    return buttons
  }

  render() {
    const {children, dispatch, location, user, cart } = this.props
    return (<IntlProvider locale={ this.state.locale } key={ this.state.locale } messages={i18nConfig[this.state.locale].messages}>
    <Layout theme="light">
    <Header className="header" theme="light" style={{background: '#fff'}}>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={[location.pathname]}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="/"><Link to='/'><FormattedMessage id='header.main' /></Link></Menu.Item>
        <Menu.Item key="/categories"><Link to='/categories'><FormattedMessage id='header.categories' /></Link></Menu.Item>
        { (user && user.email) ?
          <Menu.Item key="/users"><Link to='/users'><FormattedMessage id='header.users' /></Link></Menu.Item>
        : null }
        <Menu.Item key="/posts"><Link to='/posts'><FormattedMessage id='header.posts' /></Link></Menu.Item>
        { (user && user.email) ?
          <Menu.Item key="/post_add"><PostAdd showModal={this.state.postAdd} /></Menu.Item>
        : null }
        { (user && user.email) ?
          <SubMenu key="/user" title={<span><Icon type="user" /><FormattedMessage id='user.menu' /></span>}>
            <Menu.Item key='/logoff'><a href='#' onClick={() => this.props.dispatch(logOut())}><Icon type='logout' /><FormattedMessage id='user.logout' /></a></Menu.Item>
          </SubMenu>
        :
          <SubMenu key="/user" title={<span><Icon type="user" /><FormattedMessage id='user.profile' /></span>}>
            <Menu.Item key='/login'><Link to='/login'><Icon type='login' /><FormattedMessage id='user.login' /></Link></Menu.Item>
            <Menu.Item key='/register'><Link to='/register'><Icon type='plus' /><FormattedMessage id='user.register' /></Link></Menu.Item>
          </SubMenu>
        }
      </Menu>
    </Header>
    <Layout>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
    <Footer>
      <FormattedMessage id='app.lang' values={{ 'lang': this.state.locale }} />
      {this.langList()}
    </Footer>
  </Layout>
    </IntlProvider>
    )
  }
}

export default PageLayout = connect(store => ({
  user: store.auth
}))(PageLayout)
