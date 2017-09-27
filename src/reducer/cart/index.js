const initialState = {}

export default function products(state = initialState, action) {
  switch (action.type) {
    case 'SET_CART':
      return action.data
    default:
      return state
  }
}
