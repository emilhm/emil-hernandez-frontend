import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Product } from 'components'
import { setCart } from '../../actions'

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: props.cart,
    }
  }
  toggleToCard = (item) => {
    const { setCart } = this.props
    const { cart } = this.state
    const index = cart.findIndex(element => element.id === item.id)
    if (index === -1) {
      cart.push(item)
    } else {
      cart.splice(index, 1)
    }
    this.setState({ cart })
    this.props.setCart(cart)
  }
  renderProducts = () => {
    const { products } = this.props
    const { cart } = this.state
    return products.map((item) => {
      return (
        <div key={item.id} className="product col-sm-6 col-lg-4 justify-content-center">
          <Product item={item} toggleToCard={this.toggleToCard} inCart={cart.findIndex(element => element.id === item.id)} />
        </div>
      )
    })
  }
  render() {
    return (
      <div className="row">
        {this.renderProducts()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    cart: state.cart,
  }
}

const mapDispatchToProps = {
  setCart
};

Products.propTypes = {
  products: PropTypes.array,
  cart: PropTypes.array,
  setCart: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
