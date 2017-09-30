import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Product from '../Product'
import Toastr from '../../toastr/toastr'
import { setCart } from '../../actions'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: props.cart,
    }
  }
  toggleToCard = (item) => {
    const { cart } = this.state
    if (item) {
      const index = cart.findIndex(element => element.id === item.id)
      cart.splice(index, 1)
      this.props.setCart(cart)
      this.setState({ cart })
      this.container.success(
        `${item.name} removido al carrito`,
        'Alert', {
          timeOut: 5000,
          extendedTimeOut: 3000,
        }
      )
    } else {
      this.props.setCart([])
      this.setState({ cart: [] })
      this.container.success(
        'Gracias por su compra',
        'Alert', {
          timeOut: 5000,
          extendedTimeOut: 3000,
        }
      )
    }
  }
  renderCart = (cart) => {
    return cart.map((item) => {
      return (
        <div key={item.id} className="cart-product" >
          <Product item={item} toggleToCard={this.toggleToCard} inCart={cart.findIndex(element => element.id === item.id)} />
        </div>
      )
    })
  }
  render() {
    const { cart } = this.state
    if (cart.length) {
      return (
        <div className="content-cart">
          <Toastr inputFunction={(input) => { this.container = input }} />
          {this.renderCart(cart)}
          <div className="text-right">
            <button type="button"onClick={() => this.toggleToCard()} className="btn btn-primary">Comprar</button>
          </div>
        </div>
      )
    }
    return (
      <div className="text-center">
        No has agregado nada al carrito :(, <Link to="/categories">haz click aqui para buscar por categorias</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  }
}

const mapDispatchToProps = {
  setCart,
}
Cart.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
