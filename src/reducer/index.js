import { combineReducers } from 'redux'
import categories from './categories'
import products from './products'

const storeApp = combineReducers({
  categories,
  products,
})

export default storeApp
