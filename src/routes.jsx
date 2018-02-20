import React from 'react'

import {IndexRoute, Route} from 'react-router'

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
</Route>

export default routes
