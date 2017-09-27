const initialState = {}

export default function products(state = initialState, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return action.data
    default:
      return state
  }
}

function loadJSON() {
  const xobj = new XMLHttpRequest()
  xobj.overrideMimeType('application/json')
  xobj.open('GET', 'data/products.json', true)
  xobj.onreadystatechange = () => {
    if (xobj.readyState === 4 && xobj.status === 200) {
      const action = {
        type: 'SET_PRODUCTS',
        data: xobj.responseText,
      }
      products(xobj.responseText, action)
    }
  }
  xobj.send(null)
}

loadJSON()
