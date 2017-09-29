function setCategories(data) {
  return (dispatch) => {
    dispatch({
      type: 'SET_CATEGORIES',
      data,
    })
  }
}

function setProducts(data) {
  return (dispatch) => {
    dispatch({
      type: 'SET_PRODUCTS',
      data,
    })
  }
}

function setCart(data) {
  return (dispatch) => {
    dispatch({
      type: 'SET_CART',
      data: data
    });
  }
}

export { setCategories, setProducts, setCart }
