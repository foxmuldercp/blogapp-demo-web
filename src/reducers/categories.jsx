const initialItem = { items: [] }

export default function fetchCategories(state=initialItem, action){
  var items = state.items
  var index
  var newstate

  switch (action.type){

  case 'categories_load':
    items = action.payload
    return { items }
    break

  case 'categories_item_add':
    items.push(action.payload)
    return { items }
    break

  case 'categories_item_update':
    index = items.findIndex(obj => obj.id == action.payload.id)
    if (index > -1) {
      items.splice(index, 1)
    }
    return { items }
    break

  case 'categories_item_delete':
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
