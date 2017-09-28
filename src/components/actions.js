export function setCategories(data) {
  return (dispatch) => {
    dispatch({
      type: 'SET_CATEGORIES',
      data,
    })
  }
}

export function setProducts(data) {
  return (dispatch) => {
    dispatch({
      type: 'SET_PRODUCTS',
      data,
    })
  }
}
