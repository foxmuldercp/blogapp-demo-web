const initialItem = { items: [] }

export default function fetchComments(state=initialItem, action){
  var items = state.items
  var index
  var newstate
  switch (action.type){

  case 'comments_load':
    items = action.payload
    return { items }
    break

  case 'comments_item_add':
    items.push(action.payload)
    return { items }
    break

  case 'comments_item_update':
    items.push(action.payload)
    return { items }
    break

  case 'comments_item_delete':
    index = items.findIndex(obj => obj.id == action.payload)
    if (index > -1) {
      items.splice(index, 1)
    }
    return { items }
    break

  case 'auth_logoff':
    return { initialItem }
    break

  default:
    return state
    break
  }
}
