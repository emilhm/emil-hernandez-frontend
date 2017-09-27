import { combineReducers } from 'redux'
import categories from './categories'

const storeApp = combineReducers({
  categories,
})

export default storeApp
