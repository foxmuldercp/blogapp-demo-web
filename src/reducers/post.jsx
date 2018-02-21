const initialItem = { item: null }

export default function fetchPost(state=initialItem, action){
  const item = action.payload
  switch (action.type){

  case 'posts_item_load':
    return { item }
    break

  case 'auth_logoff':
    return initialItem
    break

  default:
    return state
    break
  }
}
