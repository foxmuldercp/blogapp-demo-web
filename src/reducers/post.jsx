const initialItem = {}

export default function fetchPost(state=initialItem, action){
  switch (action.type){

  case 'posts_item_load':
    return action.payload
    break

  case 'auth_logoff':
    return initialItem
    break

  default:
    return initialItem
    break
  }
}
