import {push} from 'react-router-redux'
import {fetchApi} from './fetchApi'
import {sendApi} from './sendApi'

export function getUsers() {
  return function(dispatch, getState) {
    fetchApi('users')
    .then( function(result) {
      if (result.code == 200) {
        dispatch({ type: 'users_load', payload: result.response })
      }
    })
    .catch(error => console.log('Users load error: ', error))
  }
}
