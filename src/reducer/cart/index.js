const initialState = []

export default function cart(state = initialState, action) {
  switch (action.type) {
    case 'SET_CART':
      return action.data
    default:
      return state
  }
}
