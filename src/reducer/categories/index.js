const initialState = {}

export default function categories(state = initialState, action) {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return action.data
    default:
      return state
  }
}

function loadJSON() {
  const xobj = new XMLHttpRequest()
  xobj.overrideMimeType('application/json')
  xobj.open('GET', 'data/categories.json', true)
  xobj.onreadystatechange = () => {
    if (xobj.readyState === 4 && xobj.status === 200) {
      const action = {
        type: 'SET_CATEGORIES',
        data: xobj.responseText,
      }
      categories(xobj.responseText, action)
    }
  }
  xobj.send(null)
}

loadJSON()
