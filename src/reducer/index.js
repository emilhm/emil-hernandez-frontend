import { combineReducers } from 'redux'
import categories from './categories'
import products from './products'
import cart from './cart'

const storeApp = combineReducers({
  categories,
  products,
  cart
})

export default storeApp
