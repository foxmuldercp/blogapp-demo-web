import {push} from 'react-router-redux'
import {fetchApi} from './fetchApi'
import {sendApi} from './sendApi'

import {message} from 'antd'

export function getPosts() {
  return function(dispatch, getState) {
    fetchApi('posts')
    .then( function(result) {
      if (result.code == 200) {
        dispatch({ type: 'posts_load', payload: result.response })
      }
    })
    .catch(error => console.log('Posts load error: ', error))
  }
}

export function getPost(postId) {
  return function(dispatch, getState) {
    fetchApi('posts/'+postId)
    .then( function(result) {
      if (result.code == 200) {
        dispatch({ type:'posts_item_load', payload: result.response })
      }
    })
    .catch(error => console.log('Post load error: ', error))
  }
}

export function postAdd(payload) {
  return function(dispatch, getState) {
    const content = {'post': payload}
    sendApi('POST', 'posts/', content)
    .then( function(result) {
      if (result.code == 200) {
        dispatch({ type: 'posts_item_add', payload: result.response })
        message.info("Post added")
      } else {
        // throw result
      }
    })
    .catch(error => {
      console.log('Post add error: ', error)
      message.error("Post add error "+error)
    })
  }
}

export function updatePost(id, data) {
  return function(dispatch, getState) {
    const content = {post: data}
    sendApi('PATCH', 'posts/'+id, content)
    .then( function(result) {
      if (result.code == 200) {
        dispatch({ type:'posts_item_update', payload: result.response })
        dispatch(push('/posts/'+id))
      }
    })
    .catch(error => console.log('Post update error: ', error))
  }
}

export function removeItem(postId) {
  return function(dispatch, getState) {
    sendApi('DELETE', 'posts/'+postId)
    .then( function(result) {
      if (result.code == 204) {
        dispatch({ type: 'posts_item_delete', payload: postId })
        dispatch({ type: 'posts_load'})
      }
    })
    .catch(error => console.log('Post delete error: ', error))
  }
}
