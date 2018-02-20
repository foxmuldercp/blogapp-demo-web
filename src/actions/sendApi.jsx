import {message} from 'antd'

export function sendApi(requestType, partialUrl, content = '', secured = true) {
  return new Promise((resolve, reject) => {
    throw 'change api url here and drop this line'
    const url = 'http://example.com/api/'+partialUrl
    let reqHeaders = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    if (secured) {
      reqHeaders['auth-token'] = localStorage.getItem('token')
    }
    let result = {}
    result.source = {'requestType: ': requestType, 'content: ': content }
    fetch(url, {
      method: requestType,
      credentials: 'include',
      headers: reqHeaders,
      body: JSON.stringify(content)
    })
    .then(function(response) {
      result.code = response.status
      if (response.status == '200') {
        return response.json()
      } else if (response.status == '204') {
        return response.body
      } else if (response.status == '410') {
        return response.body
      } else if (response.status == '422') {
        return response.json()
      } else if (response.status == '500') {
        throw 'Request unauthorized'
      } else if (response.status == '502') {
        throw 'Application is down, retry, please'
      }
    })
    .then(json => {
      result.response = json
      resolve(result)
    })
    .catch(function(error) {
      message.error(error)
      reject(error)
    })
  })
}
