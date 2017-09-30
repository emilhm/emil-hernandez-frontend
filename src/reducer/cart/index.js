const initialState = []

function idsData(data) {
  return data.map(item => item.id)
}

export default function cart(state = initialState, action) {
  switch (action.type) {
    case 'SET_CART':
      localStorage.setItem('cart', idsData(action.data).toString())
      return action.data
    default:
      return state
  }
}
