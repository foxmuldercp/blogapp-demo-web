import {push} from 'react-router-redux'
import {message} from 'antd'

import {sendApi} from './sendApi'

export function logIn(data) {
  return function(dispatch, getState) {
    const content = {'user': {'email': data.email, 'password': data.password}}
    sendApi('POST', 'users/login', content, false)
    .then( function(result) {
      if (result.code == 200) {
        dispatch({ type:'auth_success', payload: result.response })
        dispatch(push('/'))
      }
    })
    .catch(error => console.log('Login error: ', error))
  }
}

export function logOut() {
  return function (dispatch, getState) {
    dispatch({ type:'auth_logoff' })
    dispatch(push('/'))
  }
}

export function signIn(data) {
  return function(dispatch, getState) {
    sendApi('POST', 'users', data, false)
    .then( function(result) {
      if (result.code == 201) {
        message.info('Account created')
        dispatch(push('/'))
      }
      if (result.code == 422) {
        message.error('Account fail to create')
      }
    })
    .catch(error => console.log('SignIn error: ', error))
  }
}
