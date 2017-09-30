import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Product } from 'components'
import Toastr from '../../toastr/toastr'
import { setCart } from '../../actions'

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: props.cart,
      products: [],
    }
  }
  componentDidMount() {
    const { match } = this.props
    this.filterByCategories(parseInt(match.params.category, 10), match.params.search)
  }
  componentWillUpdate(nextProps) {
    const { match } = nextProps
    if (match.url !== this.props.match.url) {
      this.filterByCategories(parseInt(match.params.category, 10), match.params.search)
    }
  }
  toggleToCard = (item) => {
    const { cart } = this.state
    const index = cart.findIndex(element => element.id === item.id)
    if (index === -1) {
      cart.push(item)
    } else {
      cart.splice(index, 1)
    }
    this.setState({ cart })
    this.props.setCart(cart)
    this.container.success(
      index === -1 ? `${item.name} añadido al carrito` : `${item.name} removido del carrito`,
      'Alert', {
        timeOut: 5000,
        extendedTimeOut: 3000,
      })
  }
  filterByCategories = (categories, search) => {
    const { products } = this.props
    let filterProducts
    if (categories) {
      filterProducts = products.filter((item) => {
        return item.sublevel_id === categories
      })
      this.setState({ products: filterProducts })
    }
    if (search) {
      this.filterBySearch(search, filterProducts)
    }
  }
  filterBySearch = (search, products) => {
    if (search) {
      const filterProducts = products.filter((item) => {
        return item.name.indexOf(`${search}`) !== -1
      })
      this.setState({ products: filterProducts })
    }
  }
  renderProducts = () => {
    const { cart, products } = this.state
    return products.map((item) => {
      return (
        <div key={item.id} className="product col-sm-6 col-lg-4 justify-content-center">
          <Product item={item} toggleToCard={this.toggleToCard} inCart={cart.findIndex(element => element.id === item.id)} />
        </div>
      )
    })
  }
  render() {
    const { products } = this.state
    return (
      <div className="row">
        <Toastr inputFunction={(input) => { this.container = input }} />
        {products.length > 0 && (this.renderProducts())}
        {products.length === 0 && (
          <div className="text-center w-100">
            No tenemos este producto :(
          </div>
          )
        }
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
  setCart,
}

Products.propTypes = {
  products: PropTypes.array,
  cart: PropTypes.array,
  setCart: PropTypes.func,
  match: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
