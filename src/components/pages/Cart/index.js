import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Cart extends Component {
  render() {
    return (
      <div>
        Carrito
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  }
}

Cart.propTypes = {
  Cart: PropTypes.array,
}

export default connect(mapStateToProps, null)(Cart)
