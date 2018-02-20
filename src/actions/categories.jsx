import {push} from 'react-router-redux'
import {fetchApi} from './fetchApi'
import {sendApi} from './sendApi'

import {message} from 'antd'

export function getCategories() {
  return function(dispatch, getState) {
    fetchApi('categories')
    .then( function(result) {
      if (result.code == 200) {
        dispatch({ type: 'categories_load', payload: result.response })
      }
    })
    .catch(error => console.log('Categories load error: ', error))
  }
}

export function getCategory(id) {
  return function(dispatch, getState) {
    fetchApi('categories/'+id)
    .then( function(result) {
      if (result.code == 200) {
        dispatch({ type: 'categories_item_load', payload: result.response })
      }
    })
    .catch(error => console.log('Category load error: ', error))
  }
}

export function categoryAdd(payload) {
  return function(dispatch, getState) {
    const content = {'category': payload}
    sendApi('POST', 'categories/', content)
    .then( function(result) {
      if (result.code == 200) {
        dispatch({ type: 'categories_item_add', payload: result.response })
        message.info("Category added")
      } else {
        // throw result
      }
    })
    .catch(error => {
      console.log('Category add error: ', error)
      message.error("Category add error "+error)
    })
  }
}

export function updateCategory(id, data) {
  return function(dispatch, getState) {
    const content = {category: data}
    sendApi('PATCH', 'categories/'+id, content)
    .then( function(result) {
      if (result.code == 200) {
        dispatch({ type:'categories_item_update', payload: result.response })
      }
    })
    .catch(error => console.log('Category update error: ', error))
  }
}

export function removeItem(itemId) {
  return function(dispatch, getState) {
    sendApi('DELETE', 'categories/'+itemId)
    .then( function(result) {
      if (result.code == 204) {
        dispatch({ type: 'categories_item_delete', payload: itemId })
      }
    })
    .catch(error => console.log('Category delete error: ', error))
  }
}
