var jwt_decode = require('jwt-decode')

const initialItem = {}

export default function user(state=initialItem, action){
  switch (action.type){

  case 'auth_success':
    const token = action.payload.token
    const decoded_token = jwt_decode(action.payload.token)
    localStorage.setItem('token', token)
    localStorage.setItem('email', decoded_token.email)
    localStorage.setItem('name', decoded_token.name)
    return decoded_token
    break

  case 'auth_logoff':
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    return initialItem
    break

  default:
    return state
    break
  }
}
