import React from 'react'

import {IndexRoute, Route} from 'react-router'

import PageLayout from './containers/PageLayout'
import NotFound from './containers/NotFound'
import Start from './containers/Start'
import Login from './containers/Login'
import Register from './containers/Register'
import Start from './containers/Start'
import Categories from './containers/Categories'
import CategoryEdit from './containers/CategoryEdit'

const jwt_decode = require('jwt-decode')

function checkAuth(nextState, replace) {
  const token = localStorage.getItem('token')
  if (token) {
    return true
  } else {
    replace('/login')
  }
}

function onOperatorEnter(nextState, replace) {
  const token = localStorage.getItem('token')
  if (token) {
    const decoded_token = jwt_decode(localStorage.getItem('token'))
    return (decoded_token.admin ? true : false)
  } else {
    replace('/login')
    return false
  }
}

const routes = <Route path="/" component={PageLayout}>
  <IndexRoute component={Start} />
  <Route path="start" component={Start} />
  <Route path="login" component={Login} />
  <Route path="register" component={Register} />
  <Route path="categories" component={Categories} />
  <Route path="categories" path="categories/:id/edit" component={CategoryEdit} onEnter={checkAuth} />
  <Route path="*" component={NotFound}/>
</Route>

export default routes
