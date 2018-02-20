import {push} from 'react-router-redux'
import {fetchApi} from './fetchApi'
import {sendApi} from './sendApi'

import {message} from 'antd'

export function commentsGet(postId) {
  return function(dispatch, getState) {
    fetchApi('posts/'+postId+'/comments')
    .then( function(result) {
      if (result.code == 200) {
        dispatch({ type: 'comments_load', payload: result.response })
      }
    })
    .catch(error => console.log('Post comments load error: ', error))
  }
}

export function commentGet(postId, commentId) {
  return function(dispatch, getState) {
    fetchApi('posts'+postId+'/comments/'+commentId)
    .then( function(result) {
      if (result.code == 200) {
        dispatch({ type: 'comments_item_load', payload: result.response })
      }
    })
    .catch(error => console.log('Post comment load error: ', error))
  }
}

export function commentAdd(postId, payload) {
  return function(dispatch, getState) {
    const content = {'comment': payload}
    sendApi('POST', 'posts/'+postId+'/comments/', content)
    .then( function(result) {
      if (result.code == 200) {
        dispatch({ type: 'comments_item_add', payload: result.response })
        message.info("Comment added")
      } else {
        // throw result
      }
    })
    .catch(error => {
      console.log('Post comment add error: ', error)
      message.error("Post comment add error "+error)
    })
  }
}

export function commentUpdate(postId, commentId, data) {
  return function(dispatch, getState) {
    const content = {comment: data}
    sendApi('PATCH', 'posts'+postId+'/comments/'+commentId, content)
    .then( function(result) {
      if (result.code == 200) {
        dispatch({ type:'comments_item_update', payload: result.response })
      }
    })
    .catch(error => console.log('Post comment update error: ', error))
  }
}

export function commentDelete(postId, commentId) {
  return function(dispatch, getState) {
    sendApi('DELETE', 'posts/'+postId+'/comments/'+commentId)
    .then( function(result) {
      if (result.code == 204) {
        dispatch({ type: 'comments_item_delete', payload: commentId })
      }
    })
    .catch(error => console.log('Post comment delete error: ', error))
  }
}
