const initialItem = { users: [], show_item: {}, }

export default function fetchUsers(state=initialItem, action){
  var items
  var item
  var newitems
  var index
  var newstate
  switch (action.type){

  case 'users_load':
    items = action.payload
    return {
      ...state,
      items: items,
    }
    break

  case 'auth_logoff':
    return initialItem
    break

  default:
    return state
    break
  }
}
