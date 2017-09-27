const initialState = {}

export default function categories(state = initialState, action) {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return action.data
    default:
      return state
  }
}
