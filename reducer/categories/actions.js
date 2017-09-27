function setCategories(data) {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_HISTORY',
      data,
    })
  }
}
