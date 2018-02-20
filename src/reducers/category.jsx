const initialItem = { }

export default function fetchCategories(state=initialItem, action){
  switch (action.type){

  case 'categories_item_load':
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
